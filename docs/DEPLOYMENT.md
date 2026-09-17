# BizNetwork Production Deployment Guide

## 1. System Requirements & Infrastructure Stack

- **Operating System**: Ubuntu 22.04 LTS or 24.04 LTS (x86_64 or ARM64)
- **Web Server**: Nginx 1.24+ with HTTP/2 and TLS 1.3
- **PHP Runtime**: PHP 8.2 or 8.3 FPM with `opcache`, `pdo_pgsql`, `mbstring`, `curl`, `redis`, `sodium`, `intl`
- **Database**: PostgreSQL 16+ or MySQL 8.0+
- **In-Memory Cache & Queue Broker**: Redis 7+
- **Process Manager**: Supervisord (managing Laravel queue workers)
- **Static Storage**: AWS S3, Cloudflare R2, or DigitalOcean Spaces

---

## 2. Environment Variables Checklist

### Backend `.env.production`
```ini
APP_NAME=BizNetwork
APP_ENV=production
APP_KEY=base64:GENERATE_KEY_WITH_ARTISAN
APP_DEBUG=false
APP_URL=https://api.biznetwork.com

LOG_CHANNEL=daily
LOG_LEVEL=info

DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=biznetwork_prod
DB_USERNAME=biznetwork_user
DB_PASSWORD=STRONG_PRODUCTION_SECRET

CACHE_STORE=redis
QUEUE_CONNECTION=redis
SESSION_DRIVER=redis

REDIS_HOST=127.0.0.1
REDIS_PASSWORD=STRONG_REDIS_SECRET
REDIS_PORT=6379

SANCTUM_STATEFUL_DOMAINS=app.biznetwork.com
FRONTEND_URL=https://app.biznetwork.com

PLATFORM_FEE_PERCENT=10
MIN_WITHDRAWAL_CENTS=500
MAX_WITHDRAWAL_CENTS=100000
```

### Frontend `.env.production`
```ini
VITE_API_BASE_URL=https://api.biznetwork.com/api/v1
```

---

## 3. Nginx Server Configuration

### 3.1 Backend API Server (`api.biznetwork.com`)
```nginx
server {
    listen 80;
    server_name api.biznetwork.com;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    server_name api.biznetwork.com;
    root /var/www/biznetwork/backend/public;

    ssl_certificate /etc/letsencrypt/live/api.biznetwork.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/api.biznetwork.com/privkey.pem;

    index index.php;
    charset utf-8;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php8.2-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
        fastcgi_hide_header X-Powered-By;
    }

    location ~ /\.(?!well-known).* {
        deny all;
    }
}
```

### 3.2 Frontend SPA (`app.biznetwork.com`)
```nginx
server {
    listen 443 ssl http2;
    server_name app.biznetwork.com;
    root /var/www/biznetwork/frontend/dist;

    ssl_certificate /etc/letsencrypt/live/app.biznetwork.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/app.biznetwork.com/privkey.pem;

    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~* \.(?:css|js|woff2?|svg|png|jpg|ico)$ {
        expires 1y;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }
}
```

---

## 4. Background Workers & Cron Jobs

### 4.1 Supervisord Worker Configuration
Create `/etc/supervisor/conf.d/biznetwork-worker.conf`:
```ini
[program:biznetwork-worker]
process_name=%(program_name)s_%(process_num)02d
command=php /var/www/biznetwork/backend/artisan queue:work redis --sleep=3 --tries=3 --max-time=3600
autostart=true
autorestart=true
stopasgroup=true
killasgroup=true
user=www-data
numprocs=4
redirect_stderr=true
stdout_logfile=/var/www/biznetwork/backend/storage/logs/worker.log
```

### 4.2 System Crontab
Add to `crontab -e -u www-data`:
```bash
* * * * * cd /var/www/biznetwork/backend && php artisan schedule:run >> /dev/null 2>&1
```

---

## 5. Deployment Step-by-Step Runbook

```bash
# 1. Pull latest production code
git pull origin main

# 2. Deploy Backend
cd /var/www/biznetwork/backend
composer install --no-dev --optimize-autoloader
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan migrate --force

# 3. Restart Queue Workers
sudo supervisorctl restart all

# 4. Deploy Frontend
cd /var/www/biznetwork/frontend
npm ci
npm run build

# 5. Reload Nginx
sudo systemctl reload nginx
```

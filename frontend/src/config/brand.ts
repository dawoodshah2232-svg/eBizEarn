export interface BrandConfig {
  name: string;
  shortName: string;
  tagline: string;
  supportingTagline: string;
  domain: string;
  supportEmail: string;
  defaultCurrency: string;
  defaultLocale: string;
  minWithdrawalCents: number;
  socials: {
    facebook: string;
    instagram: string;
    linkedin: string;
    x: string;
    youtube: string;
  };
}

export const BRAND: BrandConfig = {
  name: 'eBizEarn',
  shortName: 'eBizEarn',
  tagline: 'Verified Tasks. Global Opportunities.',
  supportingTagline: 'Complete verified digital tasks from real businesses, submit your work and receive rewards securely.',
  domain: 'ebizearn.com',
  supportEmail: 'support@ebizearn.com',
  defaultCurrency: 'USD',
  defaultLocale: 'en',
  minWithdrawalCents: 500, // $5.00 min withdrawal
  socials: {
    facebook: 'https://facebook.com/ebizearn',
    instagram: 'https://instagram.com/ebizearn',
    linkedin: 'https://linkedin.com/company/ebizearn',
    x: 'https://x.com/ebizearn',
    youtube: 'https://youtube.com/@ebizearn',
  },
};

export const SHOW_DEMO_METRICS = true;

export const DEMO_METRICS = {
  activeUsers: '500K+',
  tasksCompleted: '5M+',
  globalBrands: '2,000+',
  countries: '150+',
  userRating: '4.8/5',
  satisfactionRate: '99.4%',
};

export const BRAND_COLORS = {
  navy: '#07182F',
  deepNavy: '#0B1F3A',
  blue: '#2F80FF',
  brightBlue: '#168BFF',
  purple: '#7357FF',
  softPurple: '#EEE9FF',
  cyan: '#20C4E8',
  success: '#18B76A',
  text: '#101828',
  secondary: '#475467',
  background: '#F7F9FC',
  card: '#FFFFFF',
  border: '#E7ECF3',
};

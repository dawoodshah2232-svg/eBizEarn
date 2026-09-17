# BizNetwork Design System Specification

## 1. Visual Identity Foundation

BizNetwork's design system is engineered to inspire trust, clarity, and engagement. It pairs a commanding deep navy authority tone with high-energy modern tech gradients and crisp, high-contrast typography.

---

## 2. Color Palette & Token Definitions

### 2.1 Primary Brand Palette
| Token Name | Hex Code | RGB | Usage |
| :--- | :--- | :--- | :--- |
| `navy-base` | `#07182F` | `rgb(7, 24, 47)` | Primary navigation bar, dark CTA buttons, footer, dark hero banners. |
| `navy-dark` | `#040F1E` | `rgb(4, 15, 30)` | Deep footer background, high-contrast borders. |
| `navy-secondary` | `#0D2342` | `rgb(13, 35, 66)` | Secondary dark containers, subtle hover fills on dark surfaces. |

### 2.2 Vibrant Accent Palette
| Token Name | Hex Code | Usage |
| :--- | :--- | :--- |
| `electric-blue` | `#168BFF` | Primary button hover states, active links, step indicators, icon highlights. |
| `royal-purple` | `#7257FF` | Brand gradients, premium feature badges, secondary accents. |
| `brand-cyan` | `#25C5E8` | Highlight dots, subtle glowing rings, telemetry indicators. |

### 2.3 Semantic Status Palette
| Status | Hex Code | Usage |
| :--- | :--- | :--- |
| `success-mint` | `#16B364` | Earning amounts (`+$0.50`), approved statuses, positive balance badges. |
| `warning-amber` | `#F79009` | Pending verification badges, expiring reservations. |
| `danger-rose` | `#F04438` | Rejections, fraud alerts, account suspension warnings. |

### 2.4 Neutral Surfaces & Borders
| Token Name | Hex Code | Usage |
| :--- | :--- | :--- |
| `canvas-bg` | `#F7F9FC` | Platform application background, soft dashboard backdrop. |
| `card-surface` | `#FFFFFF` | Primary cards, modal dialogues, input fields. |
| `border-subtle` | `#E4EAF2` | Card outlines, table dividers, separation rules. |
| `text-primary` | `#101828` | Main headings, key metrics, high-emphasis text. |
| `text-muted` | `#475467` | Descriptive paragraphs, subtitles, secondary metadata. |

---

## 3. Gradients & Atmospheric Effects

### Brand Linear Gradient
```css
background: linear-gradient(135deg, #168BFF 0%, #7257FF 100%);
```
Used on primary hero badge pills, gradient text accents, and key promotional callouts.

### Hero Radial Atmospheric Tint
```css
background: radial-gradient(circle at 80% 20%, rgba(22, 139, 255, 0.08) 0%, rgba(114, 87, 255, 0.04) 50%, transparent 80%);
```
Provides subtle depth behind hero typography without interfering with readability.

---

## 4. Typography Scale

BizNetwork utilizes modern sans-serif typography (`Inter` or `Geist`):

| Level | Size | Weight | Line Height | Usage |
| :--- | :--- | :--- | :--- | :--- |
| **Hero Title** | `3rem` to `4.5rem` (48-72px) | Black (900) | `1.1` | Landing page hero header. |
| **Section Title** | `2rem` to `2.5rem` (32-40px) | Black (900) | `1.2` | Major section headers. |
| **Card Title** | `1.125rem` to `1.25rem` (18-20px) | ExtraBold (800) | `1.3` | Task cards, metric widgets. |
| **Body Large** | `1rem` (16px) | Medium (500) | `1.6` | Hero lead paragraphs. |
| **Body Base** | `0.875rem` (14px) | Regular (400) | `1.5` | Standard interface text. |
| **Caption / Badge** | `0.75rem` (12px) | Bold (700) | `1.4` | Badges, tags, countdown timers. |

---

## 5. Floating Interactive Badges Specification

To match the reference design, the following three signature badges are implemented:

### 1. "Task Completed! +$0.50"
- **Position**: Floating over hero photography top-left (`-top-4 -left-4`).
- **Surface**: Pure white (`#FFFFFF`) with `floating-card-shadow`.
- **Icon**: Green rounded circle with Checkmark (`#16B364`).
- **Reward Text**: `+$0.50` in bold green.

### 2. "Your Balance $28.40"
- **Position**: Centered or right-aligned floating pill (`top-1/3 -right-6`).
- **Surface**: White card with subtle border `#E4EAF2`.
- **Amount**: `$28.40` in bold `#101828` with upward trend indicator.

### 3. "New Task Available +$0.40"
- **Position**: Bottom-right floating card (`-bottom-4 -right-4`).
- **Surface**: White card with blue category pill and clock indicator (`5 min`).

---

## 6. Elevation & Shadows

- **Subtle Card Shadow**:
  `box-shadow: 0 4px 20px -2px rgba(7, 24, 47, 0.05);`
- **Floating Badge Shadow**:
  `box-shadow: 0 12px 32px -4px rgba(7, 24, 47, 0.12);`
- **Modal Dialogue Shadow**:
  `box-shadow: 0 24px 48px -12px rgba(7, 24, 47, 0.25);`

---

## 7. Responsive Breakpoints

- **Mobile (<640px)**: Single column layouts, fixed 44px bottom navigation dock, compressed metrics.
- **Tablet (640px - 1024px)**: 2-column task grids, collapsible sidebar navigation.
- **Desktop (>1024px)**: Full persistent left sidebar, 3-column marketplace grids, split-screen verification viewer.

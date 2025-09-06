/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: 'var(--color-border)', /* neon blue with opacity */
        input: 'var(--color-input)', /* elevated surface color */
        ring: 'var(--color-ring)', /* energizing neon blue */
        background: 'var(--color-background)', /* rich dark purple-blue */
        foreground: 'var(--color-foreground)', /* high-contrast light gray */
        primary: {
          DEFAULT: 'var(--color-primary)', /* energizing neon blue */
          foreground: 'var(--color-primary-foreground)', /* rich dark purple-blue */
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)', /* deep navy */
          foreground: 'var(--color-secondary-foreground)', /* high-contrast light gray */
        },
        destructive: {
          DEFAULT: 'var(--color-destructive)', /* clear red */
          foreground: 'var(--color-destructive-foreground)', /* high-contrast light gray */
        },
        muted: {
          DEFAULT: 'var(--color-muted)', /* deep navy */
          foreground: 'var(--color-muted-foreground)', /* muted gray */
        },
        accent: {
          DEFAULT: 'var(--color-accent)', /* warm coral */
          foreground: 'var(--color-accent-foreground)', /* high-contrast light gray */
        },
        popover: {
          DEFAULT: 'var(--color-popover)', /* elevated surface color */
          foreground: 'var(--color-popover-foreground)', /* high-contrast light gray */
        },
        card: {
          DEFAULT: 'var(--color-card)', /* elevated surface color */
          foreground: 'var(--color-card-foreground)', /* high-contrast light gray */
        },
        success: {
          DEFAULT: 'var(--color-success)', /* bright green */
          foreground: 'var(--color-success-foreground)', /* rich dark purple-blue */
        },
        warning: {
          DEFAULT: 'var(--color-warning)', /* amber */
          foreground: 'var(--color-warning-foreground)', /* rich dark purple-blue */
        },
        error: {
          DEFAULT: 'var(--color-error)', /* clear red */
          foreground: 'var(--color-error-foreground)', /* high-contrast light gray */
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontWeight: {
        normal: '400',
        medium: '500',
        semibold: '600',
      },
      boxShadow: {
        'glow-sm': '0 2px 10px rgba(0, 212, 255, 0.1)',
        'glow': '0 4px 20px rgba(0, 212, 255, 0.15)',
        'glow-lg': '0 6px 30px rgba(0, 212, 255, 0.25)',
        'glow-xl': '0 8px 40px rgba(0, 212, 255, 0.3)',
      },
      animation: {
        'skeleton-pulse': 'skeleton-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'stagger-fade-in': 'stagger-fade-in 0.6s ease-out forwards',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite alternate',
      },
      keyframes: {
        'skeleton-pulse': {
          '0%, 100%': {
            opacity: '1',
          },
          '50%': {
            opacity: '0.5',
          },
        },
        'stagger-fade-in': {
          from: {
            opacity: '0',
            transform: 'translateY(10px)',
          },
          to: {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'glow-pulse': {
          from: {
            boxShadow: '0 0 5px rgba(0, 212, 255, 0.2)',
          },
          to: {
            boxShadow: '0 0 20px rgba(0, 212, 255, 0.4)',
          },
        },
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '112': '28rem',
        '128': '32rem',
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwindcss-animate'),
  ],
}
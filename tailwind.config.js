/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: '#ffffff',
        },
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        // Editorial Warm Palette - 60-30-10 Rule
        // 60% Dominant - Cream/Beige
        cream: {
          50: '#FDFCFB',
          100: '#FAF8F5',
          200: '#F5F1EB',
          300: '#EDE6DB',
          400: '#E2D6C5',
          500: '#D4C4A8',
        },
        // 30% Secondary - Espresso Brown
        espresso: {
          50: '#F5F3EF',
          100: '#EBE7DF',
          200: '#D5CDBF',
          300: '#B8AC96',
          400: '#9A896C',
          500: '#7F6E4D',
          600: '#5C4F33',
          700: '#443A28',
          800: '#2C2416',
          900: '#1A1610',
        },
        // 10% Accent - Warm Gold
        gold: {
          50: '#FBF8F2',
          100: '#F5EDE0',
          200: '#EBD7BE',
          300: '#DFBB93',
          400: '#D4A267',
          500: '#C9A962',
          600: '#B8904D',
          700: '#9E7740',
          800: '#7F5C33',
          900: '#5E4426',
        },
        // Additional warm neutrals
        stone: {
          50: '#FAF9F7',
          100: '#F3F0EB',
          200: '#E5DFD4',
          300: '#D4C8B7',
          400: '#BEB1A2',
          500: '#A89A8A',
          600: '#918376',
          700: '#756859',
          800: '#5D5044',
          900: '#3D342A',
        },
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.22, 1, 0.36, 1)',
        'smooth-in': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'smooth-out': 'cubic-bezier(0, 0, 0.2, 1)',
      },
      transitionDuration: {
        '400': '400ms',
        '500': '500ms',
        '600': '600ms',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(44, 36, 22, 0.08)',
        'gold-glow': '0 0 24px rgba(201, 169, 98, 0.25)',
        'card-hover': '0 24px 48px -12px rgba(44, 36, 22, 0.15)',
        'subtle': '0 2px 8px rgba(44, 36, 22, 0.06)',
        'elevated': '0 8px 24px rgba(44, 36, 22, 0.1)',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'fade-in-up': 'fadeInUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'fade-in-down': 'fadeInDown 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'fade-in-left': 'fadeInLeft 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'fade-in-right': 'fadeInRight 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'slide-up': 'slideUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'slide-down': 'slideDown 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'slide-left': 'slideLeft 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'slide-right': 'slideRight 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'scale-in': 'scaleIn 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'scale-in-sm': 'scaleInSm 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2s infinite',
        'text-reveal': 'textReveal 1s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'text-reveal-up': 'textRevealUp 1s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'blur-in': 'blurIn 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'line-expand': 'lineExpand 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'soft-pulse': 'softPulse 3s ease-in-out infinite',
        // Mysterious animations
        'shadow-reveal': 'shadowReveal 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'mysterious-fade': 'mysteriousFade 1.5s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'parallax-float': 'parallaxFloat 20s ease-in-out infinite',
        'slow-float': 'slowFloat 8s ease-in-out infinite',
        'vignette-reveal': 'vignetteReveal 1.4s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'stagger-reveal': 'staggerReveal 1s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'timeline-fade': 'timelineFade 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'form-reveal': 'formReveal 1.3s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'mystic-pulse': 'mysticPulse 4s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInLeft: {
          '0%': { opacity: '0', transform: 'translateX(24px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        fadeInRight: {
          '0%': { opacity: '0', transform: 'translateX(-24px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideLeft: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideRight: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        scaleInSm: {
          '0%': { opacity: '0', transform: 'scale(0.98)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        textReveal: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        textRevealUp: {
          '0%': { opacity: '0', transform: 'translateY(100%)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        blurIn: {
          '0%': { opacity: '0', filter: 'blur(10px)' },
          '100%': { opacity: '1', filter: 'blur(0)' },
        },
        lineExpand: {
          '0%': { transform: 'scaleX(0)' },
          '100%': { transform: 'scaleX(1)' },
        },
        softPulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        // Mysterious animation keyframes
        shadowReveal: {
          '0%': { opacity: '0', filter: 'blur(12px) brightness(0.8)', transform: 'translateY(60px) scale(0.98)' },
          '100%': { opacity: '1', filter: 'blur(0) brightness(1)', transform: 'translateY(0) scale(1)' },
        },
        mysteriousFade: {
          '0%': { opacity: '0', filter: 'blur(8px)' },
          '50%': { opacity: '0.5', filter: 'blur(4px)' },
          '100%': { opacity: '1', filter: 'blur(0)' },
        },
        parallaxFloat: {
          '0%, 100%': { transform: 'translateY(0) translateX(0)' },
          '25%': { transform: 'translateY(-8px) translateX(4px)' },
          '50%': { transform: 'translateY(-4px) translateX(-4px)' },
          '75%': { transform: 'translateY(-12px) translateX(2px)' },
        },
        slowFloat: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        vignetteReveal: {
          '0%': { opacity: '0', filter: 'blur(20px) brightness(0.5)', transform: 'scale(1.1)' },
          '60%': { opacity: '0.7', filter: 'blur(8px) brightness(0.8)' },
          '100%': { opacity: '1', filter: 'blur(0) brightness(1)', transform: 'scale(1)' },
        },
        staggerReveal: {
          '0%': { opacity: '0', filter: 'blur(10px)', transform: 'translateY(50px)' },
          '100%': { opacity: '1', filter: 'blur(0)', transform: 'translateY(0)' },
        },
        timelineFade: {
          '0%': { opacity: '0', filter: 'blur(6px)', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', filter: 'blur(0)', transform: 'translateX(0)' },
        },
        formReveal: {
          '0%': { opacity: '0', filter: 'blur(15px)', transform: 'translateY(30px)' },
          '100%': { opacity: '1', filter: 'blur(0)', transform: 'translateY(0)' },
        },
        mysticPulse: {
          '0%, 100%': { opacity: '0.3', transform: 'scale(1)' },
          '50%': { opacity: '0.5', transform: 'scale(1.05)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gold-shimmer': 'linear-gradient(90deg, transparent, rgba(201, 169, 98, 0.1), transparent)',
      },
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'soft-pink': '#FFB6C1',
        'lavender': '#E6E6FA',
        'peach': '#FFCBA4',
        'baby-blue': '#B0E0E6',
        'rose-red': '#FF0054',
        'cream': '#FFF8F0',
        'neon-pink': '#FF6EB4',
        'deep-pink': '#FF1493',
        'hot-pink': '#FF69B4',
        'blush': '#FFB7C5',
        'lilac': '#C8A2C8',
        'gold': '#FFD700',
        'midnight': '#0D0015',
        'dark-purple': '#1A0030',
        'magenta': '#FF00FF',
      },
      fontFamily: {
        'display': ['"Dancing Script"', 'cursive'],
        'body': ['"Nunito"', 'sans-serif'],
        'mono': ['"Space Mono"', 'monospace'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 10s ease-in-out infinite',
        'float-fast': 'float 3s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'twinkle': 'twinkle 2s ease-in-out infinite',
        'bounce-soft': 'bounceSoft 2s ease-in-out infinite',
        'wiggle': 'wiggle 0.5s ease-in-out infinite',
        'rain': 'rain 1s linear infinite',
        'fall': 'fall 4s linear infinite',
        'heart-beat': 'heartBeat 1s ease-in-out infinite',
        'glitch': 'glitch 0.3s steps(2) infinite',
        'typewriter': 'typewriter 3s steps(40) forwards',
        'fade-in-up': 'fadeInUp 1s ease forwards',
        'fade-in': 'fadeIn 1s ease forwards',
        'scale-in': 'scaleIn 0.5s ease forwards',
        'slide-in-left': 'slideInLeft 0.8s ease forwards',
        'slide-in-right': 'slideInRight 0.8s ease forwards',
        'rotate-heart': 'rotateHeart 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px #FF6EB4, 0 0 40px #FF6EB4' },
          '50%': { boxShadow: '0 0 40px #FF6EB4, 0 0 80px #FF6EB4, 0 0 120px #FF1493' },
        },
        twinkle: {
          '0%, 100%': { opacity: 1, transform: 'scale(1)' },
          '50%': { opacity: 0.3, transform: 'scale(0.8)' },
        },
        bounceSoft: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-5deg)' },
          '50%': { transform: 'rotate(5deg)' },
        },
        rain: {
          '0%': { transform: 'translateY(-100vh)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        fall: {
          '0%': { transform: 'translateY(-100px) rotate(0deg)', opacity: 1 },
          '100%': { transform: 'translateY(110vh) rotate(720deg)', opacity: 0.5 },
        },
        heartBeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '25%': { transform: 'scale(1.15)' },
          '50%': { transform: 'scale(1)' },
          '75%': { transform: 'scale(1.1)' },
        },
        glitch: {
          '0%': { transform: 'translate(0)', filter: 'none' },
          '25%': { transform: 'translate(-3px, 2px)', filter: 'hue-rotate(90deg)' },
          '50%': { transform: 'translate(3px, -2px)', filter: 'hue-rotate(180deg)' },
          '75%': { transform: 'translate(-2px, -3px)', filter: 'hue-rotate(270deg)' },
          '100%': { transform: 'translate(0)', filter: 'none' },
        },
        fadeInUp: {
          '0%': { opacity: 0, transform: 'translateY(30px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        scaleIn: {
          '0%': { opacity: 0, transform: 'scale(0.5)' },
          '100%': { opacity: 1, transform: 'scale(1)' },
        },
        slideInLeft: {
          '0%': { opacity: 0, transform: 'translateX(-50px)' },
          '100%': { opacity: 1, transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: 0, transform: 'translateX(50px)' },
          '100%': { opacity: 1, transform: 'translateX(0)' },
        },
        rotateHeart: {
          '0%, 100%': { transform: 'rotate(-10deg) scale(1)' },
          '50%': { transform: 'rotate(10deg) scale(1.1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
      },
      backgroundImage: {
        'galaxy': 'radial-gradient(ellipse at bottom, #1B2735 0%, #090A0F 100%)',
        'pink-dream': 'linear-gradient(135deg, #FFB6C1 0%, #E6E6FA 50%, #FFCBA4 100%)',
        'romantic': 'linear-gradient(135deg, #FF6EB4 0%, #FF1493 50%, #C71585 100%)',
        'dark-romance': 'linear-gradient(135deg, #0D0015 0%, #1A0030 50%, #2D0050 100%)',
        'chaos': 'linear-gradient(135deg, #FF006688 0%, #FF6EB488 50%, #FFD70088 100%)',
        'shimmer-gradient': 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)',
      },
    },
  },
  plugins: [],
}

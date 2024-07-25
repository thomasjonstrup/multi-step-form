/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      container: {
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem',
        },
      },
      fontFamily: {
        ubuntu: ['Ubuntu', 'sans-serif'],
      },
      colors: {
        'marine-blue': 'hsl(213, 96%, 18%)',
        'purplish-blue': 'hsl(243, 100%, 62%)',
        'pastel-blue': 'hsl(228, 100%, 84%)',
        'light-blue': 'hsl(206, 94%, 87%)',
        'light-blue/40': 'hsla(206, 94%, 87%, 0.4)',
        'strawberry-red': 'hsl(354, 84%, 57%)',
        white: 'hsl(0, 0%, 100%)',
        'cool-gray': 'hsl(231, 11%, 63%)',
        'light-gray': 'hsl(229, 24%, 87%)',
        magnolia: 'hsl(217, 100%, 97%)',
        alabaster: 'hsl(231, 100%, 99%)',
        'black-40': 'rgba(0,0,0, 0.4)',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0%' },
          '100%': { opacity: '100%' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-in-out',
      },
      backgroundImage: {
        'sidebar-desktop': "url('/images/bg-sidebar-desktop.svg')",
        'sidebar-mobile': "url('/images/bg-sidebar-mobile.svg')"
      }
/*       backgroundImage: {
        'radio-selected': "url('/icon-radio-selected.svg')",
      }, */
    },
  },
  plugins: [],
}

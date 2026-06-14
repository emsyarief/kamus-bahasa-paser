/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#E8E6DF',
        ink: {
          DEFAULT: '#1A1A1A',
          70: 'rgba(26, 26, 26, 0.70)',
          60: 'rgba(26, 26, 26, 0.60)',
          50: 'rgba(26, 26, 26, 0.50)',
          15: 'rgba(26, 26, 26, 0.15)',
          10: 'rgba(26, 26, 26, 0.10)',
          '04': 'rgba(26, 26, 26, 0.035)'
        },
        reversed: '#E8E6DF',
        'nav-bg': 'rgba(232, 230, 223, 0.90)',
        'dark-bg': '#1A1A1A',
        'dark-hairline': 'rgba(232, 230, 223, 0.15)'
      },
      fontFamily: {
        display: ['"DM Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        body: ['"Inter"', 'ui-sans-serif', 'system-ui', 'sans-serif']
      },
      fontSize: {
        'h1': ['clamp(3rem, 9vw, 132px)', { lineHeight: '0.85', letterSpacing: '-0.05em', fontWeight: '300' }],
        'h2': ['clamp(2.2rem, 5.5vw, 64px)', { lineHeight: '1.0', letterSpacing: '-0.05em', fontWeight: '300' }],
        'h3': ['30px', { lineHeight: '1.2', letterSpacing: '-0.025em', fontWeight: '300' }],
        'stat': ['clamp(3.5rem, 7vw, 96px)', { lineHeight: '1.0', letterSpacing: '-0.04em', fontWeight: '300' }],
        'label': ['12px', { lineHeight: '1.4', letterSpacing: '0.14em', fontWeight: '500' }],
        'cta': ['14px', { lineHeight: '1.4', letterSpacing: '0.14em', fontWeight: '500' }]
      },
      borderRadius: {
        pill: '9999px',
        none: '0px'
      },
      maxWidth: {
        wrap: '1600px',
        content: '960px'
      },
      spacing: {
        'pad-x': 'clamp(24px, 5vw, 48px)',
        'pad-y': 'clamp(64px, 10vw, 120px)'
      }
    }
  },
  plugins: []
};

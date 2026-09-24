/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Azul principal do Ocean Music (50 = mais claro, 950 = mais escuro)
        ocean: {
          50: '#EEF6FF',
          100: '#D9EAFF',
          200: '#BCDAFF',
          300: '#8EC3FF',
          400: '#59A1FF',
          500: '#3179F5',
          600: '#1D5AE8',
          700: '#1747CF',
          800: '#193BA6',
          900: '#1A3784',
          950: '#0C1A4B',
        },
        // Acento "onda": usar em detalhes, nunca como texto sobre fundo branco
        aqua: {
          300: '#7DE3F2',
          400: '#22C7E0',
          500: '#0EA5C2',
        },
        // Neutros frios (textos, bordas, fundos)
        ink: {
          900: '#0F1B3D',
          700: '#33415F',
          500: '#51607F',
          400: '#8393B0',
          300: '#A9B6CF',
          200: '#D5E2F5',
          100: '#E8F0FB',
        },
        // Feedback (o erro é um vermelho suave, para não assustar)
        success: { DEFAULT: '#0E9F6E', soft: '#DDF7EC' },
        danger: { DEFAULT: '#C4314B', soft: '#FDE8EC' },
        // Uso mínimo: sequência de estudos e celebrações
        sun: { DEFAULT: '#F59E0B', soft: '#FEF3D7' },
      },
      fontFamily: {
        display: ['Sora', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 6px 24px -8px rgba(23, 71, 207, 0.18)',
        lift: '0 12px 32px -10px rgba(23, 71, 207, 0.28)',
      },
    },
  },
  plugins: [],
};


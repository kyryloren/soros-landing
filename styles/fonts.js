import localFont from 'next/font/local'

const aeonik = localFont({
  adjustFontFallback: 'Arial',
  variable: '--font-text',
  preload: true,
  fallback: [
    'San Francisco',
    'SF Pro Text',
    '-apple-system',
    'system-ui',
    'sans-serif',
  ],
  src: [
    {
      path: '../public/fonts/Aeonik-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/Aeonik-RegularItalic.woff2',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../public/fonts/Aeonik-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/Aeonik-MediumItalic.woff2',
      weight: '500',
      style: 'italic',
    },
    {
      path: '../public/fonts/Aeonik-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../public/fonts/Aeonik-BoldItalic.woff2',
      weight: '700',
      style: 'italic',
    },
  ],
})

export default aeonik

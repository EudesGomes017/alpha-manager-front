export default {
    darkMode: 'class',
    content: [
      "./index.html",
      "./src/**/*.{vue,ts}"
    ],
    theme: {
      extend: {
        colors: {
            background: 'var(--background)',
            foreground: 'var(--foreground)',
            border: 'var(--border)',
            muted: 'var(--muted)',
            primary: 'var(--primary)',
            secondary: 'var(--secondary)',
          },
      },
    },
    plugins: [],
  }
  
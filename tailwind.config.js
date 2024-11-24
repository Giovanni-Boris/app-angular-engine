/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'background': '#FFFFFE',
        'headline': '#094067',
        'textPrimary': '#094067',
        'primary': '#094067',
        'secondary': '#5F6C7B',
        'tertiary': '#FBBF24',

        // Button
        'button': '#3DA9FC',
        'buttonHover': '#90B4CE',
        'buttonText': '#FFFFFE',
        'textSecondary': '#6B7280',
        'error': '#EF4565',
        'success': '#10B981',
      }
    },
  },
  plugins: [],
}


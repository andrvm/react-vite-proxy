module.exports = ({ env }) => ({
  plugins: [
    require('tailwindcss')({
      config: './src/assets/tailwind.config.js'
    }),
    require('autoprefixer')()
  ],
})

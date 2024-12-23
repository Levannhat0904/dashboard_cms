/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      screens: {
        scr_575: { max: '575px' }
      },
      flexBasis: {
        '1/7': '14.2857143%',
        '2/7': '28.5714286%',
        '3/7': '42.8571429%',
        '4/7': '57.1428571%',
        '5/7': '71.4285714%',
        '6/7': '85.7142857%'
      },
      boxShadow: {
        custom: '0 0 5px 5px rgba(0, 0, 0, 0.03)'
      }
      // colors: {
      //   'menu-hover': '#ffffff', // Màu chữ khi hover
      //   'menu-hover-bg': 'rgba(255, 255, 255, 0.1)', // Màu nền khi hover
      // }
    }
  },
  plugins: [
    // require('@tailwindcss/forms'),
    function ({ addBase }) {
      // addBase({
      //   '.custom-menu .ant-menu-item-selected': {
      //     backgroundColor: 'transparent !important'
      //   },
      //   '.custom-menu .ant-menu-submenu-selected': {
      //     backgroundColor: 'transparent !important'
      //   },
      //   '.custom-class:hover': {
      //     color: 'red !important'
      //   },
      //   '.custom-class:active': {
      //     color: 'red !important' /* or any other color you want */
      //   },
      //   '.custom-class:focus': {
      //     color: 'red !important' /* or any other color for focus */,
      //     outline: 'none' /* Optional: Removes the default outline */
      //   }
      // })
    }
  ]
}

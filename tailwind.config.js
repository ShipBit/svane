import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {},
		// This is a custom override for demonstration purposes:
		screens: {
			phone: '576px',
			tablet: '1024px',
			desktop: '1440px'
		}
	},
	plugins: [typography()]
};

import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		screens: {
			phone: '576px',
			tablet: '1024px',
			desktop: '1440px'
		}
	},
	plugins: [typography()]
};

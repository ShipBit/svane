import path from 'path';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	optimizeDeps: {
		include: ['tailwind-config'],
		force: true
	},
	plugins: [sveltekit()],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
			'tailwind-config': path.resolve(__dirname, './tailwind.config.js')
		}
	}
});

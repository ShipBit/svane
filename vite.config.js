import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
	build: {
		commonjsOptions: {
			include: ['tailwind-config.js', 'node_modules/**']
		}
	},
	optimizeDeps: {
		include: ['tailwind-config']
	},
	plugins: [sveltekit()],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
			'tailwind-config': path.resolve(__dirname, './tailwind.config.js')
		}
	},
	test: {
		environment: 'happy-dom',
		globals: true
	}
});

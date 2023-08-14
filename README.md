# Svane - Your flag in the Tailwind

Svane is a simple Svelte component that allows you to see the Tailwind viewport / breakpoint you are currently in and the "distance" to the next viewport (as progress percentage).
It is displayed as a fixed bar at the top or bottom of the screen, overlaying your content.

Svane reads the Tailwind config file of your project and automatically displays the breakpoints you have defined there.
Note that currently only screen configs in the format `tablet: '640px'` (using `min-width`) are supported, see [Tailwind docs](https://tailwindcss.com/docs/screens).

![](svane.gif)

By default, the Svane bar is shown initially after reloading the page and whenever you resize the browser window. It will then vanish after a short delay automatically.
Force to show it by pressing "Shift + T" on your keyboard. If you do press the shortcut, Svane will stay open until you press it again.

You can either install Svane as dependecy using the package manager of your choice or just copy&paste the `Svane.svelte` file into your project.
There are no third-party dependencies apart from Tailwind itself, so it's that simple!

## Migration v1 -> v2

The old `breakpoints` property was removed because it's now read from your `tailwind.config.js` file.
See the Installation section below for more details.

## Installation

```bash
npm install -D @shipbit/svane
```

Now you have to include the Tailwind config in your `vite.config.js` file so that Svane can read it:

```js
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
	}
});
```

Then in your `+layout.svelte` or any other page/component:

```svelte
<script>
	import { browser } from '$app/environment'; // in case you're using SSR
	import Svane from '@shipbit/svane';
</script>

{#if import.meta.env.DEV && browser}
	<Svane />
{/if}
```

### Parameters (all optional)

```svelte
<!-- Don't autohide Svane -->
<Svane stayOpen />

<!-- default: 'top' -->
<Svane position="bottom" />

<!-- hide Svane after the given milliseconds have passed (default: 2500) -->
<Svane duration={5000} />
```

You can mix and match these params, of course.

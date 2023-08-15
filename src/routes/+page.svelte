<script>
	import Svane from '$lib/Svane.svelte';
	import '../app.postcss';
</script>

{#if import.meta.env.DEV}
	<Svane />
{/if}

<main class="prose lg:prose-xl m-auto p-4">
	<h1>Svane: Your flag in the Tailwind</h1>
	<p>
		Svane is a simple Svelte component that allows you to see the Tailwind viewport / breakpoint you
		are currently in and the "distance" to the next viewport (as progress percentage). It is
		displayed as a fixed bar at the top or bottom of the screen, overlaying your content.
	</p>
	<p>
		Svane reads the Tailwind config file of your project and automatically displays the breakpoints
		you have defined there. Note that currently only screen configs in the format
		<code>tablet: '640px'</code> (using <code>min-width</code>) are supported, see
		<a href="https://tailwindcss.com/docs/screens">Tailwind docs</a>.
	</p>

	<video autoplay loop muted playsinline class="w-full">
		<source src="/svane.mp4" type="video/mp4" />
	</video>

	<p>
		By default, the Svane bar is shown initially after reloading the page and whenever you resize
		the browser window. It will then vanish after a short delay automatically. Force to show it by
		pressing <span>
			<kbd>
				<kbd class="keyboard-shortcut">Shift</kbd>
				+
				<kbd class="keyboard-shortcut">T</kbd>
			</kbd>
		</span> on your keyboard. If you do press the shortcut, Svane will stay open until you press it again.
	</p>
	<p>
		You can either install Svane as dependecy using a package manager of your choice or just copy +
		paste the <code>Svane.svelte</code> file into your project. There are no third-party dependencies
		apart from Tailwind itself, so it's that simple!
	</p>

	<h2>Migration v1 -> v2</h2>
	<p>
		The old <code>breakpoints</code> property was removed because it's now read from your
		<code>tailwind.config.js</code> file. See the Installation section below for more details.
	</p>

	<h2>Installation</h2>
	<pre>npm install -D @shipbit/svane</pre>

	<p>
		Now you have to include the Tailwind config in your <code>vite.config.js</code> file so that Svane
		can read it:
	</p>
	<pre>
{`import path from 'path';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	optimizeDeps: {
		include: ['tailwind-config'],
		force: true // force to refresh the config file on change in DEV mode
	},
	plugins: [sveltekit()],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
			'tailwind-config': path.resolve(__dirname, './tailwind.config.js')
		}
	}
});`}
	</pre>

	<p class="font-bold">
		Important: If you change the screens in your <code>tailwind.config.js</code> file, you have to restart
		the dev server!
	</p>
	<p>Then in your <code>+layout.svelte</code> or any other page/component:</p>

	<pre>
{`<script>
	import { Svane } from '@shipbit/svane';
	import { browser } from '$app/environment';
</script>

{#if import.meta.env.DEV && browser}
	<Svane />
{/if}`}
</pre>

	<h3>Parameters (all optional):</h3>

	<pre>
{`<!-- Don't autohide Svane -->
<Svane stayOpen />

<!-- default: 'top' -->
<Svane position="bottom" />

<!-- hide Svane after the given milliseconds have passed (default: 2500) -->
<Svane duration={5000} />`}
</pre>

	<p>You can mix and match these params, of course.</p>
</main>

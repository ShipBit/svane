<script>
	import Svane from '$lib/Svane.svelte';
	import '../app.css';
</script>

{#if import.meta.env.DEV}
	<Svane />
{/if}

<main class="prose lg:prose-xl m-auto p-4">
	<h1>Svane: Your flag in the Tailwind</h1>
	<p>
		Svane is a simple Svelte component that allows you to see the Tailwind viewport / breakpoint you
		are currently in and the "distance" to the next viewport (as progress percentage). Svane
		displayed a fixed bar at the top or bottom of the screen, overlaying your content.
	</p>
	<p>
		By default, the Svane bar is shown initially after reloading the page and whenever you resize
		the browser window. It will then vanish after a short delay automatically. Force to show it by
		pressing <span><kbd><kbd>Shift</kbd> + <kbd>T</kbd></kbd></span> on your keyboard. If you do press the shortcut, Svane will stay open until
		you press it again.
	</p>
	<p>
		You can either install Svane as dependecy using a package manager of your choice or just
		copy + paste the `Svane.svelte` file into your project. There are no third-party dependencies
		apart from Tailwind itself, so it's that simple!
	</p>

	<h2>Installation</h2>
	<pre>
bash npm install @shipbit/svane
	</pre>

	<p>Then in your +layout.svelte or any other page/component:</p>

	<pre>
{`<script>
	import Svane from '@shipbit/svane';
</script>

{#if import.meta.env.DEV}
	<Svane />
{/if}`}
</pre>

	<h3>Parameters (all optional):</h3>

	<pre>
{`<!-- Breakpoint override: Use the ones defined in your Tailwind theme config here. -->
<!-- Svane uses the default Tailwind breakpoints (sm, md, lg, xl, 2xl) by default. -->
<Svane
	breakpoints={{ phone: { max: 767 }, tablet: { min: 768, max: 1279 }, desktop: { min: 1280 } }}
/>

<!-- Don't autohide Svane -->
<Svane stayOpen />

<!-- default: 'top' -->
<Svane position="bottom" />

<!-- hide Svane after the given milliseconds have passed (default: 2500) -->
<Svane duration={5000} />`}
</pre>

	<p>You can mix and match these params, of course.</p>
</main>


<style>
	kbd > kbd {
	display: inline-flex;
    align-items: center;
    justify-content: center;
    border-width: 1px;
    border-color: hsl(220 13% 69%);
    --tw-border-opacity: .2;
    --tw-bg-opacity: 1;
    background-color: hsl(213, 18%, 12%);
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    border-radius: 3px;
    border-bottom-width: 2px;
	color: white;
    
	}
</style>
# Svane - Your flag in the Tailwind

Svane is a simple Svelte component that allows you to see the Tailwind viewport / breakpoint you are currently in and the "distance" to the next viewport (as progress percentage).
Svane displayed a fixed bar at the top or bottom of the screen, overlaying your content.

By default, the Svane bar is shown initially after reloading the page and whenever you resize the browser window. It will then vanish after a short delay automatically.
Force to show it by pressing "Shift + T" on your keyboard. If you do press the shortcut, Svane will stay open until you press it again.

You can either install Svane as dependecy using the package manager of your choice or just copy&paste the `Svane.svelte` file into your project.
There are no third-party dependencies apart from Tailwind itself, so it's that simple!

## Installation

```bash
npm install @shipbit/svane
```

Then in your +layout.svelte or any other page/component:

```svelte
<script>
 import Svane from '@shipbit/svane';
</script>

{#if import.meta.env.DEV}
 <Svane />
{/if}
```

### Parameters (all optional)

```svelte
<!-- Breakpoint override: Use the ones defined in your Tailwind theme config here. -->
<!-- Svane uses the default Tailwind breakpoints (sm, md, lg, xl, 2xl) by default. -->
<Svane breakpoints={{ phone: { max: 767 }, tablet: { min: 768, max: 1279 }, desktop: { min: 1280 } }}/>

<!-- Don't autohide Svane -->
<Svane stayOpen />

<!-- default: 'top' -->
<Svane position="bottom" />

<!-- hide Svane after the given milliseconds have passed (default: 2500) -->
<Svane duration={5000} />
```

You can mix and match these params, of course.

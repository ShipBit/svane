<script>
	import { onMount } from 'svelte';
	import { readable } from 'svelte/store';
	import { fly } from 'svelte/transition';
	import resolveConfig from 'tailwindcss/resolveConfig';
	import tailwindConfig from 'tailwind-config';
	import { browser } from '$app/environment';

	/** @type {boolean} */
	export let stayOpen = false;

	/** @type {number} */
	export let duration = 2500;

	/** @type {('top'|'bottom')} */
	export let position = 'top';

	let config;
	let screens = {};

	let innerWidth;
	let innerHeight;
	let currentPosition;
	let show = false;

	onMount(() => {
		config = resolveConfig(tailwindConfig);
		// console.log(config.theme.screens);

		/* Tailwind config looks like this and is always orderd by size (small to large), see https://tailwindcss.com/docs/screens
		 screens: {
			'sm': '640px',
			// => @media (min-width: 640px) { ... }
			'md': '768px',
			// => @media (min-width: 768px) { ... }
			'lg': '1024px',
			// => @media (min-width: 1024px) { ... }
			'xl': '1280px',
			// => @media (min-width: 1280px) { ... }
			'2xl': '1536px',
			// => @media (min-width: 1536px) { ... }
    	} */

		for (const [name, value] of Object.entries(config.theme.screens)) {
			screens[name] = {
				min: Number(value.replace('px', '')),
				mediaQuery: `(min-width: ${value})`
			};
		}

		currentPosition = readable({}, (set) => {
			const refresh = () => {
				for (const [name, value] of Object.entries(screens)) {
					if (window.matchMedia(value.mediaQuery)?.matches) {
						set({
							screen: name,
							percentage: Math.round(calculateViewportPercentage(name) * 100)
						});
					}
				}
				showForDuration();
			};

			refresh();

			window.addEventListener('resize', refresh);

			return function stop() {
				window.removeEventListener('resize', refresh);
			};
		});
	});

	function calculateViewportPercentage(screenName) {
		let currentScreen;
		let nextScreen;

		for (let i = 0; i < Object.keys(screens).length; i++) {
			const screen = Object.keys(screens)[i];
			if (screen === screenName) {
				currentScreen = screens[screen];
				nextScreen = screens[Object.keys(screens)[i + 1]];
				break;
			}
		}

		const rangeStart = currentScreen.min;
		const rangeEnd = nextScreen && nextScreen.min - 1;

		if (!rangeEnd) {
			return 1;
		}

		return (innerWidth - rangeStart) / (rangeEnd - rangeStart);
	}

	function showForDuration() {
		if (show) return;
		show = true;

		if (!stayOpen) {
			setTimeout(() => {
				show = false;
			}, duration);
		}
	}

	const shortcut = (_node, params) => {
		let handler;
		const removeHandler = () => window.removeEventListener('keydown', handler),
			setHandler = () => {
				removeHandler();
				if (!params) return;

				handler = (e) => {
					if (
						!!params.alt != e.altKey ||
						!!params.shift != e.shiftKey ||
						!!params.control != (e.ctrlKey || e.metaKey) ||
						params.code != e.code
					)
						return;
					e.preventDefault();
					if (params?.callback) {
						params.callback();
					}
				};

				window.addEventListener('keydown', handler);
			};

		setHandler();

		return {
			update: setHandler,
			destroy: removeHandler
		};
	};
</script>

<svelte:window
	bind:innerWidth
	bind:innerHeight
	use:shortcut={{ shift: true, code: 'KeyT', callback: () => (show = !show) }}
/>

{#if browser && show}
	<div
		class="fixed top-0 w-screen bg-gray-800 text-white py-4 px-6"
		class:top-0={position === 'top'}
		class:bottom-0={position === 'bottom'}
		transition:fly={{ y: position === 'top' ? -200 : 200, duration: 400 }}
	>
		<div class="flex space-x-4 items-center">
			{#each Object.keys(screens) as screen}
				{#if $currentPosition?.screen === screen}
					<div class="relative w-full bg-slate-700 border border-blue-500 rounded-xl">
						<div
							class="absolute h-full bg-blue-800 text-center rounded-xl"
							style={`width: ${$currentPosition.percentage}%`}
						/>
						<div class="relative flex space-x-10 items-center justify-center text-slate-50">
							<span class="font-semibold text-xs">{$currentPosition.percentage}%</span>
							<span class="font-bold">{screen}</span>
							<span class="font-semibold text-xs">{innerWidth} x {innerHeight}</span>
						</div>
					</div>
				{:else}
					<div class="py-0 px-4 border border-slate-400 text-slate-400 rounded-xl">
						{screen}
					</div>
				{/if}
			{/each}
		</div>
	</div>
{/if}

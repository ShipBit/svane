<script>
	import { readable } from 'svelte/store';

	// TODO: Get from Tailwind config
	export let breakpoints = {
		sm: { max: 767 },
		md: { min: 768, max: 1023 },
		lg: { min: 1024, max: 1279 },
		xl: { min: 1280, max: 1535 },
		'2xl': { min: 1536 }
	};

	let mediaQueries = {};

	for (const [name, sizes] of Object.entries(breakpoints)) {
		let mediaQuery = '';
		if (sizes.min) {
			mediaQuery += `(min-width: ${sizes.min}px)`;
			if (sizes.max) {
				mediaQuery += ' and ';
			}
		}

		if (sizes.max) {
			mediaQuery += `(max-width: ${sizes.max}px)`;
		}

		mediaQueries[name] = mediaQuery;
	}

	function calculateViewportPercentage(breakpoints, innerWidth) {
		let matchingBreakpoint = null;

		for (const breakpoint in breakpoints) {
			const values = breakpoints[breakpoint];
			const min = values.min || 0;
			const max = values.max || Infinity;

			if (min <= innerWidth && innerWidth <= max) {
				matchingBreakpoint = values;
				break;
			}
		}

		if (matchingBreakpoint === null) {
			return `The given innerWidth (${innerWidth}) doesn't match any breakpoints`;
		}

		const rangeStart = matchingBreakpoint.min || 0;
		const rangeEnd = matchingBreakpoint.max;

		if (!rangeEnd) {
			return 1;
		}

		return (innerWidth - rangeStart) / (rangeEnd - rangeStart);
	}

	function breakpointMatcher() {
		if (typeof window === 'undefined') {
			return readable(null);
		}

		return readable('', (set) => {
			const breakpointNames = Object.keys(mediaQueries);

			Object.keys(mediaQueries).forEach(
				(mql) => (mediaQueries[mql] = window.matchMedia(mediaQueries[mql]))
			);

			function setCurrentBreakPoint() {
				for (const size of breakpointNames) {
					const mql = mediaQueries[size];
					if (mql?.matches) {
						set(size);
					}
				}
			}

			setCurrentBreakPoint();
			window.addEventListener('resize', setCurrentBreakPoint);
		});
	}

	const currentBreakpointName = breakpointMatcher();

	let innerWidth;
	let innerHeight;

	$: percent = Math.round(calculateViewportPercentage(breakpoints, innerWidth) * 100);
</script>

<svelte:window bind:innerWidth bind:innerHeight />

<div class="absolute top-0 w-screen bg-gray-800 text-white p-4">
	<div class="flex space-x-4 items-center">
		{#each Object.keys(mediaQueries) as breakpoint}
			{#if $currentBreakpointName === breakpoint}
				<div class="relative w-full bg-slate-700 border-2 border-slate-300 rounded-xl">
					<div
						class="absolute h-full bg-blue-800 text-center rounded-xl"
						style={`width: ${percent}%`}
					/>
					<div
						class="relative flex space-x-6 lg:space-x-8 xl:space-x-10 2xl:space-x-16 items-center justify-center text-slate-50"
					>
						<span class="font-semibold text-xs">{percent}%</span>
						<span class="font-bold">{breakpoint}</span>
						<span class="font-semibold text-xs">{innerWidth} x {innerHeight}</span>
					</div>
				</div>
			{:else}
				<div class="py-0 px-4 border-2 border-slate-400 text-slate-400 rounded-xl">
					{breakpoint}
				</div>
			{/if}
		{/each}
	</div>
</div>

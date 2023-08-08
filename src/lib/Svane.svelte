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

	$: percent = Math.round(calculateViewportPercentage(breakpoints, innerWidth) * 100);
</script>

<svelte:window bind:innerWidth />

<div class="absolute top-0 w-screen bg-gray-600 text-white p-4">
	<div class="flex space-x-4 items-center">
		{#each Object.keys(mediaQueries) as breakpoint}
			{#if $currentBreakpointName === breakpoint}
				<div class="w-full h-4 bg-gray-200 rounded-full dark:bg-gray-700">
					<div
						class="h-5 bg-blue-600 rounded-full dark:bg-blue-500 text-center p-0.5 leading-none"
						style={`width: ${percent}%`}
					>
						<div class="flex space-x-12 items-center justify-center">
							<span class="font-bold text-blue-100">{breakpoint}</span>
							<span class="text-xs font-semibold text-blue-50">{percent}%</span>
						</div>
					</div>
				</div>
			{:else}
				<div class="">{breakpoint}</div>
			{/if}
		{/each}
	</div>
</div>

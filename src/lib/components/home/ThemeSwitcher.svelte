<script lang="ts">
	import { onMount } from 'svelte';
	import { currentTheme, restoreDevTheme, toggleTheme, type Theme } from '#lib/theme.ts';

	let theme = $state<Theme>('dark');

	onMount(() => {
		restoreDevTheme();
		theme = currentTheme();
	});

	function onToggle() {
		theme = toggleTheme();
	}
</script>

<button
	class="theme-toggle"
	type="button"
	aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
	onclick={onToggle}
>
	<svg
		class="moon"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="1.6"
		stroke-linecap="round"
		stroke-linejoin="round"
		aria-hidden="true"
	>
		<path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z" />
	</svg>
	<svg
		class="sun"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="1.6"
		stroke-linecap="round"
		aria-hidden="true"
	>
		<circle cx="12" cy="12" r="4" />
		<path
			d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"
		/>
	</svg>
</button>

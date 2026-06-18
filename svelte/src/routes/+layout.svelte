<script>
	import '../styles/global.css';
	import NProgress from 'nprogress';
	import 'nprogress/nprogress.css';
	import { beforeNavigate, afterNavigate } from '$app/navigation';
	import MainNav from '$lib/components/MainNav.svelte';
	import MainFooter from '$lib/components/MainFooter.svelte';
	import CommandPalette from '$lib/components/CommandPalette.svelte';
	import { commandPaletteOpen } from '$lib/stores/commandPalette.js';

	// Props
	let { children, data } = $props();

	function handleGlobalKey(e) {
		if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
			e.preventDefault();
			commandPaletteOpen.update(v => !v);
		}
	}

	// Vars
	let loadingTimeout;

	// configure nprogress
	NProgress.configure({ showSpinner: false });

	// handle navigation
	beforeNavigate(() => {
		loadingTimeout = setTimeout(() => NProgress.start(), 100);
		// NProgress.start();
	});

	afterNavigate(() => {
		clearTimeout(loadingTimeout);
		NProgress.done();
	});
</script>

<svelte:window on:keydown={handleGlobalKey} />

<svelte:head>
	<title>Mitchell Barton</title>
</svelte:head>

<MainNav />

<main class="flex-1 flex flex-col">
	{@render children()}
</main>

<MainFooter />

<CommandPalette entries={data.entries} />

<div class="bg-grid">
	<div></div>
	<div></div>
	<div></div>
	<div></div>
	<div></div>
	<div></div>
	<div></div>
	<div></div>
	<div></div>
	<div></div>
	<div></div>
	<div></div>
	<div></div>
</div>

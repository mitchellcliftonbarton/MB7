<script>
	import '../styles/global.css';
	import NProgress from 'nprogress';
	import 'nprogress/nprogress.css';
	import { beforeNavigate, afterNavigate } from '$app/navigation';
	import MainNav from '$lib/components/MainNav.svelte';
	import MainFooter from '$lib/components/MainFooter.svelte';

	// Props
	let { children } = $props();

	// Vars
	// let loadingTimeout;

	// configure nprogress
	NProgress.configure({ showSpinner: false });

	// handle navigation
	beforeNavigate(() => {
		// loadingTimeout = setTimeout(() => NProgress.start(), 200);
		NProgress.start();
	});

	afterNavigate(() => {
		// clearTimeout(loadingTimeout);
		NProgress.done();
	});
</script>

<svelte:head>
	<title>Mitchell Barton</title>
</svelte:head>

<MainNav />

<main class="flex-1 flex flex-col">
	{@render children()}
</main>

<MainFooter />

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

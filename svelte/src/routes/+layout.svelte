<script>
	import '../styles/global.css';
	import NProgress from 'nprogress';
	import 'nprogress/nprogress.css';
	import { beforeNavigate, afterNavigate } from '$app/navigation';
	import { page } from '$app/state';
	import MainNav from '$lib/components/MainNav.svelte';
	import MainFooter from '$lib/components/MainFooter.svelte';
	import CommandPalette from '$lib/components/CommandPalette.svelte';
	import { commandPaletteOpen } from '$lib/stores/commandPalette.js';
	import { siteSettings } from '$lib/stores/siteSettings.js';
	import { onMount } from 'svelte';
	import { loadGoogleAnalytics, trackEvent } from '$lib/utils/analytics.js';

	const GA_MEASUREMENT_ID = 'G-5B6FEEPJDB';

	// Props
	let { children, data } = $props();

	// boot Google Analytics once, client-side
	onMount(() => {
		loadGoogleAnalytics(GA_MEASUREMENT_ID);
	});

	// mirrors the per-route <title> tags set in each route (see those files)
	const ogTitles = {
		'/': 'Mitchell Barton',
		'/calendar': 'Mitchell Barton | Calendar',
		'/calendar/[date]': 'Mitchell Barton | Calendar',
		'/info': 'Mitchell Barton | Info',
	};
	let ogTitle = $derived(ogTitles[page.route.id] ?? 'Mitchell Barton');
	let ogImage = $derived(page.data.entryOgImage ?? page.data.defaultOgImage);

	// reflect site settings onto the body so styles can react globally
	$effect(() => {
		const s = $siteSettings;
		document.body.classList.toggle('hide-grid', s.hideGrid);
		document.body.classList.toggle('hide-current-date', s.hideCurrentDate);
		document.body.classList.toggle('hide-announcements', s.hideAnnouncements);
		document.body.dataset.difficulty = s.difficulty;
	});

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
		// loadingTimeout = setTimeout(() => NProgress.start(), 50);
		NProgress.start();
	});

	afterNavigate(() => {
		// clearTimeout(loadingTimeout);
		NProgress.done();

		// manual SPA pageview — auto tracking is off (see analytics.js).
		// afterNavigate also runs on initial load, so the first view is covered.
		trackEvent('page_view', {
			page_path: window.location.pathname + window.location.search,
			page_title: document.title,
		});
	});
</script>

<svelte:head>
	{#if ogImage}
		<meta property="og:title" content={ogTitle} />
		<meta property="og:type" content="website" />
		<meta property="og:image" content={ogImage} />
		<meta property="og:image:width" content="1200" />
		<meta property="og:image:height" content="630" />
		<meta name="twitter:card" content="summary_large_image" />
		<meta name="twitter:image" content={ogImage} />
	{/if}
</svelte:head>

<svelte:window on:keydown={handleGlobalKey} />

<MainNav />

<main class="flex-1 flex flex-col">
	{@render children()}
</main>

<MainFooter />

<CommandPalette entries={data.entries} />

<div class="bg-grid bg-grid-desktop">
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


<div class="bg-grid bg-grid-mobile">
	<div></div>
	<div></div>
	<div></div>
	<div></div>
	<div></div>
</div>
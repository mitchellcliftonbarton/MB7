<script>
	import '../styles/global.css';
	import favicon from '$lib/assets/favicon.svg';
	import MainNav from '$lib/components/MainNav.svelte';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<MainNav />

<main>
	{@render children()}
</main>

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

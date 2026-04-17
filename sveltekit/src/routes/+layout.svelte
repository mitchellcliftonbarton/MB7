<script>
	import '../styles/global.css';
	import MainNav from '$lib/components/MainNav.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<title>Mitchell Barton</title>
</svelte:head>

<MainNav />

<main class="flex-1 flex flex-col">
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

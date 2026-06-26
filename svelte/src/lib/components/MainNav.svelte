<script>
	import { page } from '$app/state';
	import EmailSignup from '$lib/components/EmailSignup.svelte';
	import { commandPaletteOpen } from '$lib/stores/commandPalette.js';

	// get todays date, and format it as April 20, 2026
	const today = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
</script>

<header class="flex-none">
	<!-- <a href="/" class={`fixed top-base left-base z-[5000] ${page.url.pathname === '/' ? 'text-blue' : ''}`}>Mitchell Barton</a> -->

	<div class="grid-item h-base w-full"></div>

	<div class="leading-text-base grid grid-cols-12 gap-base px-base">
		<div class="col-span-2">
			<a href="/" class={page.url.pathname === '/' ? 'text-blue' : ''}>Mitchell Barton</a>
		</div>

		<div class="col-span-1">
			<a href="/calendar" class={page.url.pathname === '/calendar' || page.url.pathname.startsWith('/calendar/') ? 'text-blue' : ''}>Calendar</a>
		</div>

		<div class="col-span-1">
			<a href="/info" class={page.url.pathname === '/info' ? 'text-blue' : ''}>Info</a>
		</div>

		<div class="col-span-2 col-start-6 flex justify-center">
			<p>
				Today is: <span class="text-green">{today}</span>
			</p>
		</div>

		<div class="col-span-2 col-start-11 flex justify-end">
			<button class="text-right" onclick={() => commandPaletteOpen.set(true)}>Controls/Search (⌘K)</button>
		</div>
	</div>

	{#if !page.url.pathname.startsWith('/calendar')}
		<div class="grid-item h-base w-full"></div>
	{/if}

  {#if page.url.pathname === '/'}
    <div class="relative z-1 px-base grid grid-cols-12 gap-base">
      <div class="col-span-9 bg-yellow-alt">
        <p>New website launched, please be nice to it :)</p>
      </div>

			<EmailSignup />
    </div>

    <!-- <div class="grid-item h-base w-full"></div> -->
  {/if}
</header>

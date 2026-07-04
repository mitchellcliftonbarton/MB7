<script>
	import { page } from '$app/state';
	import EmailSignup from '$lib/components/EmailSignup.svelte';
	import { commandPaletteOpen } from '$lib/stores/commandPalette.js';

	// get todays date, and format it as April 20, 2026
	const today = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
</script>

<header class="flex-none z-10">
	<!-- <a href="/" class={`fixed top-base left-base z-[5000] ${page.url.pathname === '/' ? 'text-blue' : ''}`}>Mitchell Barton</a> -->

	<div class="grid-item h-base w-full"></div>

	<div class="leading-text-base grid grid-cols-4 lg:grid-cols-12 gap-base px-base items-start">
		<div class="col-span-1 lg:col-span-2">
			<a href="/" class={page.url.pathname === '/' ? 'text-blue' : ''}>Mitchell Barton</a>
		</div>

		<div class="col-span-1">
			<a href="/calendar" class={page.url.pathname === '/calendar' || page.url.pathname.startsWith('/calendar/') ? 'text-blue' : ''}>Calendar</a>
		</div>

		<div class="col-span-1">
			<a href="/info" class={page.url.pathname === '/info' ? 'text-blue' : ''}>Info</a>
		</div>

		<div class="col-span-2 col-start-6 hidden lg:flex justify-center">
			<p class="current-date">
				Today is: <span class="text-green">{today}</span>
			</p>
		</div>

		<div class="col-span-1 lg:col-span-2 lg:col-start-11 flex justify-end">
			<button class="text-right" onclick={() => commandPaletteOpen.set(true)}>Search <span class="hidden lg:inline">(⌘K)</span></button>
		</div>
	</div>

	{#if !page.url.pathname.startsWith('/calendar')}
		<div class="grid-item h-base w-full"></div>
	{/if}

  {#if page.url.pathname === '/'}
    <div class="announcements relative z-1 px-base grid grid-cols-4 lg:grid-cols-12 lg:gap-base">
      <div class="col-span-4 lg:col-span-9 bg-yellow-alt">
        <p>New website launched, still uploading content. Please be nice to it :)</p>
      </div>

			<div class="col-span-4 grid-item h-base lg:hidden"></div>

			<EmailSignup />
    </div>
  {/if}
</header>

<style>
	.current-date {
		:global(body.hide-current-date) & {
			display: none;
		}
	}

	.announcements {
		:global(body.hide-announcements) & {
			display: none;
		}
	}
</style>

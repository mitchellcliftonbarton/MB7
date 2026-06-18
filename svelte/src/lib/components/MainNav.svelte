<script>
	import { page } from '$app/state';
	import ArrowRight from '$lib/components/ArrowRight.svelte';
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

			<div class="email-signup col-span-3 relative">
				<p class="absolute -translate-y-full">Subscribe w/</p>
				<p class="invisible">Email Address</p>

				<form action="" class="w-full h-full absolute inset-0">
					<input type="text" placeholder="Email Address" class="w-full">

					<button type="submit" class="absolute right-0 top-[50%] translate-y-[-50%] text-black">
						<ArrowRight />
					</button>
				</form>
			</div>
    </div>

    <!-- <div class="grid-item h-base w-full"></div> -->
  {/if}
</header>

<style>
	.email-signup {
		background-color: var(--color-green-alt);

		input {
			line-height: 1;
			transform: translateY(-0.21em);

			&::placeholder {
				color: var(--color-black);
			}

			&::selection {
				background-color: var(--color-black);
				color: var(--color-white);
			}
		}

		button[type="submit"] {
			cursor: pointer;

			& :global(svg) {
				width: 1.7rem;
			}
		}
	}
</style>

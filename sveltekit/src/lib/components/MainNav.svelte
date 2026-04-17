<script>
	import { page } from '$app/state';
	import ArrowRight from '$lib/components/ArrowRight.svelte';
</script>

<header class="flex-none">
	<div class="grid-item h-base w-full"></div>

	<div class="leading-text-base grid grid-cols-12 gap-base px-base">
		<div class="col-span-2">
			<a href="/" class={page.url.pathname === '/' ? 'text-blue' : ''}>Mitchell Barton</a>
		</div>

		<div class="col-span-1">
			<a href="/work" class={page.url.pathname === '/work' ? 'text-blue' : ''}>All Work</a>
		</div>

		<div class="col-span-1">
			<a href="/calendar" class={page.url.pathname === '/calendar' ? 'text-blue' : ''}>Calendar</a>
		</div>

		<div class="col-span-1">
			<a href="/info" class={page.url.pathname === '/info' ? 'text-blue' : ''}>Info</a>
		</div>

		<div class="col-span-5">
			<p>
				Today is: <span class="text-green">Apr 7, 2026</span>. __ days since I made art.
			</p>
		</div>

		<div class="col-span-2 flex justify-end">
			<button class="text-right">Controls/Search (⌘K)</button>
		</div>
	</div>

	<div class="grid-item h-base w-full"></div>

  {#if page.url.pathname === '/'}
    <div class="relative z-1 px-base grid grid-cols-12 gap-base">
      <div class="col-span-9 bg-yellow-alt">
        <p>This is a new website, please be nice to it.</p>
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

    <div class="grid-item h-base w-full"></div>
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

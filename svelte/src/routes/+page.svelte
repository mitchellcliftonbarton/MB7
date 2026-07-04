<script>
  // imports
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import Month from '$lib/components/Month.svelte';
  import CalendarListItem from '$lib/components/CalendarListItem.svelte';
  import FeaturedItem from '$lib/components/FeaturedItem.svelte';
  import Lightbox from '$lib/components/Lightbox.svelte';
  import { LIGHTBOX_WORK_PARAM } from '$lib/stores/lightbox.js';

  // props
  let { data } = $props();

  // data
  let homeData = $derived(
    data.homeData.filter(e => e.text || e.media?.length)
  );
  let featuredWork = $derived(data.featuredWork);

  // derived
  let view = $derived($page.url.searchParams.get('view') || 'month');

  // Lightbox open/close is driven by the ?work= URL param, resolved synchronously
  // (a $derived, not an $effect) so it renders during SSR and doesn't flash the
  // page on refresh. The param is the item's slug, falling back to its index for
  // items without a slug yet. Deep-linking and the browser back button come free.
  const workId = (item, i) => item.slug ?? String(i);
  let activeWork = $derived($page.url.searchParams.get(LIGHTBOX_WORK_PARAM));
  let activeItem = $derived(
    activeWork == null ? null : featuredWork.find((w, i) => workId(w, i) === activeWork)
  );
  let activeMedia = $derived((activeItem?.media ?? []).filter(m => m?.asset));

  // If ?work= is present but matches no featured item, strip just that param
  // (keeping any others) via replaceState so we land on a clean home page
  // without a dead history entry. Runs client-side only.
  $effect(() => {
    if (activeWork != null && activeItem == null) {
      const url = new URL(window.location.href);
      url.searchParams.delete(LIGHTBOX_WORK_PARAM);
      goto(url.pathname + url.search + url.hash, {
        replaceState: true,
        noScroll: true,
        keepFocus: true,
      });
    }
  });

  // last six months
  const lastSixMonths = (() => {
    const now = new Date();
    return Array.from({ length: 6 }, (_, i) => {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      return { year: d.getFullYear(), month: d.getMonth() };
    });
  })();
</script>

<svelte:head>
	<title>Mitchell Barton</title>
</svelte:head>

<section class="page-header hidden">
  <div class="top-bar h-base grid-item"></div>

  <div class="grid grid-cols-12 gap-base px-base">
    <div class="col-span-6 col-start-2">
      <p>Featured work:</p>
    </div>

    <div class="lately col-span-5 flex items-center gap-4">
      <p>Lately:</p>
      
      <div class="flex gap-6">
        <a href="/" class={view === 'month' ? 'active' : ''}>Month View</a>
        <a href="/?view=list" class={view === 'list' ? 'active' : ''}>List View</a>
      </div>
    </div>
  </div>

  <div class="h-base grid-item"></div>
</section>

<section class="main-content relative hidden">
  <div class="grid grid-cols-12 gap-base px-base">
    <div class="featured relative col-span-8 flex flex-col justify-end">
      <div class="featured-inner">
        {#each featuredWork as item, i}
          <FeaturedItem {item} workId={workId(item, i)} />
          <div class="h-base grid-item"></div>
        {/each}
      </div>
    </div>

    <div class="col-span-4 flex flex-col justify-end">
      <div class="calendar-inner">
        {#if view === 'month'}
          {#each lastSixMonths as { year, month }}
            <Month {year} {month} entries={homeData} />
            <div class="h-base grid-item"></div>
          {/each}
        {:else if view === 'list'}
          {#each homeData as entry}
            <CalendarListItem {entry} />
            <div class="h-base grid-item"></div>
          {/each}
        {/if}

        <a href="/calendar" class="text-center block bg-yellow relative z-1">View Full Calendar</a>
        <div class="h-base grid-item"></div>
      </div>
    </div>
  </div>
</section>

<Lightbox open={activeMedia.length > 0} media={activeMedia} caption={activeItem?.caption ?? ''} />

<style>
  .page-header {
    position: sticky;
    top: 0;
    z-index: 1000;
  }
  
  .calendar-inner,
  .featured-inner {
    position: sticky;
    bottom: 0;
    z-index: 10;
  }

  .top-bar {
    :global(body.hide-announcements) & {
      display: none;
    }
  }

  .main-content {
    /* &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: var(--spacing-base);
      height: 100%;
      background-color: var(--color-grid-bg-alt);
    }

    &::after {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      width: var(--spacing-base);
      height: 100%;
      background-color: var(--color-grid-bg-alt);
    }

    .featured {
      &::after {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        width: var(--spacing-base);
        height: 100%;
        background-color: var(--color-grid-bg-alt);
        transform: translateX(100%);
      }
    } */
  }

  .lately {
    a {
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: .7rem;

      &::before {
        content: '';
        display: block;
        width: .7em;
        height: .7em;
        border: 2px solid var(--color-black);
        transform: translateY(0.08em);
      }

      &.active {
        &::before {
          background-color: var(--color-red);
        }
      }
    }
  }
</style>
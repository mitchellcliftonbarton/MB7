<script>
  // imports
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import Month from '$lib/components/Month.svelte';
  import CalendarListItem from '$lib/components/CalendarListItem.svelte';
  import CalendarListItemSmall from '$lib/components/CalendarListItemSmall.svelte';
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
  let rawView = $derived($page.url.searchParams.get('view'));
  let view = $derived(rawView || 'month');

  // mobile switcher: Featured Work / Lately (Month) / Lately (Grid).
  // Shares the `view` param with desktop's Month/List toggle, but reads the
  // raw (un-defaulted) param — an absent param, or desktop's 'list' value
  // (which has no mobile UI), both fall through to Featured.
  let mobileView = $derived(
    rawView === 'month' || rawView === 'grid' ? rawView : 'featured'
  );

  // build an href for the mobile switcher, preserving every other search param
  function mobileViewHref(target) {
    const params = new URLSearchParams($page.url.searchParams);
    if (target === 'featured') params.delete('view');
    else params.set('view', target);
    const qs = params.toString();
    return qs ? `/?${qs}` : '/';
  }

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

<section class="page-header">
  <div class="top-bar h-base grid-item"></div>

  <div class="hidden lg:grid grid-cols-12 gap-base px-base">
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

  <div class="lg:hidden grid grid-cols-4 gap-base px-base">
    <div class="mobile-switcher col-span-4 grid grid-cols-4 gap-base">
      <a href={mobileViewHref('featured')} class="check-link {mobileView === 'featured' ? 'active' : ''}">Featured Work</a>
      <a href={mobileViewHref('month')} class="check-link {mobileView === 'month' ? 'active' : ''}">Lately (Month)</a>
      <a href={mobileViewHref('grid')} class="check-link {mobileView === 'grid' ? 'active' : ''}">Lately (Grid)</a>
    </div>
  </div>

  <div class="h-base grid-item"></div>
</section>

<section class="main-content relative">
  <div class="hidden lg:grid grid-cols-12 gap-base px-base">
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

  <div class="lg:hidden grid grid-cols-4 gap-base px-base">
    {#if mobileView === 'featured'}
      <div class="col-span-4">
        {#each featuredWork as item, i}
          <FeaturedItem {item} workId={workId(item, i)} />
          <div class="h-base grid-item"></div>
        {/each}
      </div>
    {:else if mobileView === 'month'}
      <div class="col-span-4">
        {#each lastSixMonths as { year, month }}
          <Month {year} {month} entries={homeData} />
          <div class="h-base grid-item"></div>
        {/each}

        <a href="/calendar" class="text-center block bg-yellow relative z-1">View Full Calendar</a>
      </div>
    {:else if mobileView === 'grid'}
      <ul class="results-list col-span-4">
        {#each homeData as entry, i (entry._id)}
          <li>
            <CalendarListItemSmall {entry} truncate />
          </li>
          {#if (i + 1) % 2 === 0}
            <li class="h-base grid-item col-span-2"></li>
          {/if}
        {/each}
        {#if homeData.length % 2 !== 0}
          <li class="h-base grid-item col-span-2"></li>
        {/if}
      </ul>

      <a href="/calendar" class="col-span-4 text-center block bg-yellow relative z-1">View Full Calendar</a>
    {/if}
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

  .results-list {
    list-style: none;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--spacing-base);
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
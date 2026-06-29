<script>
  // imports
  import { page } from '$app/stores';
  import Month from '$lib/components/Month.svelte';
  import CalendarListItem from '$lib/components/CalendarListItem.svelte';
  import FeaturedItem from '$lib/components/FeaturedItem.svelte';

  // props
  let { data } = $props();

  // data
  let homeData = $derived(
    data.homeData.filter(e => e.text || e.media?.length)
  );
  let featuredWork = $derived(data.featuredWork);

  // derived
  let view = $derived($page.url.searchParams.get('view') || 'month');

  // last six months
  const lastSixMonths = (() => {
    const now = new Date();
    return Array.from({ length: 6 }, (_, i) => {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      return { year: d.getFullYear(), month: d.getMonth() };
    });
  })();
</script>

<section class="page-header">
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

<section class="main-content relative">
  <div class="grid grid-cols-12 gap-base px-base">
    <div class="featured relative col-span-8 flex flex-col justify-end">
      <div class="featured-inner">
        {#each featuredWork as item}
          <FeaturedItem {item} />
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
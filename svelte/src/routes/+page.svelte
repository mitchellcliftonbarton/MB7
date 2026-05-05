<script>
  // imports
  import { page } from '$app/stores';
  import Month from '$lib/components/Month.svelte';
  import CalendarListItem from '$lib/components/CalendarListItem.svelte';

  // props
  let { data } = $props();

  // data
  let homeData = $derived(
    data.homeData.filter(e => e.text || e.media?.length)
  );

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
  <div class="h-base grid-item"></div>

  <div class="grid grid-cols-12 gap-base px-base">
    <div class="col-span-6 col-start-2 bg-white">
      <p>Featured work:</p>
    </div>

    <div class="lately col-span-5 flex items-center gap-4 bg-white">
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
    <div class="featured relative col-span-8">
      <div class="relative z-1 py-20 flex justify-center items-center">
        <figure class="aspect-[4/5] w-[45%] bg-grey-1"></figure>
      </div>

      <div class="h-base grid-item"></div>

      <div class="relative z-1 py-20 flex justify-center items-center">
        <figure class="aspect-[4/5] w-[45%] bg-grey-1"></figure>
      </div>

      <div class="h-base grid-item"></div>

      <div class="relative z-1 py-20 flex justify-center items-center">
        <figure class="aspect-[4/5] w-[45%] bg-grey-1"></figure>
      </div>

      <div class="h-base grid-item"></div>

      <div class="relative z-1 py-20 flex justify-center items-center">
        <figure class="aspect-[4/5] w-[45%] bg-grey-1"></figure>
      </div>

      <div class="h-base grid-item"></div>

      <div class="relative z-1 py-20 flex justify-center items-center">
        <figure class="aspect-[4/5] w-[45%] bg-grey-1"></figure>
      </div>

      <div class="h-base grid-item"></div>

      <div class="relative z-1 py-20 flex justify-center items-center">
        <figure class="aspect-[4/5] w-[45%] bg-grey-1"></figure>
      </div>

      <div class="h-base grid-item"></div>

      <div class="relative z-1 py-20 flex justify-center items-center">
        <figure class="aspect-[4/5] w-[45%] bg-grey-1"></figure>
      </div>

      <div class="h-base grid-item"></div>
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
  
  .calendar-inner {
    position: sticky;
    bottom: 0;
    z-index: 10;
  }

  /* .main-content {
    &::before {
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
    }
  } */

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
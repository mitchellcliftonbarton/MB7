<script>
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import Month from '$lib/components/Month.svelte';
  import CalendarListItemSmall from '$lib/components/CalendarListItemSmall.svelte';

  let { data, children } = $props();

  let years = $derived(
    [...new Set(data.entries.map(e => Number(e.date.split('-')[0])))]
      .sort((a, b) => b - a)
  );

  let view = $derived($page.url.searchParams.get('view') || 'month');
  let isDetailOpen = $derived($page.route.id === '/calendar/[date]');

  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();

  function monthCount(year) {
    return year === currentYear ? currentMonth + 1 : 12;
  }
</script>

<section class="page-header">
  <div class="h-base grid-item"></div>

  <div class="grid grid-cols-12 gap-base px-base">
    <div class="col-span-2">
      <button>Filter +</button>
    </div>

    <div class="view-by col-span-5 flex items-center gap-4">
      <p>View by:</p>
      <div class="flex gap-6">
        <a href="/calendar" class={view === 'month' ? 'active' : ''}>Month</a>
        <a href="/calendar?view=list" class={view === 'list' ? 'active' : ''}>List</a>
      </div>
    </div>
  </div>

  <div class="h-base grid-item"></div>
</section>

<div class="calendar-root">
  <div class="calendar-content">
    {#if view === 'month'}
      <section class="calendar-page">
        {#each years as year}
          <section class="year-section px-base">
            <div class="grid grid-cols-12 gap-base">
              <h2 class="year-heading col-span-2 col-start-6 text-center bg-grid-bg text-blue">{year}</h2>
            </div>

            <div class="h-base grid-item"></div>

            <div class="months-grid">
              {#each { length: monthCount(year) } as _, i}
                <Month {year} month={i} entries={data.entries} {view} />
                {#if i % 3 === 2 && i < monthCount(year) - 1}
                  <div class="h-base grid-item col-span-3"></div>
                {/if}
              {/each}
            </div>

            <div class="h-base grid-item"></div>
          </section>
        {/each}
      </section>
    {:else if view === 'list'}
      <section class="calendar-page grid grid-cols-6 gap-x-base px-base">
        {#each data.entries as entry, i}
          <CalendarListItemSmall {entry} {view} />
          {#if (i + 1) % 6 === 0}
            <div class="h-base grid-item col-span-6"></div>
          {/if}
        {/each}
      </section>
    {/if}
  </div>

  {#if isDetailOpen}
    <div class="calendar-detail">
      <a href={view === 'list' ? '/calendar?view=list' : '/calendar'} class="closer" data-sveltekit-noscroll>
        <span class="sr-only">Back to calendar</span>
      </a>

      <div class="detail-panel">
        {@render children()}

        <div class="detail-panel-grid">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  {/if}
</div>

<style lang="postcss">
  .calendar-root {
    position: relative;
  }

  .calendar-detail {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 5000;
    display: flex;
    justify-content: center;
    align-items: center;

    .closer {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.35);
    }

    .detail-panel {
      width: calc(50% + var(--spacing-base));
      height: 100%;
      background: white;
      z-index: 100;
      overflow-y: auto;
      scrollbar-width: none;
      position: relative;
      transform: translate(0px, 0px); /* this creates a new contetx for for detail panel grid so that position fixed will work */

      /* &::before {
        content: '';
        display: block;
        width: var(--spacing-base);
        height: 100%;
        background-color: var(--color-grid-bg);
        position: absolute;
        top: 0;
        left: 0;
      }

      &::after {
        content: '';
        display: block;
        width: var(--spacing-base);
        height: 100%;
        background-color: var(--color-grid-bg);
        position: absolute;
        top: 0;
        right: 0;
      } */

      .detail-panel-grid {
        position: fixed;
        inset: 0;
        display: flex;
        justify-content: space-between;
        pointer-events: none;
        
        & > div {
          width: var(--spacing-base);
          height: 100%;
          background-color: var(--color-grid-bg);
        }
      }
    }
  }

  .months-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    column-gap: var(--spacing-base);
  }

  .view-by {
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

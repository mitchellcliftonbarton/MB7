<script>
  // imports
  import { page } from '$app/stores';
  import Month from '$lib/components/Month.svelte';
  import CalendarListItemSmall from '$lib/components/CalendarListItemSmall.svelte';

  // data
  let { data } = $props();

  // sorted unique years that have at least one entry, newest first
  let years = $derived(
    [...new Set(data.entries.map(e => Number(e.date.split('-')[0])))]
      .sort((a, b) => b - a)
  );

  // derived
  let view = $derived($page.url.searchParams.get('view') || 'month');

  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth(); // 0-indexed

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

{#if view === 'month'}
  <section class="calendar-page">
    {#each years as year}
      <section class="year-section px-base">
        <div class="grid grid-cols-12 gap-base">
          <h2 class="year-heading col-span-2 col-start-6 text-center bg-grid-bg">{year}</h2>
        </div>

        <div class="h-base grid-item"></div>

        <div class="months-grid">
          {#each { length: monthCount(year) } as _, i}
            <Month {year} month={i} entries={data.entries} />
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
      <CalendarListItemSmall {entry} />
      {#if (i + 1) % 6 === 0}
        <div class="h-base grid-item col-span-6"></div>
      {/if}
    {/each}
  </section>
{/if}

<style>
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

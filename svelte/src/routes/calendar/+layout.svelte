<script>
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import Month from '$lib/components/Month.svelte';
  import CalendarListItemSmall from '$lib/components/CalendarListItemSmall.svelte';
  import X from '$lib/components/X.svelte';

  let { data, children } = $props();

  // static facet options (sorted alphabetically by label)
  const typeOptions = [
    { value: 'notes', label: 'Notes' },
    { value: 'studio-log', label: 'Studio Log' },
    { value: 'works', label: 'Works' },
  ];
  const mediaTypeOptions = [
    { value: 'image', label: 'Image' },
    { value: 'text', label: 'Text' },
    { value: 'video', label: 'Video' },
  ];

  let view = $derived($page.url.searchParams.get('view') || 'month');
  let isDetailOpen = $derived($page.route.id === '/calendar/[date]');

  // all years across every entry (facet options)
  let allYears = $derived(
    [...new Set(data.entries.map(e => Number(e.date.split('-')[0])))]
      .sort((a, b) => b - a)
  );

  // only surface medium/content tags that are used by at least one entry
  let usedMediumIds = $derived(
    new Set(data.entries.flatMap(e => (e.medium ?? []).map(m => m._id)))
  );
  let usedContentIds = $derived(
    new Set(data.entries.flatMap(e => (e.content ?? []).map(c => c._id)))
  );
  let mediumOptions = $derived((data.allMediums ?? []).filter(m => usedMediumIds.has(m._id)));
  let contentOptions = $derived((data.allContent ?? []).filter(c => usedContentIds.has(c._id)));

  // selected filters, read from the URL
  let selected = $derived({
    type: $page.url.searchParams.getAll('type'),
    mediaType: $page.url.searchParams.getAll('mediaType'),
    year: $page.url.searchParams.getAll('year'),
    medium: $page.url.searchParams.getAll('medium'),
    content: $page.url.searchParams.getAll('content'),
  });

  let hasFilters = $derived(
    selected.type.length || selected.mediaType.length || selected.year.length ||
    selected.medium.length || selected.content.length
  );

  // OR within a facet, AND across facets
  let filteredEntries = $derived(
    data.entries.filter(e => {
      if (selected.type.length && !selected.type.includes(e.category)) return false;
      if (selected.mediaType.length && !(e.mediaType ?? []).some(m => selected.mediaType.includes(m))) return false;
      if (selected.year.length && !selected.year.includes(e.date.split('-')[0])) return false;
      if (selected.medium.length && !(e.medium ?? []).some(m => selected.medium.includes(slugify(m.title)))) return false;
      if (selected.content.length && !(e.content ?? []).some(c => selected.content.includes(slugify(c.title)))) return false;
      return true;
    })
  );

  // years to render (collapses to years that still have matches)
  let years = $derived(
    [...new Set(filteredEntries.map(e => Number(e.date.split('-')[0])))]
      .sort((a, b) => b - a)
  );

  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();

  function monthCount(year) {
    return year === currentYear ? currentMonth + 1 : 12;
  }

  // readable URL slug from a tag title, e.g. "Bones/Fossils" -> "bones-fossils"
  function slugify(str) {
    return String(str)
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  function isActive(key, value) {
    return selected[key].includes(String(value));
  }

  // toggle a filter value in the URL, preserving every other param
  function toggleFilter(key, value) {
    const val = String(value);
    const params = new URLSearchParams($page.url.searchParams);
    const current = params.getAll(key);
    params.delete(key);
    for (const v of current) {
      if (v !== val) params.append(key, v);
    }
    if (!current.includes(val)) params.append(key, val);
    const qs = params.toString();
    goto(qs ? `?${qs}` : $page.url.pathname, { noScroll: true, keepFocus: true });
  }

  function clearFilters() {
    const params = new URLSearchParams();
    const v = $page.url.searchParams.get('view');
    if (v) params.set('view', v);
    const qs = params.toString();
    goto(qs ? `?${qs}` : $page.url.pathname, { noScroll: true, keepFocus: true });
  }

  // preserve active filters when switching Month <-> List
  function viewHref(targetView) {
    const params = new URLSearchParams($page.url.searchParams);
    if (targetView === 'month') params.delete('view');
    else params.set('view', targetView);
    const qs = params.toString();
    return qs ? `/calendar?${qs}` : '/calendar';
  }

  // filter open/close state — start open if filters are already applied on load
  let isFilterOpen = $state(!!hasFilters);
</script>

<section class="page-header">
  <div class="h-base grid-item"></div>

  <div class="grid grid-cols-12 gap-base px-base">
    <div class="col-span-2">
      <button onclick={() => isFilterOpen = !isFilterOpen}>Filter {isFilterOpen ? '–' : '+'}</button>
    </div>

    <div class="view-by col-span-5 flex items-center gap-4">
      <p>View by:</p>
      <div class="flex gap-6">
        <a href={viewHref('month')} class="check-link {view === 'month' ? 'active' : ''}">Month</a>
        <a href={viewHref('list')} class="check-link {view === 'list' ? 'active' : ''}">List</a>
      </div>
    </div>
  </div>

  <div class="h-base grid-item"></div>

  {#if isFilterOpen}
    <div class="filters px-base">
      <div class="grid grid-cols-12 gap-base bg-grid-bg">
        <div class="col-span-2">
          <p>Type:</p>

          <div class="flex flex-col items-start gap-1">
            {#each typeOptions as opt}
              <button type="button" class="check-link {isActive('type', opt.value) ? 'active' : ''}" onclick={() => toggleFilter('type', opt.value)}>{opt.label}</button>
            {/each}
          </div>
        </div>

        <div class="col-span-2">
          <p>Media Type:</p>

          <div class="flex flex-col items-start gap-1">
            {#each mediaTypeOptions as opt}
              <button type="button" class="check-link {isActive('mediaType', opt.value) ? 'active' : ''}" onclick={() => toggleFilter('mediaType', opt.value)}>{opt.label}</button>
            {/each}
          </div>
        </div>

        <div class="col-span-2">
          <p>Year:</p>

          <div class="flex flex-col items-start gap-1">
            {#each allYears as year}
              <button type="button" class="check-link {isActive('year', year) ? 'active' : ''}" onclick={() => toggleFilter('year', year)}>{year}</button>
            {/each}
          </div>
        </div>

        <div class="col-span-2">
          <p>Materials/Medium:</p>

          <div class="flex flex-col items-start gap-1">
            {#if mediumOptions.length}
              {#each mediumOptions as m (m._id)}
                <button type="button" class="check-link {isActive('medium', slugify(m.title)) ? 'active' : ''}" onclick={() => toggleFilter('medium', slugify(m.title))}>{m.title}</button>
              {/each}
            {:else}
              <span class="empty">None yet</span>
            {/if}
          </div>
        </div>

        <div class="col-span-2">
          <p>Content:</p>

          <div class="flex flex-col items-start gap-1">
            {#if contentOptions.length}
              {#each contentOptions as c (c._id)}
                <button type="button" class="check-link {isActive('content', slugify(c.title)) ? 'active' : ''}" onclick={() => toggleFilter('content', slugify(c.title))}>{c.title}</button>
              {/each}
            {:else}
              <span class="empty">None yet</span>
            {/if}
          </div>
        </div>

        <div class="col-span-2 flex flex-col items-start">
          {#if hasFilters}
            <button type="button" class="clear-link" onclick={clearFilters}>
              <X />
              <span>Clear all</span>
            </button>
          {/if}
        </div>
      </div>
    </div>

    <div class="h-base grid-item"></div>
  {/if}
</section>

<div class="calendar-root">
  <div class="calendar-content">
    {#if filteredEntries.length === 0}
      <p class="no-results px-base">No entries match these filters.</p>
    {:else if view === 'month'}
      <section class="calendar-page">
        {#each years as year}
          <section class="year-section px-base">
            <div class="year-heading-container grid grid-cols-12 gap-base">
              <h2 class="year-heading col-span-2 col-start-6 text-center bg-grid-bg-flat text-blue p-3">{year}</h2>
            </div>

            <div class="h-base grid-item"></div>

            <div class="months-grid">
              {#each { length: monthCount(year) } as _, i}
                <Month {year} month={i} entries={filteredEntries} {view} />
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
        {#each filteredEntries as entry, i}
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
        <div class="detail-panel-scroll">
          {@render children()}
        </div>

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
      position: relative; /* containing block for the absolute grid overlay */
      overflow: hidden; /* clip; the inner element does the scrolling */

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

      .detail-panel-scroll {
        height: 100%;
        overflow-y: auto;
        scrollbar-width: none;
      }

      .detail-panel-grid {
        position: absolute;
        inset: 0;
        z-index: 1; /* sits over the scrolling content */
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

  .check-link {
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: .7rem;
    /* reset so <button> matches the <a> styling */
    background: none;
    border: none;
    padding: 0;
    margin: 0;
    font: inherit;
    color: inherit;
    text-align: left;

    &::before {
      content: '';
      display: block;
      flex: none;
      width: .7em;
      height: .7em;
      border: 2px solid var(--color-black);
      transform: translateY(0.08em);
    }

    &.active::before {
      background-color: var(--color-red);
    }
  }

  .empty {
    opacity: 0.45;
  }

  .year-heading-container {
    position: sticky;
    top: 0;
    z-index: 100;
  }

  .clear-link {
    display: flex;
    align-items: center;
    gap: .7rem;

    :global(svg) {
      width: 1.8rem;
    }
  }
</style>

<script>
  import { format, parseISO } from 'date-fns';
  import { page } from '$app/stores';
  import CalendarDetailItem from '$lib/components/CalendarDetailItem.svelte';
  import ArrowLeft from '$lib/components/ArrowLeft.svelte';
  import ArrowRight from '$lib/components/ArrowRight.svelte';
  import X from '$lib/components/X.svelte';

  let { data } = $props();

  let viewParam = $derived($page.url.searchParams.get('view'));
  let calendarBase = $derived(viewParam === 'list' ? '/calendar?view=list' : '/calendar');
  function dateHref(date) {
    return `/calendar/${date}${viewParam === 'list' ? '?view=list' : ''}`;
  }
</script>

<svelte:head>
	<title>Mitchell Barton | Calendar</title>
</svelte:head>

<div class="panel-header">
  <div class="h-base grid-item close-row lg:hidden"></div>

  <div class="flex lg:hidden justify-center px-base">
    <a href={calendarBase} class="close-btn" data-sveltekit-noscroll>
      <X />
      <span>Close</span>
    </a>
  </div>

  <div class="h-base grid-item"></div>

  <div class="px-base grid grid-cols-3 gap-base">
    <div class="col-span-1 flex justify-start">
      {#if data.prevDate}
        <a href={dateHref(data.prevDate)} class="prev-next-link" data-sveltekit-noscroll>
          <ArrowLeft />
          <span>{format(parseISO(data.prevDate), 'MMM d')}</span>
        </a>
      {:else}
        <span class="opacity-50">Beginning</span>
      {/if}
    </div>

    <div class="col-span-1 col-start-2 flex justify-center">
      <h2 class="text-blue text-center">{format(parseISO(data.date), 'MMMM d, yyyy')}</h2>
    </div>

    <div class="col-span-1 flex justify-end">
      {#if data.nextDate}
        <a href={dateHref(data.nextDate)} class="prev-next-link" data-sveltekit-noscroll>
          <span>{format(parseISO(data.nextDate), 'MMM d')}</span>
          <ArrowRight />
        </a>
      {:else}
        <span class="opacity-50">End</span>
      {/if}
    </div>
  </div>

  <div class="h-base grid-item"></div>
</div>

<div class="panel-body">
  {#if data.entries.length === 0}
    <div class="px-base">
      <p>No entries for this date.</p>
    </div>
  {:else}
    {#each data.entries as entry, i (i)}
      <CalendarDetailItem {entry} />
      {#if i !== data.entries.length - 1}
        <div class="h-base grid-item"></div>
      {/if}
    {/each}
  {/if}
</div>

<style lang="postcss">
  .panel-header {
    position: sticky;
    top: 0;
    z-index: 100;
    background-color: var(--color-white);

    @media (min-width: 1024px) {
      background-color: transparent;
    }
  }

  .prev-next-link {
    display: flex;
    align-items: center;
    gap: 0.5em;

    :global(svg) {
      width: 1.7rem;
    }
  }

  .close-btn {
    display: flex;
    align-items: center;
    gap: .7rem;

    :global(svg) {
      width: 1.8rem;
    }
  }
</style>

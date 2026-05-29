<script>
  import { format, parseISO } from 'date-fns';
  import CalendarDetailItem from '$lib/components/CalendarDetailItem.svelte';
  import ArrowLeft from '$lib/components/ArrowLeft.svelte';
  import ArrowRight from '$lib/components/ArrowRight.svelte';

  let { data } = $props();
</script>

<section class="calendar-subheader">
  <div class="h-base grid-item"></div>

  <div class="px-base grid grid-cols-12 gap-base">
    <div class="col-span-2">
      <a href="/calendar" class="back-link flex items-center gap-4">
        <ArrowLeft />
        <span>Back to full Calendar</span>
      </a>
    </div>

    <div class="col-span-8 flex justify-center">
      <h1>You're looking at: <span class="text-blue">{format(parseISO(data.date), 'MMMM d, yyyy')}</span></h1>
    </div>

    <div class="col-span-2 flex justify-between items-center gap-base">
      {#if data.nextDate}
        <a href="/calendar/{data.nextDate}" class="prev-next-link">
          <ArrowLeft />
          <span>{format(parseISO(data.nextDate), 'MMM d')}</span>
        </a>
      {:else}
        <span class="opacity-50">At beginning</span>
      {/if}

      {#if data.prevDate}
        <a href="/calendar/{data.prevDate}" class="prev-next-link">
          <span>{format(parseISO(data.prevDate), 'MMM d')}</span>
          <ArrowRight />
        </a>
      {:else}
        <span class="opacity-50">At end</span>
      {/if}
    </div>
  </div>

  <div class="h-base grid-item"></div>
</section>

{#if data.entries.length === 0}
  <section class="px-base">
    <p>No entries for this date.</p>
  </section>
{:else}
  <section>
    {#each data.entries as entry, i (i)}
      <CalendarDetailItem {entry} />
      {#if i !== data.entries.length - 1}
        <div class="h-base grid-item"></div>
      {/if}
    {/each}
  </section>
{/if}

<style lang="postcss">
  .calendar-subheader {
    position: sticky;
    top: 0;
    z-index: 1000;
  }

  .back-link {
    :global(svg) {
      width: 1.7rem;
    }
  }

  .prev-next-link {
    display: flex;
    align-items: center;
    gap: 1rem;

    :global(svg) {
      width: 1.7rem;
    }
  }
</style>
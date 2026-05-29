<script>
  import { format, parseISO } from 'date-fns';
  import CalendarListItem from '$lib/components/CalendarListItem.svelte';

  let { data } = $props();
</script>

<div class="px-base py-12">
  <h1 class="mb-12">{format(parseISO(data.date), 'MMMM d, yyyy')}</h1>

  {#if data.entries.length === 0}
    <p>No entries for this date.</p>
  {:else}
    {#each data.entries as entry}
      <CalendarListItem {entry} />
    {/each}
  {/if}
</div>

<script>
  import { urlFor } from '$lib/sanity/client.js';
  import { parseISO, format } from 'date-fns';
  import Image from '$lib/components/Image.svelte';
  import Portable from '$lib/components/Portable.svelte';

  let { entry } = $props();

  const categoryLabels = {
    'studio-log': 'Studio Log',
    'notes': 'Notes',
    'works': 'Works',
  };

  // get first media item
  const media = entry.media?.[0];
</script>

<a href="/calendar/{entry.date}" class="calendar-list-item-small relative z-1 pb-16 space-y-12">
  <div class="entry-header">
    <div class="flex justify-between items-center">
      <p class="date text-blue">{format(parseISO(entry.date), 'MMMM d, yyyy')}</p>

      {#if entry.category}
        <div class="categories">
          <span class="category {entry.category}">{categoryLabels[entry.category]}</span>
        </div>
      {/if}
    </div>

    {#if entry.text}
      <div class="text rich-text pr-base">
        <Portable value={entry.text} />
      </div>
    {/if}
  </div>

  {#if media}
    <figure class="aspect-square">
      {#if media.mediaType === 'video'}
        <!-- svelte-ignore a11y_media_has_caption -->
        <video src={media.url} preload="metadata"></video>
      {:else if media.asset}
        <Image item={media} classes="w-full h-full object-contain" />
      {/if}
    </figure>
  {/if}
</a>

<style>
  .calendar-list-item-small {
    & > * + .media {
      margin-top: 3rem;
    }
  }

  .category {
    display: flex;
    align-items: center;
    gap: 0.55rem;
    
    &::before {
      content: '';
      display: block;
      width: 0.7em;
      height: 0.7em;
      border-radius: 50%;
      background-color: var(--color-yellow);
      transform: translateY(0.05em);
    }

    &.notes {
      &::before {
        background-color: var(--color-green-alt);
      }
    }

    &.works {
      &::before {
        background-color: var(--color-red);
      }
    }
  }
</style>

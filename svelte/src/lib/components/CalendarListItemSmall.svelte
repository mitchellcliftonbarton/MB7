<script>
  import { urlFor } from '$lib/sanity/client.js';
  import { parseISO, format } from 'date-fns';
  import Image from '$lib/components/Image.svelte';
  import Portable from '$lib/components/Portable.svelte';

  let { entry, view = 'month', onclick, truncate = false, imageWidth = 1800 } = $props();

  const categoryLabels = {
    'studio-log': 'Studio Log',
    'notes': 'Notes',
    'works': 'Works',
  };

  // get first media item
  const media = entry.media?.[0];
</script>

<a href="/calendar/{entry.date}{view === 'list' ? '?view=list' : ''}" {onclick} data-sveltekit-noscroll class="calendar-list-item-small relative z-1 pb-16 space-y-12">
  <div class="entry-header">
    <div class="flex items-center gap-3">
      <span class="category {entry.category}"></span>
      <p class="date text-blue">{format(parseISO(entry.date), 'MM.dd.yyyy')}</p>
    </div>

    {#if entry.text}
      <div class="text rich-text pr-base w-full line-clamp-3 pb-2">
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
        <Image item={media} fetchWidth={imageWidth} classes="w-full h-full object-contain" />
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

  .text.truncate {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    overflow: hidden;
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

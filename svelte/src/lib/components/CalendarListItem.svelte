<script>
  import { urlFor } from '$lib/sanity/client.js';
  import { parseISO, format } from 'date-fns';
  import Image from '$lib/components/Image.svelte';
  import Portable from '$lib/components/Portable.svelte';
  import ArrowRight from '$lib/components/ArrowRight.svelte';

  let { entry } = $props();

  const categoryLabels = {
    'studio-log': 'Studio Log',
    'notes': 'Notes',
    'works': 'Works',
  };
</script>

<div class="calendar-list-item relative z-1 pb-20">
  <div class="entry-header">
    <div class="flex justify-between items-center">
      <div class="flex gap-12">
        <p class="date">{format(parseISO(entry.date), 'MMMM d, yyyy')}</p>

        {#if entry.category}
          <div class="categories">
            <span class="category {entry.category}">{categoryLabels[entry.category]}</span>
          </div>
        {/if}
      </div>

      <a href="/calendar/{entry.date}" class="view-link flex items-center gap-4">
        <span class="flex-none">View Entry</span> 
        <ArrowRight />
      </a>
    </div>

    {#if entry.text}
      <div class="text rich-text w-3/4">
        <Portable value={entry.text} />
      </div>
    {/if}
  </div>

  {#if entry.media?.length}
    <div class="media space-y-12">
      {#each entry.media as item, i (i)}
        <figure class="flex flex-col items-center gap-2">
          {#if item.mediaType === 'video'}
            <!-- svelte-ignore a11y_media_has_caption -->
            <video src={item.url} controls class="w-full"></video>
          {:else if item.asset}
            <Image {item} classes="w-2/3 shadow-lg" />
          {/if}

          {#if item.caption}
            <figcaption class="text-sm text-center">{item.caption}</figcaption>
          {/if}
        </figure>
      {/each}
    </div>
  {/if}
</div>

<style>
  .calendar-list-item {
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

  .view-link {
    :global(svg) {
      width: 1.7rem;
    }
  }
</style>

<script>
  import { urlFor } from '$lib/sanity/client.js';
  import Image from '$lib/components/Image.svelte';
  import Portable from '$lib/components/Portable.svelte';

  let { entry } = $props();

  const categoryLabels = {
    'studio-log': 'Studio Log',
    'notes': 'Notes',
    'works': 'Works',
  };
</script>

<div class="calendar-detail-item relative px-base grid grid-cols-5 gap-base">
  <div class="col-span-5 space-y-12">
    <div class="entry-header">
      <div class="flex gap-12">
        {#if entry.category}
          <div class="categories">
            <span class="category {entry.category}">{categoryLabels[entry.category]}</span>
          </div>
        {/if}
      </div>

      {#if entry.text}
        <div class="text rich-text w-full lg:w-3/4">
          <Portable value={entry.text} />
        </div>
      {/if}
    </div>

    {#if entry.media?.length}
      <div class="media space-y-12 pb-20 relative z-10">
        {#each entry.media as item, i (i)}
          <figure class="media-figure flex flex-col items-center gap-2">
            {#if item.mediaType === 'video'}
              <!-- svelte-ignore a11y_media_has_caption -->
              <video src={item.url} controls class="w-full"></video>
            {:else if item.asset}
              {@const dim = item.asset.metadata?.dimensions}
              <div
                class="img-frame flex items-center justify-center w-[95%] lg:w-[80%] lg:max-h-[80vh]"
                style="aspect-ratio: {dim ? `${dim.width} / ${dim.height}` : '4 / 3'}"
              >
                <Image {item} classes="w-auto h-auto max-w-full max-h-full object-contain shadow-lg" />
              </div>
            {/if}

            {#if item.caption}
              <figcaption class="text-sm text-center">{item.caption}</figcaption>
            {/if}
          </figure>
        {/each}
      </div>
    {/if}
  </div>
</div>

<style>
  .calendar-detail-item {
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

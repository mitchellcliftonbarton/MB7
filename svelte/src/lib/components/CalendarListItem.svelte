<script>
  import { urlFor } from '$lib/sanity/client.js';
  import { parseISO } from 'date-fns';
  import { format } from 'date-fns';
  import Image from '$lib/components/Image.svelte';
  import Portable from '$lib/components/Portable.svelte';

  let { entry } = $props();
</script>

<div class="calendar-list-item relative z-1 pb-20">
  <p class="date">{format(parseISO(entry.date), 'MMMM d, yyyy')}</p>

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

  {#if entry.text}
    <div class="text rich-text w-3/4">
      <Portable value={entry.text} />
    </div>
  {/if}
</div>

<style>
  .calendar-list-item {
    & > * + .media {
      margin-top: 3rem;
    }

    /* & > * + .text {
      margin-top: 1rem;
    } */
  }
</style>

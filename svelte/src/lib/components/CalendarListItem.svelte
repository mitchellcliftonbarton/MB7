<script>
  import { urlFor } from '$lib/sanity/client.js';
  import { parseISO } from 'date-fns';
  import { format } from 'date-fns';
  import Image from '$lib/components/Image.svelte';

  let { entry } = $props();
</script>

<div class="calendar-list-item relative z-1">
  <p class="date">{format(parseISO(entry.date), 'MMMM d, yyyy')}</p>

  {#if entry.text}
    <p class="text">{entry.text}</p>
  {/if}

  {#if entry.media?.length}
    <div class="media">
      {#each entry.media as item, i (i)}
        <figure>
          {#if item.mediaType === 'video'}
            <!-- svelte-ignore a11y_media_has_caption -->
            <video src={item.url} controls class="w-full"></video>
          {:else if item.asset}
            <Image {item} />
          {/if}

          {#if item.caption}
            <figcaption>{item.caption}</figcaption>
          {/if}
        </figure>
      {/each}
    </div>
  {/if}
</div>

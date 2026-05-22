<script>
  import Image from '$lib/components/Image.svelte';

  let { item } = $props();
</script>

<div class="featured-item relative z-1 py-20 flex justify-center items-center">
  <div class="w-[55%]">
    {#if item.media[0]?.asset}
      <figure class="aspect-4/5 w-full space-y-3">
        <Image item={item.media[0]} fetchWidth={2500} classes="w-full h-full object-cover" />

        <div>
          {#if item.caption}
            <figcaption class="text-sm text-left">{item.caption}</figcaption>
          {/if}
        </div>
      </figure>
    {/if}
  </div>
</div>

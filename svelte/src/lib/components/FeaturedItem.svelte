<script>
  import Image from '$lib/components/Image.svelte';
  import Plus from '$lib/components/Plus.svelte';
  import ArrowRight from '$lib/components/ArrowRight.svelte';
  import ArrowLeft from '$lib/components/ArrowLeft.svelte';
  import Swiper from 'swiper';
  import 'swiper/css';
  import { onMount } from 'svelte';
  import { openLightboxUrl } from '$lib/stores/lightbox.js';

  let { item, workId } = $props();

  // `item` is stable for the lifetime of this instance, so plain values are fine.
  const media = (item.media ?? []).filter((m) => m?.asset);
  const isCarousel = media.length > 1;

  let swiperEl;
  let swiper;
  let index = $state(0);

  onMount(() => {
    if (!isCarousel) return;

    swiper = new Swiper(swiperEl, {
      loop: true,
      roundLengths: true,
      on: {
        slideChange: (s) => {
          index = s.realIndex;
        },
      },
    });

    return () => swiper?.destroy(true, true);
  });

  function prev() {
    swiper?.slidePrev();
  }

  function next() {
    swiper?.slideNext();
  }

  function expand() {
    openLightboxUrl(workId, index);
  }
</script>

<div class="featured-item relative z-1 py-20 flex justify-center items-center">
  <div class="w-[55%]">
    {#if media.length}
      <div class="w-full space-y-3">
        <div class="aspect-4/5 relative bg-grey-1">
          <div bind:this={swiperEl} class="swiper h-full">
            <div class="swiper-wrapper">
              {#each media as m, i (i)}
                <div class="swiper-slide">
                  <Image item={m} fetchWidth={2500} classes="w-full h-full object-cover" />
                </div>
              {/each}
            </div>
          </div>

          <div class="controls absolute bottom-0 right-0 flex flex-col items-center">
            <button onclick={expand}>
              <span class="sr-only">Expand</span>
              <Plus />
            </button>

            {#if isCarousel}
              <button onclick={prev}>
                <span class="sr-only">Previous</span>
                <ArrowLeft />
              </button>

              <button onclick={next}>
                <span class="sr-only">Next</span>
                <ArrowRight />
              </button>
            {/if}
          </div>
        </div>

        <div class="text-sm flex justify-between items-start gap-40">
          {#if item.caption}
            <div class="text-left leading-[1.35]">{item.caption}</div>
          {/if}

          {#if isCarousel}
            <div class="flex-none">
              <span>{index + 1} of {media.length}</span>
            </div>
          {/if}
        </div>
      </div>
    {/if}
  </div>
</div>

<style>
  :global(.swiper),
  :global(.swiper-slide) {
    height: 100%;
  }

  /* Floor the carousel to a whole pixel so Swiper's integer-width slides match
     the container exactly — otherwise a fractional container width leaves a
     sub-pixel sliver of the neighbouring slide peeking at the edge. */
  :global(.swiper) {
    width: round(down, 100%, 1px);
  }

  .controls {
    transform: translateX(100%);

    button {
      width: 2.5rem;
      height: 2.5rem;
      background-color: var(--color-grey-2);
      display: flex;
      align-items: center;
      justify-content: center;

      :global(.plus-icon) {
        width: 1.4rem;
      }

      :global(.arrow-left-icon) {
        width: 1.3rem;
      }

      :global(.arrow-right-icon) {
        width: 1.3rem;
      }
    }
  }
</style>

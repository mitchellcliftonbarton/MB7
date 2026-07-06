<script>
  import Image from '$lib/components/Image.svelte';
  import ArrowRight from '$lib/components/ArrowRight.svelte';
  import ArrowLeft from '$lib/components/ArrowLeft.svelte';
  import X from '$lib/components/X.svelte';
  import { closeLightboxUrl, takeStartIndex } from '$lib/stores/lightbox.js';
  import { lockScroll, unlockScroll } from '$lib/utils/scrollLock.js';
  import { untrack } from 'svelte';
  import Swiper from 'swiper';
  import 'swiper/css';

  let { open = false, media = [], caption = '' } = $props();

  let swiperEl = $state();
  let swiper;
  let inited = $state(false);
  let currentIndex = $state(0);
  let startIndex = 0;

  // Keep rendering the current media AND caption through the close fade so the
  // panel doesn't reflow mid-transition — dropping the caption early would let the
  // flex-1 body grow and the image scale up ("zoom") before it fades out.
  // Initialised from props so SSR renders the slides.
  let displayMedia = $state(media);
  let displayCaption = $state(caption);
  let clearTimer;

  $effect(() => {
    if (open) {
      clearTimeout(clearTimer);
      displayMedia = media;
      displayCaption = caption;
    } else if (displayMedia.length) {
      clearTimer = setTimeout(() => {
        displayMedia = [];
        displayCaption = '';
      }, 400);
    }
  });

  // Capture the intended start slide exactly once, on the open edge — the inline
  // carousel handed it over in-memory. Reading it in the Swiper build instead
  // would consume it again on every rebuild and reset to 0.
  let prevOpen = false;
  $effect(() => {
    if (open && !prevOpen) startIndex = takeStartIndex();
    prevOpen = open;
  });

  const isCarousel = $derived(displayMedia.length > 1);

  // Body scroll lock while open.
  $effect(() => {
    if (open) {
      lockScroll();
      return unlockScroll;
    }
  });

  // (Re)create Swiper for the current item's slides. Keyed on displayMedia (which
  // is held through the close fade) so the image fades out with the overlay
  // rather than vanishing the instant it closes.
  $effect(() => {
    if (!swiperEl || displayMedia.length === 0) return;
    displayMedia; // rebuild when switching items

    inited = false;
    const start = untrack(() => Math.min(Math.max(startIndex, 0), displayMedia.length - 1));
    swiper = new Swiper(swiperEl, {
      initialSlide: start,
      loop: displayMedia.length > 1,
      roundLengths: true,
      on: {
        afterInit: (s) => {
          currentIndex = s.realIndex;
          inited = true;
        },
        slideChange: (s) => {
          currentIndex = s.realIndex;
        },
      },
    });

    return () => {
      swiper?.destroy(true, true);
      swiper = undefined;
      inited = false;
    };
  });

  function prev() {
    swiper?.slidePrev();
  }

  function next() {
    swiper?.slideNext();
  }

  function close() {
    closeLightboxUrl();
  }

  function handleKey(e) {
    if (!open) return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowLeft') prev();
    else if (e.key === 'ArrowRight') next();
  }
</script>

<svelte:window on:keydown={handleKey} />

<div class="lightbox" class:open class:inited aria-hidden={!open}>
  <div class="lightbox-header">
    {#if isCarousel}
      <p class="indexes">{currentIndex + 1} of {displayMedia.length}</p>
    {/if}

    <div class="header-close">
      <button class="ctrl" onclick={close}>
        <span class="sr-only">Close</span>
        <X />
      </button>
    </div>
  </div>

  <div class="lightbox-body">
    {#if isCarousel}
      <button class="side-arrow prev ctrl" onclick={prev}>
        <span class="sr-only">Previous</span>
        <ArrowLeft />
      </button>
      <button class="side-arrow next ctrl" onclick={next}>
        <span class="sr-only">Next</span>
        <ArrowRight />
      </button>
    {/if}

    <div class="swiper" bind:this={swiperEl}>
      <div class="swiper-wrapper">
        {#each displayMedia as m, i (i)}
          <div class="swiper-slide">
            <Image item={m} fetchWidth={2500} classes="lightbox-image" />
          </div>
        {/each}
      </div>
    </div>
  </div>

  {#if displayCaption}
    <div class="lightbox-caption">{displayCaption}</div>
  {/if}

  <div class="lightbox-grid lightbox-grid-desktop" aria-hidden="true">
    {#each Array(13) as _}
      <div></div>
    {/each}
  </div>

  <div class="lightbox-grid lightbox-grid-mobile" aria-hidden="true">
    {#each Array(5) as _}
      <div></div>
    {/each}
  </div>
</div>

<style>
  .lightbox {
    position: fixed;
    inset: 0;
    z-index: 7000;
    background: var(--color-white);
    display: flex;
    flex-direction: column;
    padding: var(--spacing-base);
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s;

    &::before {
      content: '';
      position: absolute;
      top: 0px;
      left: 0px;
      width: 100%;
      height: var(--spacing-base);
      background-color: var(--color-grid-bg);
    }

    &::after {
      content: '';
      position: absolute;
      bottom: 0px;
      left: 0px;
      width: 100%;
      height: var(--spacing-base);
      background-color: var(--color-grid-bg);
    }
  }

  :global(body.hide-grid) .lightbox {
    &::before,
    &::after {
      background-color: transparent;
    }
  }

  .lightbox.open {
    opacity: 1;
    pointer-events: auto;
  }

  /* Slides, counter and caption fade in once Swiper has initialised, so nothing
     jumps before layout settles (the white background is up from first paint). */
  .lightbox-body,
  .indexes,
  .lightbox-caption {
    opacity: 0;
    transition: opacity 0.3s;
  }

  .lightbox.inited .lightbox-body,
  .lightbox.inited .indexes,
  .lightbox.inited .lightbox-caption {
    opacity: 1;
  }

  .lightbox-header {
    flex: none;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    min-height: 2.5rem;
  }

  .indexes {
    text-align: center;
    font-size: var(--text-sm);
  }

  .header-close {
    display: flex;
    position: absolute;
    right: 0;
    top: 0;
  }

  .lightbox-body {
    flex: 1;
    min-height: 0;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--spacing-base) 0;
    /* Full-bleed horizontally: cancel the lightbox's side padding so the slides
       reach the window edges, while the header and caption keep their inset. */
    margin-left: calc(-1 * var(--spacing-base));
    margin-right: calc(-1 * var(--spacing-base));
  }

  .ctrl.side-arrow {
    display: none;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 10;
  }

  /* Keep the arrows at their original inset even though the body is now full-bleed. */
  .side-arrow.prev {
    left: var(--spacing-base);
  }

  .side-arrow.next {
    right: var(--spacing-base);
  }

  .lightbox-caption {
    flex: none;
    text-align: center;
    font-size: var(--text-sm);
    line-height: 1.35;
  }

  /* Shared control-button style, matching the inline FeaturedItem controls. */
  .ctrl {
    width: 2.5rem;
    height: 2.5rem;
    background-color: var(--color-grey-2);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .ctrl :global(.arrow-left-icon),
  .ctrl :global(.arrow-right-icon) {
    width: 1.3rem;
  }

  .ctrl :global(.x-icon) {
    width: 1.4rem;
  }

  .lightbox-body :global(.swiper) {
    /* Floor to a whole pixel so integer-width slides match the container and no
       sliver of the neighbouring slide peeks (same fix as the inline carousel). */
    width: round(down, 100%, 1px);
    height: 100%;
  }

  .lightbox-body :global(.swiper-slide) {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 var(--spacing-sm);

    @media (min-width: 1024px) {
      padding: 0;
    }
  }

  .lightbox-body :global(.lightbox-image) {
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }

  .lightbox-grid {
    position: absolute;
    inset: 0;
    z-index: -1;
    display: flex;
    justify-content: space-between;
    pointer-events: none;
  }

  .lightbox-grid > div {
    width: var(--spacing-base);
    height: 100%;
    background-color: var(--color-grid-bg);

    :global(body.hide-grid) & {
      background-color: transparent;
    }
  }

  /* Match the site-wide bg-grid breakpoints (13 dividers / 12 cols desktop,
     5 dividers / 4 cols mobile — see routes/+layout.svelte). */
  .lightbox-grid-desktop {
    display: none;
  }

  /* Arrows are hidden on mobile (swipe handles navigation there) and flank
     the image on desktop. */
  @media screen and (min-width: 1024px) {
    .lightbox-grid-desktop {
      display: flex;
    }

    .lightbox-grid-mobile {
      display: none;
    }

    .ctrl.side-arrow {
      display: flex;
    }
  }
</style>

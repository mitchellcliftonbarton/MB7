<script>
  import { urlFor } from '$lib/sanity/client.js';
  import { format, parseISO } from 'date-fns';
  import { toPlainText } from '@portabletext/svelte';

  // props
  let { entries = [], visible = false, el = $bindable() } = $props();

  // category labels
  const catLabel = {
    'studio-log': 'Studio Log',
    'notes': 'Notes',
    'works': 'Works',
  };

  // function to get the plain text from the blocks, truncated to 80 characters
  function plainText(blocks) {
    if (!blocks?.length) return null;
    const text = toPlainText(blocks);
    return text.length > 80 ? text.slice(0, 80) + '…' : text || null;
  }

  // function to get the thumbnail url
  function thumbUrl(entry) {
    const img = entry.media?.find(m => m.asset);
    if (!img) return null;
    return urlFor(img.asset).width(80).url();
  }
</script>

<div class="tooltip" class:visible role="tooltip" bind:this={el}>
  <div class="h-base grid-item"></div>
  <p class="px-base text-green">{format(parseISO(entries[0].date), 'MMMM d, yyyy')}</p>

  {#each entries as entry}
    {@const thumb = thumbUrl(entry)}
    <div class="h-base grid-item"></div>

    <div class="tooltip-entry">
      <div class="tooltip-content">
        <div class="tooltip-meta">
          <span class="cat-dot {entry.category ?? 'studio-log'}"></span>
          <span class="cat-name">{catLabel[entry.category] ?? entry.category}</span>
        </div>
        {#if plainText(entry.text)}
          <p class="tooltip-text">{plainText(entry.text)}</p>
        {/if}
      </div>
      {#if thumb}
        <img src={thumb} alt="" class="tooltip-thumb" />
      {/if}
    </div>
  {/each}

  <div class="h-base grid-item"></div>
</div>

<style>
  .tooltip {
    position: absolute;
    bottom: calc(100% + 8px);
    left: 50%;
    transform: translateX(-50%);
    opacity: 0;
    pointer-events: none;
    z-index: 5000;
    width: 250px;
    background: var(--color-white);
    flex-direction: column;
    display: none;

    @media (min-width: 1024px) {
      display: flex;
    }

    &::before {
      content: '';
      height: 100%;
      width: var(--spacing-base);
      background: var(--color-grid-bg);
      position: absolute;
      top: 0;
      left: 0;
    }

    &::after {
      content: '';
      height: 100%;
      width: var(--spacing-base);
      background: var(--color-grid-bg);
      position: absolute;
      top: 0;
      right: 0;
    }

    &.visible {
      opacity: 1;
    }
  }

  :global(body.hide-grid) .tooltip {
    &::before,
    &::after {
      background-color: transparent;
    }
  }

  :global(body[data-difficulty="medium"]) .tooltip {
    &::before,
    &::after {
      background-color: var(--color-grey-1);
    }
  }

  .tooltip-entry {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 0 var(--spacing-base);
  }

  .tooltip-content {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
  }

  .tooltip-thumb {
    width: 50px;
    height: 50px;
    object-fit: contain;
    object-position: right center;
    flex-shrink: 0;
  }

  .tooltip-meta {
    display: flex;
    align-items: center;
    gap: 0.55rem;
  }

  .cat-dot {
    width: 0.7em;
    height: 0.7em;
    border-radius: 50%;
    flex-shrink: 0;
    transform: translateY(0.05em);
    background: var(--color-yellow);

    &.notes { background: var(--color-green-alt); }
    &.works { background: var(--color-red); }
  }
</style>

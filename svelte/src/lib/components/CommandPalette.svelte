<script>
  import { commandPaletteOpen } from '$lib/stores/commandPalette.js';
  import { format, parseISO } from 'date-fns';

  let { entries = [] } = $props();

  let query = $state('');
  let inputEl;

  const categoryLabels = {
    'studio-log': 'Studio Log',
    'notes': 'Notes',
    'works': 'Works',
  };

  let results = $derived(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    const seen = new Set();
    return entries.filter(e => {
      if (seen.has(e.date)) return false;
      const textMatch = JSON.stringify(e.text || '').toLowerCase().includes(q);
      const dateMatch = e.date.includes(q);
      const catMatch = (categoryLabels[e.category] || '').toLowerCase().includes(q);
      if (textMatch || dateMatch || catMatch) {
        seen.add(e.date);
        return true;
      }
      return false;
    }).slice(0, 20);
  });

  function close() {
    commandPaletteOpen.set(false);
    query = '';
  }

  function handleBackdropKey(e) {
    if (e.key === 'Enter' || e.key === ' ') close();
  }

  $effect(() => {
    if ($commandPaletteOpen && inputEl) {
      setTimeout(() => inputEl?.focus(), 50);
    } else {
      query = '';
    }
  });

  function handleGlobalKey(e) {
    if (e.key === 'Escape' && $commandPaletteOpen) {
      close();
    }
  }
</script>

<svelte:window on:keydown={handleGlobalKey} />

{#if $commandPaletteOpen}
  <div class="palette-root">
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div
      class="closer"
      onclick={close}
      onkeydown={handleBackdropKey}
      role="button"
      tabindex="-1"
      aria-label="Close command palette"
    ></div>

    <div class="palette-panel">
      <div class="panel-header">
        <div class="h-base grid-item"></div>

        <div class="px-base grid grid-cols-3 gap-base">
          <div class="col-span-3">
            <input
              bind:this={inputEl}
              bind:value={query}
              type="text"
              placeholder="Search calendar entries..."
              class="search-input w-full"
            />
          </div>
        </div>

        <div class="h-base grid-item"></div>
      </div>

      <div class="panel-body px-base">
        {#if query.trim() === ''}
          <div class="empty-state">
            <p class="opacity-50">Type to search calendar entries</p>
          </div>
        {:else if results().length === 0}
          <div class="empty-state">
            <p class="opacity-50">No results for "{query}"</p>
          </div>
        {:else}
          <ul class="results-list">
            {#each results() as entry}
              <li>
                <a
                  href="/calendar/{entry.date}"
                  class="result-item"
                  onclick={close}
                >
                  <span class="result-date text-blue">{format(parseISO(entry.date), 'MMMM d, yyyy')}</span>
                  {#if entry.category}
                    <span class="result-category {entry.category}">{categoryLabels[entry.category]}</span>
                  {/if}
                </a>
              </li>
            {/each}
          </ul>
        {/if}
      </div>

      <div class="detail-panel-grid">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  </div>
{/if}

<style lang="postcss">
  .palette-root {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 6000;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .closer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.35);
    cursor: default;
  }

  .palette-panel {
    width: calc(50% + var(--spacing-base));
    height: 100%;
    background: white;
    z-index: 100;
    overflow-y: auto;
    scrollbar-width: none;
    position: relative;
    transform: translate(0px, 0px);
  }

  .panel-header {
    position: sticky;
    top: 0;
    background: white;
    z-index: 10;
  }

  .search-input {
    background: transparent;
    border: none;
    border-bottom: 1px solid var(--color-black);
    padding: 0;
    padding-bottom: 0.2em;
    outline: none;
    font-size: inherit;
    font-family: inherit;
    line-height: inherit;

    &::placeholder {
      color: var(--color-black);
      opacity: 0.4;
    }

    &::selection {
      background-color: var(--color-black);
      color: var(--color-white);
    }
  }

  .empty-state {
    padding-top: 1em;
  }

  .results-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: var(--spacing-base);
  }

  .result-item {
    display: flex;
    align-items: baseline;
    gap: 1em;
    padding-bottom: var(--spacing-base);
    border-bottom: 1px solid var(--color-grid-bg);
    text-decoration: none;

    &:hover .result-date {
      text-decoration: underline;
    }
  }

  .result-category {
    font-size: 0.85em;
    opacity: 0.6;
  }

  .detail-panel-grid {
    position: fixed;
    inset: 0;
    display: flex;
    justify-content: space-between;
    pointer-events: none;

    & > div {
      width: var(--spacing-base);
      height: 100%;
      background-color: var(--color-grid-bg);
    }
  }
</style>

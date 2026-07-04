<script>
  import { commandPaletteOpen } from '$lib/stores/commandPalette.js';
  import { afterNavigate } from '$app/navigation';
  import SearchIcon from '$lib/components/SearchIcon.svelte';
  import CalendarListItemSmall from '$lib/components/CalendarListItemSmall.svelte';
  import { lockScroll, unlockScroll } from '$lib/utils/scrollLock.js';
  import { siteSettings } from '$lib/stores/siteSettings.js';

  let { entries = [] } = $props();

  let query = $state('');
  let inputEl;

  const MAX_RESULTS = 20;

  const difficultyOptions = [
    { value: 'easy', label: 'Easy' },
    { value: 'medium', label: 'Medium' },
    { value: 'hard', label: 'Hard' },
    { value: 'expert', label: 'Expert' },
  ];

  function toggleSetting(key) {
    siteSettings.update(s => ({ ...s, [key]: !s[key] }));
  }

  function setDifficulty(value) {
    siteSettings.update(s => ({ ...s, difficulty: value }));
  }

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
    }).slice(0, MAX_RESULTS);
  });

  function close() {
    commandPaletteOpen.set(false);
    query = '';
  }

  // Keep the palette covering the calendar until navigation (incl. the detail
  // page's data load) fully completes, then close it — otherwise the palette
  // closes instantly on click and the bare calendar flashes before the detail
  // panel finishes loading.
  afterNavigate(() => {
    if ($commandPaletteOpen) close();
  });

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

  // lock background scroll while the palette is open
  $effect(() => {
    if ($commandPaletteOpen) {
      lockScroll();
      return unlockScroll;
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
      <div class="palette-scroll">
      <div class="panel-header">
        <div class="h-base grid-item"></div>

        <div class="px-base grid grid-cols-3 gap-base">
          <div class="search-input-container col-span-3 bg-green-alt">
            <SearchIcon />

            <input
              bind:this={inputEl}
              bind:value={query}
              type="text"
              placeholder="Search for artworks, log entries, notes, etc....."
              class="search-input w-full"
            />
          </div>
        </div>

        <div class="h-base grid-item"></div>
      </div>

      <div class="panel-body px-base">
        {#if query.trim() === ''}
          <!-- <div class="grid grid-cols-5 gap-x-base">
            <div class="col-span-1">
              <p class="text-blue">Controls</p>
            </div>

            <div class="col-span-1">
              <p>Global:</p>
              <div class="flex flex-col items-start gap-1">
                <button type="button" class="check-link {$siteSettings.hideGrid ? 'active' : ''}" onclick={() => toggleSetting('hideGrid')}>Hide Grid</button>
                <button type="button" class="check-link {$siteSettings.hideCurrentDate ? 'active' : ''}" onclick={() => toggleSetting('hideCurrentDate')}>Hide Current Date</button>
              </div>
            </div>

            <div class="col-span-1">
              <p>Difficulty:</p>
              <div class="flex flex-col items-start gap-1">
                {#each difficultyOptions as opt}
                  <button type="button" class="radio-link {$siteSettings.difficulty === opt.value ? 'active' : ''}" onclick={() => setDifficulty(opt.value)}>{opt.label}</button>
                {/each}
              </div>
            </div>

            <div class="col-span-2">
              <p>Other:</p>
              <div class="flex flex-col items-start gap-1">
                <button type="button" class="check-link {$siteSettings.hideAnnouncements ? 'active' : ''}" onclick={() => toggleSetting('hideAnnouncements')}>Hide Announcements</button>
              </div>
            </div>

            <div class="h-base grid-item col-span-5"></div>
          </div> -->
        {:else if results().length === 0}
          <div>
            <p>No results for "{query}"</p>
          </div>
        {:else}
          <ul class="results-list">
            {#each results() as entry, i (entry._id)}
              <li>
                <CalendarListItemSmall {entry} truncate imageWidth={600} />
              </li>
              {#if (i + 1) % 5 === 0}
                <li class="h-base grid-item col-span-5"></li>
              {/if}
            {/each}
            {#if results().length % 5 !== 0}
              <li class="h-base grid-item col-span-5"></li>
            {/if}
          </ul>
        {/if}
      </div>
      </div>

      <div class="detail-panel-grid">
        <div class="grid-item"></div>
        <div class="grid-item"></div>
        <div class="grid-item"></div>
        <div class="grid-item"></div>
        <div class="grid-item"></div>
        <div class="grid-item"></div>
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
    cursor: pointer;
  }

  .palette-panel {
    width: calc(50% + var(--spacing-base));
    height: 75svh;
    background: white;
    z-index: 100;
    overflow: hidden; /* clip; the inner element does the scrolling */
    position: relative; /* containing block for the absolute grid overlay */
    transform: translate(0px, 0px);
    border-radius: 2rem;
  }

  .palette-scroll {
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    scrollbar-width: none;
  }

  .panel-header {
    position: sticky;
    top: 0;
    z-index: 10;
  }

  .search-input-container {
    display: flex;
    align-items: center;
    gap: 1rem;

    :global(.search-icon) {
      width: 1.5rem;
    }

    .search-input {
      outline: none;
      line-height: 1.2;
      padding-bottom: 0.1em;

      &::placeholder {
        color: var(--color-black);
      }

      &::selection {
        background-color: var(--color-black);
        color: var(--color-white);
      }
    }
  }

  .results-list {
    list-style: none;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: var(--spacing-base);
  }

  .detail-panel-grid {
    position: absolute;
    inset: 0;
    z-index: 1; /* sits over the scrolling content */
    display: flex;
    justify-content: space-between;
    pointer-events: none;

    & > div {
      width: var(--spacing-base);
      height: 100%;
    }
  }
</style>

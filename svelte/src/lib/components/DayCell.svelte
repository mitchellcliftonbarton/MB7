<script>
  import DayTooltip from './DayTooltip.svelte';

  // props
  let { day, entries = [], isToday = false, isFuture = false, href } = $props();

  // state
  let hovered = $state(false);
  let cellEl = $state(null);
  let tooltipEl = $state(null);

  // category colors
  const catColor = {
    'studio-log': 'var(--color-yellow)',
    'notes': 'var(--color-green-alt)',
    'works': 'var(--color-red)',
  };

  // unique categories
  let cats = $derived([...new Set(entries.map(e => e.category ?? 'studio-log'))]);

  // circle bg style
  let circleStyle = $derived(() => {
    if (!cats.length || isToday) return undefined;
    if (cats.length === 1) return `background:${catColor[cats[0]] ?? 'var(--color-yellow)'}`;
    const pct = 100 / cats.length;
    const stops = cats.map((cat, i) => {
      const color = catColor[cat] ?? 'var(--color-yellow)';
      const a = +(i * pct).toFixed(3);
      const b = +((i + 1) * pct).toFixed(3);
      return i === 0 ? `${color} ${b}%` : `${color} ${a}% ${b}%`;
    }).join(',');
    return `background:conic-gradient(${stops})`;
  });

  // function to position the tooltip
  function positionTooltip() {
    if (!tooltipEl || !cellEl) return;

    // get the gap between the tooltip and the day cell
    const gap = 8;
    const rect = cellEl.getBoundingClientRect();
    const tw = tooltipEl.offsetWidth || 250;
    const th = tooltipEl.offsetHeight || 100;
    const vw = window.innerWidth;

    // vertical: above by default, below if sticky bar or viewport would clip it
    const stickyBar = document.querySelector('.page-header');
    const stickyBottom = stickyBar ? stickyBar.getBoundingClientRect().bottom : 0;
    if (rect.top - th - gap < stickyBottom) {
      tooltipEl.style.bottom = 'auto';
      tooltipEl.style.top = `calc(100% + ${gap}px)`;
    } else {
      tooltipEl.style.top = 'auto';
      tooltipEl.style.bottom = `calc(100% + ${gap}px)`;
    }

    // horizontal: centered by default, pin to edge if overflow
    const centerX = rect.left + rect.width / 2;
    if (centerX - tw / 2 < gap) {
      tooltipEl.style.left = '0';
      tooltipEl.style.right = 'auto';
      tooltipEl.style.transform = 'none';
    } else if (centerX + tw / 2 > vw - gap) {
      tooltipEl.style.right = '0';
      tooltipEl.style.left = 'auto';
      tooltipEl.style.transform = 'none';
    } else {
      tooltipEl.style.left = '50%';
      tooltipEl.style.right = 'auto';
      tooltipEl.style.transform = 'translateX(-50%)';
    }
  }

  // function to handle the mouse enter event
  function onEnter() {
    hovered = true;
    positionTooltip();
  }
</script>

<div
  class="day-cell"
  class:has-entries={entries.length > 0}
  class:is-future={isFuture}
  role="presentation"
  bind:this={cellEl}
  onmouseenter={onEnter}
  onmouseleave={() => hovered = false}
>
  <div class="day" class:current={isToday}>
    {#if entries.length > 0}
      <a {href} class="day-num" style={circleStyle()} data-sveltekit-noscroll>{day}</a>
      <DayTooltip {entries} visible={hovered} bind:el={tooltipEl} />
    {:else}
      <span class="day-num">{day}</span>
    {/if}
  </div>
</div>

<style>
  .day-cell {
    position: relative;
    display: flex;
    justify-content: center;
  }

  .day-num {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .day-cell.is-future {
    opacity: 0.2;
  }

  .day.current .day-num {
    background-color: var(--color-green) !important;
    color: var(--color-white);
    border-radius: 0px;
    border: 2px solid var(--color-black);
  }
</style>

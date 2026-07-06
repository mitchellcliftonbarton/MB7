<script>
  import DayCell from './DayCell.svelte';

  // month names
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];

  // props
  let { year, month, entries = [], view = 'month' } = $props();

  // days in month
  let daysInMonth = $derived(new Date(year, month + 1, 0).getDate());

  // offset
  let offset = $derived(new Date(year, month, 1).getDay()); // 0=Sun … 6=Sat

  // active days — Map<dayNumber, entry[]>
  let activeDays = $derived(
    entries.reduce((map, e) => {
      // parse the date string into year, month, and day
      const [y, m, d] = e.date.split('-').map(Number);

      // if the year and month match, add the entry to the map
      if (y === year && m - 1 === month) {
        if (!map.has(d)) map.set(d, []);
        map.get(d).push(e);
      }

      // return the map
      return map;
    }, new Map())
  );

  // today
  const now = new Date();
  const todayYear = now.getFullYear();
  const todayMonth = now.getMonth();
  const todayDay = now.getDate();

  // the current month is never marked empty, even with no entries yet
  let isCurrentMonth = $derived(year === todayYear && month === todayMonth);

  // format the date string as YYYY-MM-DD. Only using date-fns for display formatting
  function dateStr(day) {
    const m = String(month + 1).padStart(2, '0');
    const d = String(day).padStart(2, '0');
    return `${year}-${m}-${d}`;
  }
</script>

<div class="month-item border rounded-[4rem] px-8 py-8 lg:py-12 space-y-8 z-1" class:is-empty={activeDays.size === 0 && !isCurrentMonth}>
  <p class="text-center text-red">{monthNames[month]} {year}</p>

  <div class="days grid grid-cols-7 gap-x-4 gap-y-4">
    <!-- empty cells to push day 1 into the correct weekday column -->
    {#each { length: offset } as _}
      <div></div>
    {/each}

    {#each { length: daysInMonth } as _, i}
      <DayCell
        day={i + 1}
        entries={activeDays.get(i + 1) ?? []}
        isToday={year === todayYear && month === todayMonth && i + 1 === todayDay}
        isFuture={year > todayYear || (year === todayYear && month > todayMonth) || (year === todayYear && month === todayMonth && i + 1 > todayDay)}
        href="/calendar/{dateStr(i + 1)}{view === 'list' ? '?view=list' : ''}"
      />
    {/each}
  </div>
</div>

<style>
  .month-item {
    background-color: var(--color-grey-1);
    border: 1px solid var(--color-grey-2);

    /* lift the hovered month above its siblings so its tooltip (trapped in
       this stacking context by the base z-1) isn't painted over by a
       neighboring month card */
    &:has(:global(.day-cell:hover)) {
      z-index: 2;
    }

    &.is-empty {
      background-color: var(--color-white);
      border-color: var(--color-grey-1);

      :global(.day-cell) {
        opacity: 0.2;
      }
    } 
  }
</style>

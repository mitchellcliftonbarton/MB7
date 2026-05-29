<script>
  import DayCell from './DayCell.svelte';

  // month names
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];

  // props
  let { year, month, entries = [] } = $props();

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

  // format the date string as YYYY-MM-DD. Only using date-fns for display formatting
  function dateStr(day) {
    const m = String(month + 1).padStart(2, '0');
    const d = String(day).padStart(2, '0');
    return `${year}-${m}-${d}`;
  }
</script>

<div class="bg-grey-1 border border-grey-2 rounded-[4rem] px-8 pt-12 pb-18 space-y-8">
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
        href="/calendar/{dateStr(i + 1)}"
      />
    {/each}
  </div>
</div>

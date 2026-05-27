<script>
  // month names
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];

  // props
  let { year, month, entries = [] } = $props();

  // days in month
  let daysInMonth = $derived(new Date(year, month + 1, 0).getDate());

  // offset
  let offset = $derived(new Date(year, month, 1).getDay()); // 0=Sun … 6=Sat

  // active days — Map<dayNumber, Set<string>> (unique categories per day)
  let activeDays = $derived(
    entries.reduce((map, e) => {
      const [y, m, d] = e.date.split('-').map(Number);
      if (y === year && m - 1 === month) {
        if (!map.has(d)) map.set(d, new Set());
        map.get(d).add(e.category ?? 'studio-log');
      }
      return map;
    }, new Map())
  );

  // today
  const now = new Date();
  const todayYear = now.getFullYear();
  const todayMonth = now.getMonth();
  const todayDay = now.getDate();

  const catColor = {
    'studio-log': 'var(--color-yellow)',
    'notes': 'var(--color-green-alt)',
    'works': 'var(--color-red)',
  };

  function dayStyle(cats) {
    const arr = [...cats];
    if (arr.length === 1) {
      return `background:${catColor[arr[0]] ?? 'var(--color-yellow)'}`;
    }
    const pct = 100 / arr.length;
    const stops = arr.map((cat, i) => {
      const color = catColor[cat] ?? 'var(--color-yellow)';
      const a = +(i * pct).toFixed(3);
      const b = +((i + 1) * pct).toFixed(3);
      return i === 0 ? `${color} ${b}%` : `${color} ${a}% ${b}%`;
    }).join(',');
    return `background:conic-gradient(${stops})`;
  }
</script>

<div class="bg-grey-1 border border-grey-2 rounded-[4rem] px-8 pt-12 pb-18 space-y-8">
  <p class="text-center text-red">{monthNames[month]} {year}</p>

  <div class="days grid grid-cols-7 gap-x-4 gap-y-4">
    {#each { length: offset } as _}
      <div></div>
    {/each}
    {#each { length: daysInMonth } as _, i}
      {@const cats = activeDays.get(i + 1)}
      {@const catArr = cats ? [...cats] : []}
      {@const isToday = year === todayYear && month === todayMonth && i + 1 === todayDay}
      <div class="day-cell">
        <div class="day" class:current={isToday}>
          <p style={catArr.length && !isToday ? dayStyle(cats) : undefined}>{i + 1}</p>
        </div>
      </div>
    {/each}
  </div>
</div>

<style>
  .days {
    & > .day-cell {
      display: flex;
      justify-content: center;
    }
  }

  .day {
    & > p {
      width: 35px;
      height: 35px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    &.current > p {
      background-color: var(--color-green);
      color: var(--color-white);
      border-radius: 0px;
      border: 2px solid white;
    }
  }
</style>

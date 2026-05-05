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

  // active days
  let activeDays = $derived(new Set(
    entries.flatMap(e => {
      const [y, m, d] = e.date.split('-').map(Number);
      return (y === year && m - 1 === month) ? [d] : [];
    })
  ));

  // today
  const now = new Date();
  const todayYear = now.getFullYear();
  const todayMonth = now.getMonth();
  const todayDay = now.getDate();
</script>

<div class="bg-grey-1 border border-grey-2 rounded-[4rem] px-8 pt-12 pb-18 space-y-8">
  <p class="text-center text-red">{monthNames[month]} {year}</p>

  <div class="days grid grid-cols-7 gap-x-4 gap-y-4">
    {#each { length: offset } as _}
      <div></div>
    {/each}
    {#each { length: daysInMonth } as _, i}
      <div class={[activeDays.has(i + 1) && 'active', year === todayYear && month === todayMonth && i + 1 === todayDay && 'current'].filter(Boolean).join(' ')}>
        <p>{i + 1}</p>
      </div>
    {/each}
  </div>
</div>

<style>
  .days {
    & > div {
      display: flex;
      justify-content: center;

      & > p {
        width: 35px;
        height: 35px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      &.active {
        & > p {
          background-color: var(--color-yellow);
        }
      }

      &.current {
        & > p {
          background-color: var(--color-green);
          color: var(--color-white);
          border-radius: 0px;
        }
      }
    }
  }
</style>

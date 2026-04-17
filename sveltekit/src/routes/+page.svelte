<script>
  // get view from query params
  let view = $state(new URLSearchParams(window.location.search).get('view') || 'month');
</script>

<section>
  <div class="grid grid-cols-12 gap-base px-base">
    <div class="col-span-2 col-start-2">
      <p>Featured work:</p>
    </div>

    <div class="lately col-span-5 col-start-8 flex items-center gap-4">
      <p>Lately:</p>
      
      <div class="flex gap-6">
        <a href="/" class={view === 'month' ? 'active' : ''}>Month View</a>
        <a href="/?view=list" class={view === 'list' ? 'active' : ''}>List View</a>
      </div>
    </div>
  </div>

  <div class="h-base grid-item"></div>
</section>

<section class="main-content relative">
  <div class="grid grid-cols-12 gap-base px-base">
    <div class="featured relative col-span-8">
      <div class="relative z-1 py-20 flex justify-center items-center">
        <figure class="aspect-[4/5] w-[45%] bg-grey-1"></figure>
      </div>

      <div class="h-base grid-item"></div>

      <div class="relative z-1 py-20 flex justify-center items-center">
        <figure class="aspect-[4/5] w-[45%] bg-grey-1"></figure>
      </div>

      <div class="h-base grid-item"></div>
    </div>

    <div class="col-span-4 flex flex-col justify-end">
      <div class="calendar-inner">
        <div class="flex flex-col items-center gap-20 pb-28">
          <p>March 12, 2026</p>

          <figure class="aspect-[4/5] w-[60%] bg-grey-1 relative z-1"></figure>
        </div>

        <div class="h-base grid-item"></div>

        <div class="flex flex-col items-center gap-20 pb-28">
          <p>March 10, 2026</p>

          <figure class="aspect-[4/5] w-[60%] bg-grey-1 relative z-1"></figure>
        </div>

        <div class="h-base grid-item"></div>

        <a href="/calendar" class="text-center block bg-yellow relative z-1">View Full Calendar</a>

        <div class="h-base grid-item"></div>
      </div>
    </div>
  </div>
</section>

<style>
  .calendar-inner {
    position: sticky;
    bottom: 0;
  }

  .main-content {
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: var(--spacing-base);
      height: 100%;
      background-color: var(--color-grid-bg-alt);
    }

    &::after {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      width: var(--spacing-base);
      height: 100%;
      background-color: var(--color-grid-bg-alt);
    }

    .featured {
      &::after {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        width: var(--spacing-base);
        height: 100%;
        background-color: var(--color-grid-bg-alt);
        transform: translateX(100%);
      }
    }
  }

  .lately {
    a {
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: .7rem;

      &::before {
        content: '';
        display: block;
        width: .7em;
        height: .7em;
        border: 2px solid var(--color-black);
        transform: translateY(0.08em);
      }

      &.active {
        &::before {
          background-color: var(--color-red);
        }
      }
    }
  }
</style>
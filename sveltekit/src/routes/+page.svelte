<section>
  <div class="grid grid-cols-12 gap-base px-base">
    <div class="col-span-2 col-start-2">
      <p>Featured work:</p>
    </div>

    <div class="col-span-5 col-start-8">
      <p>Lately: Month view / List view</p>
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

    <div class="col-span-4">
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
</style>
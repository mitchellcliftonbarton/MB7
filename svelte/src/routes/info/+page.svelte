<script>
  import { siteSettings } from '$lib/stores/siteSettings.js';
  import EmailSignup from '$lib/components/EmailSignup.svelte';

  function toggleSetting(key) {
    siteSettings.update(s => ({ ...s, [key]: !s[key] }));
  }
</script>

<svelte:head>
	<title>Mitchell Barton | Info</title>
</svelte:head>

<section class="main-content relative pt-[50px] lg:pt-[100px] flex-1 grid grid-cols-4 lg:grid-cols-12 gap-16 lg:gap-base px-base">
  <div class="col-span-4 lg:col-span-5">
    <div class="grid grid-cols-4 lg:grid-cols-5 gap-base">
      <div class="col-span-4 lg:col-start-2">
        <h2 class="text-blue">Information</h2>
      </div>
    </div>

    <div class="h-base grid-item"></div>

    <div class="grid grid-cols-4 lg:grid-cols-5 gap-base">
      <div class="col-span-4 lg:col-start-2">
        <a href="mailto:mitchellcliftonbarton@gmail.com" class="underline lg:hover:no-underline">mitchellcliftonbarton@gmail.com</a>
      </div>
    </div>

    <div class="h-base grid-item"></div>

    <div class="grid grid-cols-4 lg:grid-cols-5 gap-base mt-12 lg:mt-16">
      <div class="col-span-4 lg:col-start-2">
        <p>Mitchell Barton is an artist working in Salt Lake City, UT, USA.</p>
      </div>
    </div>

    <div class="h-base grid-item"></div>

    <div class="grid grid-cols-4 lg:grid-cols-5 gap-base">
      <div class="col-span-4 lg:col-start-2">
        <p>Recent(ish) projects include:</p>
      </div>
    </div>

    <div class="h-base grid-item"></div>

    <div class="grid grid-cols-4 lg:grid-cols-5 gap-base">
      <div class="col-span-4 lg:col-start-2">
        <ul class="list-disc list-inside leading-[1.3]">
          <li>
            “Razorbacks” — an exhibition at the Utah Museum of Contemporary Art
          </li>

          <li>
            “Three Basketball Games” — a book with photographs and text regarding three basketball games he watched from his living room.
          </li>

          <li>
            “<a href="https://artspeak-ipsum.com/" target="_blank" class="underline lg:hover:no-underline">Artspeak Ipsum</a>” — a lorem ipsum generator based on International Art English
          </li>
        </ul>
      </div>
    </div>

    <div class="h-base grid-item"></div>

    <div class="grid grid-cols-4 lg:grid-cols-5 gap-base">
      <div class="col-span-4 lg:col-start-2">
        <p>He also occasionally runs a little gallery space in his basement furnace room called <a href="https://www.washer-dryer-projects.com/" target="_blank" class="underline lg:hover:no-underline">Washer / Dryer Projects</a> that is hardly ever open to the public.</p>
      </div>
    </div>

    <div class="h-base grid-item"></div>

    <div class="grid grid-cols-4 lg:grid-cols-5 gap-base">
      <div class="col-span-4 lg:col-start-2">
        <p>Apart from making art, he makes websites at <a href="https://cold-rice.info" target="_blank" class="underline lg:hover:no-underline">Cold Rice LLC</a>.</p>
      </div>
    </div>

    <div class="h-base grid-item"></div>

    <div class="grid grid-cols-4 lg:grid-cols-5 gap-base mt-16">
      <div class="col-span-4 lg:col-start-2">
        <p class="text-blue">Links:</p>
      </div>
    </div>

    <div class="h-base grid-item"></div>

    <div class="grid grid-cols-4 lg:grid-cols-5 gap-base">
      <div class="col-span-4 lg:col-start-2">
        <ul class="list-disc list-inside leading-[1.3]">
          <li>
            <a href="https://www.instagram.com/mitchellcliftonbarton/" target="_blank" class="underline lg:hover:no-underline">Instagram</a>
          </li>

          <li>
            <a href="https://cold-rice.info" target="_blank" class="underline lg:hover:no-underline">Cold Rice LLC</a>
          </li>

          <li>
            <a href="https://www.washer-dryer-projects.com/" target="_blank" class="underline lg:hover:no-underline">Washer / Dryer Projects</a>
          </li>

          <li>
            <a href="https://artspeak-ipsum.com/" target="_blank" class="underline lg:hover:no-underline">Artspeak Ipsum</a>
          </li>
        </ul>
      </div>
    </div>

    <div class="h-base grid-item"></div>
  </div>

  <div class="col-span-4 lg:col-span-7">
    <div class="grid grid-cols-4 lg:grid-cols-7 gap-base">
      <div class="col-span-4 lg:col-span-5 lg:col-start-2">
        <h2 class="text-blue">Site Notes</h2>
      </div>
    </div>

    <div class="h-base grid-item"></div>

    <div class="grid grid-cols-4 lg:grid-cols-7 gap-base">
      <div class="col-span-4 lg:col-span-5 lg:col-start-2">
        <p>This site was launched on July 3, 2026, and uses Open Into Mono, a typeface made by <a href="https://furniture.xyz" target="_blank" class="underline lg:hover:no-underline">Furniture.</a></p>
      </div>
    </div>

    <div class="h-base grid-item"></div>

    <div class="grid grid-cols-4 lg:grid-cols-7 gap-base mt-16">
      <div class="col-span-4 lg:col-span-5 lg:col-start-2">
        <h2 class="text-blue">Site Structure</h2>
      </div>
    </div>

    <div class="h-base grid-item"></div>

    <div class="grid grid-cols-4 lg:grid-cols-7 gap-base">
      <div class="col-span-4 lg:col-span-5 lg:col-start-2">
        <p>This site is primarily used as a <a href="/calendar" class="underline lg:hover:no-underline">calendar</a>. This calendar archives notes, studio log entries, WIP pieces, and other miscellaneous information.</p>
      </div>
    </div>

    <div class="h-base grid-item"></div>

    <div class="grid grid-cols-4 lg:grid-cols-7 gap-base">
      <div class="col-span-4 lg:col-span-5 lg:col-start-2">
        <p>Some months contain more entries than others depending on how busy I was during that month.</p>
      </div>
    </div>

    <div class="h-base grid-item"></div>

    <div class="grid grid-cols-4 lg:grid-cols-7 gap-base">
      <div class="col-span-4 lg:col-span-5 lg:col-start-2">
        <p>A group of featured works can also be found on the <a href="/" class="underline lg:hover:no-underline">home page</a>.</p>
      </div>
    </div>

    <div class="h-base grid-item"></div>

    <div class="grid grid-cols-4 lg:grid-cols-7 gap-base">
      <div class="col-span-4 lg:col-span-5 lg:col-start-2">
        <p>Maybe eventually we'll add exhibitions, or a work archive.</p>
      </div>
    </div>

    <div class="h-base grid-item"></div>

    <div class="grid grid-cols-4 lg:grid-cols-7 gap-base mt-16">
      <div class="col-span-4 lg:col-span-5 lg:col-start-2">
        <h2 class="text-blue">Subscribe</h2>
      </div>
    </div>

    <div class="h-base grid-item"></div>

    <div class="grid grid-cols-4 lg:grid-cols-7 gap-base">
      <div class="col-span-4 lg:col-span-5 lg:col-start-2">
        <p>I periodically send out emails with calendar updates, new works, and other miscellaneous information. Sign up here:</p>
      </div>
    </div>

    <div class="h-base grid-item"></div>

    <div class="grid grid-cols-4 lg:grid-cols-7 gap-base">
      <div class="col-span-1 hidden lg:block"></div>
      <EmailSignup label="" />
    </div>

    <div class="h-base grid-item"></div>

    <div class="grid grid-cols-4 lg:grid-cols-7 gap-base mt-16">
      <div class="col-span-4 lg:col-span-5 lg:col-start-2">
        <h2 class="text-blue">Other</h2>
      </div>
    </div>

    <div class="h-base grid-item"></div>

    <div class="grid grid-cols-4 lg:grid-cols-7 gap-base">
      <div class="col-span-4 lg:col-span-5 lg:col-start-2">
        <p>This site utilizes a 12 column grid. If you'd like to disable the grid, toggle below. This will set your local storage and persist across sessions.</p>
        
        <p class="mt-base">
          <button type="button" class="check-link {$siteSettings.hideGrid ? 'active' : ''}" onclick={() => toggleSetting('hideGrid')}>Hide Grid</button>
        </p>
      </div>
    </div>

    <div class="h-base grid-item"></div>
  </div>
</section>

<style>
  .main-content {
    /* &::before {
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
    } */
  }
</style>
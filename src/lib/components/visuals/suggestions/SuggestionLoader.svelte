<script lang="ts">
  import { browser } from '$app/environment';
  import { page } from '$app/stores';
  import { scribblesEnabled } from './suggestionStore';

  $: svgFile = {
    '/': './svgs/index.svg',
    '/about': './svgs/about.svg',
    '/contact': './svgs/contact.svg',
    '/stuff': './svgs/stuff.svg',
    '/achievements': './svgs/achievements.svg'
  }[$page.url.pathname];

  function formattedSvg(str: string) {
    return str
      .replaceAll(/fill=\"#\w+\"/g, 'class="f"')
      .replaceAll(/stroke=\"#\w+\"/g, 'class="s"');
  }
</script>

{#if browser && svgFile && $scribblesEnabled}
  {#await fetch(svgFile).then((res) => (res.ok ? res.text() : null)) then elementAsText}
    {#if elementAsText && elementAsText.length}
      <div>
        {@html formattedSvg(elementAsText)}
      </div>
    {/if}
  {/await}
{/if}

<style>
  div {
    display: contents;
    pointer-events: none;
  }
  div > :global(svg) {
    animation: intro 0.3s ease backwards;

    position: absolute;
    left: 0;
    top: 0;

    width: 100%;
  }
  div > :global(svg .s) {
    stroke: var(---c-c1);
  }
  div > :global(svg .f) {
    fill: var(---c-c1);
  }

  @keyframes intro {
    from {
      opacity: 0;
      transform: translateX(-10px);
    }
  }

  @media (max-width: 700px) {
    div {
      display: none;
    }
  }
</style>

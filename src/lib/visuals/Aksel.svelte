<script>
  import { spring } from 'svelte/motion';
  import { onMount } from 'svelte';
  let show = false;
  let width = 128;
  let height = 128;
  let walking = false;
  let left = false;

  const birdx = spring(5, {
    stiffness: 3,
    damping: 3
  });

  onMount(() => {
    show = true;
  });
</script>

{#if show}
  <svg
    class:walking
    class:left
    xml:space="preserve"
    stroke-linecap="round"
    stroke-linejoin="round"
    stroke-miterlimit="1.5"
    viewBox="0 0 280 270"
    {width}
    {height}
    style:--x="{$birdx}px"
  >
    <g class="feet" fill="#ffda36" stroke="#737373" stroke-width="5">
      <path d="M125 270c-3 0-5-2-5-5v-45a5 5 0 0 1 10 0v30h20a10 10 0 0 1 0 20h-25 0Z" />
      <path d="M145 270c-3 0-5-2-5-5v-45a5 5 0 0 1 10 0v30h20a10 10 0 0 1 0 20h-25 0Z" />
    </g>
    <path
      class="stjert"
      fill="#f2f2f2"
      stroke="#737373"
      stroke-width="5"
      d="M20 135h140a70 70 0 0 1-140 0Z"
    />
    <path
      class="body"
      fill="#f2f2f2"
      stroke="#737373"
      stroke-width="5"
      d="M30 120h200a100 100 0 0 1-200 0Z"
    />
    <g class="head">
      <path
        fill="#ffda36"
        stroke="#737373"
        stroke-width="5"
        d="M230 70v20h30a10 10 0 0 0 0-20h-30Z"
      />
      <path
        fill="#f2f2f2"
        stroke="#737373"
        stroke-width="5"
        d="M130 120h100V70a50 50 0 0 0-100 0v50Z"
      />
      <path class="eye" fill="#737373" d="M200 85V65a5 5 0 0 1 10 0v20a5 5 0 0 1-10 0Z" />
    </g>
    <g class="smallwing">
      <path fill="#c3c3c3" stroke="#737373" stroke-width="5" d="M90 120h140a70 70 0 0 1-140 0Z" />
      <path
        fill="#f2f2f2"
        d="M185 130h20a5 5 0 0 1 0 10h-20a5 5 0 0 1 0-10ZM155 130h10a5 5 0 0 1 0 10h-10a5 5 0 0 1 0-10Z"
      />
    </g>
  </svg>
{/if}

<svelte:window
  on:click={(ev) => {
    birdx.set(ev.clientX - width / 2);
  }}
/>

<style>
  svg * {
    transform-box: fill-box;
  }
  svg {
    transform: translateX(var(--x));
    transition: transform 0.2s;
  }

  .left {
    transform: scaleX(-1);
  }

  .walking .smallwing {
    transform-origin: 100% 1%;
    animation: wiggleSmallwing 0.3s infinite;
  }
  .walking .stjert {
    transform-origin: 100% 1%;
    animation: wiggleStjert 0.3s infinite;
  }
  .walking .body {
    animation: wiggleBody 0.3s infinite;
  }
  .walking .head {
    animation: wiggleHead 0.3s infinite;
  }

  .walking .feet path:nth-child(1) {
    animation: walking1 0.3s infinite;
  }
  .walking .feet path:nth-child(2) {
    animation: walking2 0.3s infinite;
  }

  @keyframes walking1 {
    50% {
      transform: translate(15px, 0) rotate(-1deg);
    }
  }

  @keyframes walking2 {
    50% {
      transform: translate(-15px, 0) rotate(1deg);
    }
  }

  @keyframes wiggleSmallwing {
    50% {
      transform: rotate(2deg) translate(0, -2px);
    }
  }

  @keyframes wiggleStjert {
    50% {
      transform: translateX(4px);
    }
  }

  @keyframes wiggleBody {
    50% {
      transform: translateX(3px);
    }
  }

  @keyframes wiggleHead {
    50% {
      transform: translate(1px, 3px) rotate(-1deg);
    }
  }
</style>

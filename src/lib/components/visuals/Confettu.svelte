<script context="module">
  import { writable } from 'svelte/store';
  import { tick } from 'svelte';

  const confetting = writable(false);

  export async function confett() {
    confetting.set(false);
    await tick();
    confetting.set(true);
  }
</script>

<script>
  import { confetti } from '@neoconfetti/svelte';
</script>

{#if $confetting}
  <div use:confetti={{ stageHeight: window.innerHeight, stageWidth: window.innerWidth }} />
{/if}

<style>
  div {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
    display: flex;
    justify-content: center;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
    pointer-events: none;
  }
</style>

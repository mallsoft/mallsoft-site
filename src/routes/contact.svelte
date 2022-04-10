<script>
  import { me } from '$lib/content';
  import Pollock from '$lib/visualcandy/Pollock.svelte';
</script>

<a href="mailto:{me.email}?subject=Hello {me.name}!">Electronic mail</a>

<div aria-label="canvas background">
  <Pollock />
</div>

<style>
  div {
    position: fixed;
    z-index: -1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.5;
  }
</style>

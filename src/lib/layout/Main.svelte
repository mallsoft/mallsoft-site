<script>
  // import { page, navigating } from '$app/stores';
  // $: console.log($page, '-->', $navigating);
</script>

<main>
  <slot />
</main>

<style>
  main {
    position: relative;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
</style>

<script>
  import { navigating } from '$app/stores';
</script>

{#if $navigating}
  <div class="loader" aria-hidden="true" />
{/if}

<style>
  .loader {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 10%;
    height: 5px;
    background-color: var(---c-b2);
    z-index: 9999;

    animation: loader 1s linear infinite;

    opacity: 0.7;
  }

  @keyframes loader {
    100% {
      transform: translateX(100vw) scaleX(0.5);
    }
  }
</style>

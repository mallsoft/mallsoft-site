<script>
  export let element;
</script>

{#if element}
  <div on:click={() => (element = null)}>
    <h1>{element.title}</h1>
    <iframe src={element.href} frameborder="0" title={element.title} />
  </div>
{/if}

<style>
  div {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
    background-color: rgba(0, 0, 0, 0.7);
  }
  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transform: scale(0.65);
    padding: 20px;
    background-color: var(---c-a2);
  }
</style>

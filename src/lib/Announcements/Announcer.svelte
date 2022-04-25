<script>
  import { onMount } from 'svelte';
  import { messages } from './messages';
  import { flip } from 'svelte/animate';
  import { fade } from 'svelte/transition';

  onMount(() => {
    // let msgTimer = setInterval(() => {
    //   messages.clearOld();
    // }, 200);

    return () => clearInterval(msgTimer);
  });
</script>

<aside aria-live="polite" role="log">
  {#each $messages as msg, i (msg)}
    <article on:click={() => messages.remove(msg)} transition:fade animate:flip={{ duration: 300 }}>
      <h1>{msg.title}</h1>
      <p>{msg.description}</p>
    </article>
  {/each}
</aside>

<style>
  aside {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 100;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    font-size: 2rem;

    margin: 10px;

    color: var(---c-bg);
  }
  article {
    margin: 1rem;
    font-weight: bold;
    padding: 0.5em 1em;
    position: relative;

    max-width: var(---readwidth);
    width: 100%;
  }

  article::after {
    content: '';
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: var(---c-b2);
    transition: background-color 0.2s ease;
    box-shadow: 10px 10px 20px -5px rgba(0, 0, 0, 0.1), -10px -10px 20px -5px rgba(0, 0, 0, 0.1);
  }
  article:hover::after {
    background: var(---c-b1);
  }
  p {
    font-size: 0.8em;
  }
</style>

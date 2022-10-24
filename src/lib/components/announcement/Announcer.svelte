<script>
  import { onMount } from 'svelte';
  import { messages } from './messages';
  import { flip } from 'svelte/animate';
  import { fade } from 'svelte/transition';

  onMount(() => {
    let msgTimer = setInterval(() => {
      messages.clearOld();
    }, 200);

    return () => clearInterval(msgTimer);
  });
</script>

<aside aria-live="polite" role="log">
  {#each $messages as msg, i (msg)}
    <article on:click={() => messages.remove(msg)} transition:fade animate:flip={{ duration: 300 }}>
      {#if msg.icon}
        <div class="icon">
          {msg.icon}
        </div>
      {/if}
      <div class="content">
        <h1>{msg.title}</h1>
        <p>{msg.description}</p>
      </div>
    </article>
  {/each}
  <!-- <article>
    <div class="icon">🛒</div>
    <div class="content">
      <h1>title title title title</h1>
      <p>description description descriptiondes criptiondescr iptiondescription</p>
    </div>
  </article> -->
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

    font-size: min(2rem, 8vw);

    color: var(---c-bg);
  }
  article {
    display: grid;
    grid-template-columns: auto 1fr;
    max-width: var(---readwidth);

    font-weight: bold;
    padding: 0.8em 0.5em;
    position: relative;

    width: 100%;

    user-select: none;
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

  .icon {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: min(1.85em, 10vw);
    margin-right: 0.25em;
    line-height: 1.5;
  }

  @media (max-width: 600px) {
    article {
      grid-auto-flow: column;
      grid-template-rows: auto 1fr;
    }
    .icon {
      margin-bottom: 0.5em;
    }
  }
</style>

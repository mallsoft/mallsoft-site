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

  function closeMsg(msg) {
    messages.remove(msg);
  }
</script>

<aside aria-live="polite" role="log">
  {#each $messages as msg, i (msg)}
    <section
      on:click={() => closeMsg(msg)}
      on:keydown={() => closeMsg(msg)}
      transition:fade
      animate:flip={{ duration: 300 }}
    >
      <div class="icon">
        <span>{msg.icon?.length ? msg.icon : '📎'}</span>
      </div>
      <div class="content">
        <h1>
          {msg.title}
        </h1>
        <p>{msg.description}</p>
      </div>
    </section>
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

    pointer-events: none;
    user-select: none;

    gap: 0.5em;
    margin: 0.5em auto;
    max-width: var(---readwidth);
  }
  section {
    pointer-events: initial;
    position: relative;

    padding: 1em;
    width: 100%;

    display: flex;
    align-items: center;
    gap: 0.5em;

    color: var(---c-bg);
    background-color: var(---c-b1);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2), 0.8em 0.8em 0.7em rgba(0, 0, 0, 0.3);

    transition: background-color 0.4s;
  }
  section:is(:hover, :focus, :focus-within) {
    background-color: var(---c-b2);
    transition: background-color 0.1s;
  }

  h1 {
    font-weight: bold;
    font-size: 1.2em;
  }
  p {
    font-size: 0.8em;
  }

  .icon {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;

    width: 2.2em;
    height: 2.2em;

    border-radius: 999px;

    line-height: 0;

    color: var(---c-b1);
    background-color: var(---c-bg);

    transform: translateX(-0.25em);
  }

  .icon span {
    display: block;
    transform: scale(2) translateY(-0.1em);
    filter: drop-shadow(5px 5px 2px rgba(0, 0, 0, 0.4));
  }
  .content {
    display: flex;
    flex-direction: column;
    gap: 0.2em;
  }
</style>

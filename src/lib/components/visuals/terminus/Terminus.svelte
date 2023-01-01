<script>
  import { onMount, tick } from 'svelte';
  import { lines, history, run } from './terminus';
  import { fly } from 'svelte/transition';
  import { browser } from '$app/environment';

  let available = false;
  let minimize = true;
  let info = {};
  let ol, input;
  let value = '';
  let history_idx = -1;

  function handleKey(ev) {
    if (ev.key === 'ArrowUp') {
      if (history_idx < $history.length - 1) {
        history_idx++;
        value = $history[$history.length - 1 - history_idx];
      }
      ev.preventDefault();
    }
    if (ev.key === 'ArrowDown') {
      if (history_idx >= 0) {
        history_idx--;
        value = $history[$history.length - 1 - history_idx] || '';
      }
      ev.preventDefault();
    }
  }

  $: if (browser && input && $lines) tick().then(() => input.scrollIntoView(false));

  onMount(async () => {
    info = await fetch('/api/info').then((res) => res.json());
    available = true;
    history.clear();
    lines.clear();
    lines.write('init ' + new Date().toLocaleString());
  });
</script>

<svelte:window on:click={() => (minimize = true)} />

{#if available}
  <div class="terminal" class:minimize>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <form
      on:click|stopPropagation={input.focus()}
      on:submit|preventDefault={async () => {
        run(value);
        history_idx = -1;
        value = '';
      }}
    >
      <h1 on:click|stopPropagation={() => (minimize = !minimize)}>
        <span>•</span><span class="agent">{info?.agent || 'unknown'}@</span> mallsoft
      </h1>
      <ol class="linecounter" bind:this={ol}>
        {#each $lines as line, i}
          <li in:fly={{ duration: 150, x: -100 }}>
            {line}
          </li>
        {/each}
        <li on:click|stopPropagation>
          <!-- svelte-ignore a11y-autofocus -->
          <input
            autofocus
            bind:this={input}
            bind:value
            type="text"
            name="in"
            on:keydown={handleKey}
          />
        </li>
      </ol>
      <p>
        <span>L{value.length}I{history_idx}</span>
      </p>
    </form>
  </div>
{/if}

<style>
  .terminal {
    position: fixed;
    z-index: 666;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 4px;

    height: 100%;

    pointer-events: none;

    display: flex;
    align-items: flex-end;
    justify-content: center;
  }

  .terminal > form {
    pointer-events: all;

    display: flex;
    flex-direction: column;

    max-width: var(---readwidth);
    width: 100%;

    font-family: monospace;

    background-color: var(---c-bg);
    color: var(---c-a1);

    border-radius: 6px;
  }

  .terminal form > :is(p, h1) {
    opacity: 0.8;
    user-select: none;
    padding: 0 4px;
    font-size: max(12px, 0.32em);
    opacity: 0.5;
  }
  .terminal form > h1 {
    text-transform: lowercase;
    cursor: pointer;

    padding: 4px;
    display: flex;

    gap: 0.2em;
    transition: opacity 0.1s;
  }

  .terminal:focus-within form > h1 {
    opacity: 0.7;
  }
  .terminal:focus-within form > h1 span {
    color: var(---c-c1);
  }
  .terminal form > p {
    margin-left: auto;
  }

  .terminal ol {
    position: relative;
    max-height: 40vh;
    overflow-y: scroll;
    scrollbar-color: var(---c-a2) var(---c-bg);

    width: 100%;
    flex-basis: 100vh;

    background-color: var(---c-bg);

    padding: 4px 0 0.2em 4px;

    font-size: max(14px, 0.3em);
  }

  li {
    word-break: break-all;
    line-height: 1.1;

    counter-increment: linecount;

    display: flex;
    gap: 0.2em;

    caret-color: var(---c-c1);

    min-height: 1em;
    width: 100%;

    padding: 0 4px;

    white-space: pre-wrap;
  }
  li:last-of-type {
    padding-bottom: 4px;
  }
  li:first-of-type {
    padding-top: 4px;
  }
  li input {
    height: 100%;
    width: 100%;
    border: none;
    background-color: transparent;
    outline: none;
    opacity: 0.7;
  }

  li:last-of-type::before {
    color: var(---c-a1);
  }
  ol.linecounter {
    counter-reset: linecount;
    counter-set: linecount -1;
  }
  ol.linecounter li::before {
    word-break: keep-all;
    color: var(---c-a2);
    content: counter(linecount, decimal-leading-zero);
    padding-right: 4px;
  }
  ol.linecounter li:last-of-type:before {
    content: '>_';
  }
  ol.linecounter:focus-within li:last-of-type:before {
    content: '>>';
    color: var(---c-a1);
  }

  .terminal ol {
    box-shadow: 0 -2px 2px -2px var(---c-a2), 0 2px 2px -2px var(---c-a2);
  }
  .terminal form {
    box-shadow: inset 0 2px 4px -4px var(---c-a2), inset 0 -2px 4px -4px var(---c-a2),
      0 0 1px 0px var(---c-a2), 1px 1px 1px 0 var(---c-a2);
  }

  .terminal.minimize > form :is(p, ol, h1 >) {
    display: none;
  }
  .terminal.minimize :is(.addr, .agent) {
    display: none;
  }
  .terminal.minimize > form {
    width: fit-content;
  }
  .terminal.minimize {
    justify-content: end;
  }
</style>

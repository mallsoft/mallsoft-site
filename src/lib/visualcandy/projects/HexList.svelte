<script>
  import { createEventDispatcher } from 'svelte';
  import { projectlog } from '$lib/content';

  const dispatch = createEventDispatcher();
</script>

<div
  on:mouseleave={() => {
    dispatch('exit');
  }}
>
  <ul>
    {#each projectlog as { title, description, image: src, link: href, alt }}
      <li
        on:mouseenter={({ target }) => {
          // @ts-ignore
          const rect = target.getBoundingClientRect();
          dispatch('hover', { rect, title, description, src, href, alt });
        }}
      >
        <a
          {href}
          target="_blank"
          on:click|preventDefault={() => {
            dispatch('click', { title, href });
          }}
        >
          <img {src} {alt} />
        </a>
      </li>
    {/each}
  </ul>
</div>

<style>
  div {
    display: flex;

    margin-top: 1.8em;

    --s: min(220px, calc(14vw - 10px));
    --m: 8px;
    --f: calc(1.732 * var(--s) + 4 * var(--m));

    max-width: calc((var(--s) + var(--m)) * 4.5);
  }

  ul {
    font-size: 0;
  }

  ul::before {
    content: '';
    width: calc(var(--s) / 2 + var(--m));
    float: left;
    height: 150%;

    margin-top: -30px;
    shape-outside: repeating-linear-gradient(transparent 0 calc(var(--f) - 3px), #000 0 var(--f));

    /* background: repeating-linear-gradient(red 0 calc(var(--f) - 1px), #000 0 var(--f)); */
  }

  li {
    display: inline-block;

    overflow: hidden;

    width: var(--s);
    height: calc(var(--s) * 1.1547);
    font-size: initial;
    clip-path: polygon(0% 25%, 0% 75%, 50% 100%, 100% 75%, 100% 25%, 50% 0%);

    margin: var(--m);
    margin-bottom: calc((var(--m) - var(--s)) * 0.2762);
  }

  @media (max-width: 640px) {
    div {
      --s: 80px;
    }
  }

  @media (max-width: 340px) {
    ul {
      display: flex;
      flex-flow: row wrap;
      gap: 3vw;
      align-items: center;
      justify-content: center;
    }
    ul::before {
      display: none;
    }
    li {
      display: block;
      clip-path: none;
      width: 35vw;
      height: 35vw;
      margin: 0;
    }
  }

  a::after {
    display: none;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;

    filter: grayscale(0.4) opacity(0.85) contrast(1.1);

    transition: transform 0.3s, filter 0.4s;
  }

  a:is(:hover, :active, :focus-within) > img {
    transform: scale(1.1);
    filter: unset;

    transition: transform 0.2s, filter 0.1s;
  }

  /* image fade */
  li {
    transition: opacity 0.2s;
  }
  ul:hover li:not(:hover) {
    transition: opacity 1.2s;
    opacity: 0.3;
  }
</style>

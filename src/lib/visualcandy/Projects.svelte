<script>
  import { projectlog } from '$lib/content';
</script>

<div>
  <ul>
    {#each projectlog as { title, description, image, link, alt }}
      <li>
        <a href={link} target="_blank">
          <img src={image} {alt} />
        </a>
      </li>
    {/each}
  </ul>
</div>

<style>
  div {
    display: flex;

    margin: 0 auto;
    margin-top: 1em;

    --s: calc(14vw - 10px);
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
    height: 120%;

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

    filter: grayscale(0.5) opacity(0.8) contrast(1.1);

    transition: transform 0.3s, filter 0.4s;
  }

  a:is(:hover, :active, :focus-within) > img {
    transform: scale(1.1);
    filter: unset;

    transition: transform 0.2s, filter 0.1s;
  }
</style>

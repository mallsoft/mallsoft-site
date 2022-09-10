<script>
  import GRay from '$lib/visuals/GRay.svelte';
  import { me } from '$lib/content';
  import { unlocked } from '$lib/achievement/achievementStores';
</script>

<article class="default">
  <h1>Action</h1>
  <address>
    <a href="mailto:{me.email}?subject=Hello {me.name}!">mailto:</a><span>{me.email}</span>
    <a href="https://github.com{me.github}">github:</a><span>{me.github}</span>
  </address>
  <p class="diff-remove">
    Lorem, ipsum dolor sit amet consectetur adipisicing elit bla bla bla call to action / something
    about me being available for work...
  </p>
  <p class="diff-add">
    Hi there, i am glad you made it this far! If you have any questions or just liked the site, let
    me know!
  </p>

  {#if $unlocked.length}
    <a class="achievements" href="/achievements">Achievements</a>
  {/if}
</article>

<GRay />

<style>
  address {
    font-style: normal;
    display: grid;
    grid-template-columns: auto 1fr;
    grid-gap: 0.2em 0;
  }

  span {
    margin-left: 0.5em;
    user-select: all;
    width: max-content;
  }

  article {
    display: flex;
    flex-direction: column;
  }

  a.achievements {
    font-size: 0.5em;
    color: var(---c-a2);
    text-decoration: none;

    margin-top: auto;
    margin-left: auto;
    width: max-content;
  }
  a.achievements:is(:hover, :focus) {
    color: var(---c-b1);
    text-decoration: underline;
    animation: pulse 1.5s infinite;
  }

  @keyframes pulse {
    0% {
      color: var(---c-a2);
    }
    50% {
      color: var(---c-b1);
      transform: scale(1.1);
    }
    100% {
      color: var(---c-a2);
    }
  }
</style>

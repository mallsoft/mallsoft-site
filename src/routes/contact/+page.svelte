<script>
  import GRay from '$lib/components/visuals/GRay.svelte';
  import { me } from '$lib/content';
  import { unlocked } from '$lib/components/achievement/achievementStores';
</script>

<svelte:head>
  <title>mallsoft•dev - Contact</title>
</svelte:head>

<article class="default">
  <h1>Action</h1>
  <address>
    <a href="mailto:{me.email}?subject=Hello {me.name}!">mailto:</a><span>{me.email}</span>
    <a href="https://github.com{me.github}">github:</a><span>{me.github}</span>
  </address>
  <p class="diff-remove">
    Lorem, ipsum dolor sit amet consectetur adipisicing elit bla bla bla call to action / something
    about being available for work...
  </p>
  <p class="diff-add">
    If you think we should have a chat... well then you have already clicked the "mailto" thing up
    there right?
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
    margin-top: 1em;
    margin-left: auto;
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

  p:first-of-type {
    margin-top: 0.8em;
  }
  p:last-of-type {
    margin-bottom: 0.8em;
  }
</style>

<script>
  import { unlocked, achievements } from '$lib/components/achievement/achievementStores';
  import { loadLocal, saveLocal } from '$lib/utils';
  import { onMount } from 'svelte';

  let doesntLikeAward = null;
  onMount(() => {
    doesntLikeAward = loadLocal('awwardtogle');
  });
</script>

{#if $unlocked && $unlocked.length}
  <ul>
    {#each achievements as { id, name, description, icon }, i}
      {@const u = $unlocked.includes(id)}
      <li class:unlocked={u} class:diff-add={!i}>
        <span>{icon || '❔'}</span>
        <h3>{name}</h3>
        <p>{u ? description : '???'}</p>
      </li>
    {/each}
  </ul>
  <p>
    {#if $unlocked.length === achievements.length}
      You unlocked the achievements.<br /><em
        >"Here's your award"
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <span
          on:click={() => {
            doesntLikeAward = true;
            saveLocal('awwardtogle', true);
          }}>{doesntLikeAward ? '🥈 ...yeah' : '🥇'}</span
        >
      </em>
    {:else}
      Unlocked {$unlocked.length} of {achievements.length} achievements.
    {/if}
  </p>
{/if}

<style>
  ul,
  p {
    font-size: smaller;
  }
  ul {
    margin: 1em 0;
  }
  li + li {
    margin-top: 1em;
  }
  li {
    display: grid;
    grid-template:
      'icon name'
      'icon description'
      / 2em 1fr;
    gap: 0 0.5em;
  }

  li > * {
    transition: filter 0.2s;
    filter: grayscale(1) opacity(0.5) brightness(0.5);
  }

  li span {
    grid-area: icon;
    align-self: center;
    justify-self: center;
    font-size: 2em;
  }

  h3 {
    grid-area: name;
    align-self: center;
    font-size: 1.5em;
  }

  p {
    grid-area: description;
    align-self: center;
  }

  .unlocked > * {
    filter: unset;
  }
</style>

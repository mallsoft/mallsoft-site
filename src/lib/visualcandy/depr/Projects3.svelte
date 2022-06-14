<script>
  import { projectlog } from '$lib/content';
</script>

<ul>
  {#each projectlog as { title, description, image, link }}
    <li>
      <p>{title}</p>
      <img src={image} alt={title} />
      <!-- <a href={link}>{title}</a> -->
    </li>
  {/each}
</ul>

<style>
  ul {
    margin-top: 1.8em;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }

  li {
    position: relative;
    border-radius: 1em;
  }

  p {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;

    font-size: 0.5em;
    margin-top: 1.2em;
    padding: 0.3em 0.6em;
    background-color: var(---c-bg);
  }

  img {
    width: 100%;
    height: auto;
  }
</style>

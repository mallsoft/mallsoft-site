<script>
  import { projectlog } from '$lib/content';
</script>

<ul class="box">
  {#each projectlog as { title, description, link }}
    <li>
      <h3>
        {title}
      </h3>
      <p>
        {description}
      </p>
      <a href={link} target="_blank">visit</a>
    </li>
  {/each}
</ul>

<style>
  ul {
    display: flex;
    flex-direction: column;
  }
  li {
    display: grid;
    gap: 0.1em;

    justify-content: space-between;

    font-size: 0.8em;
    margin: 10px 20px;
  }

  li a {
    text-decoration: none;
  }

  li a::after {
    display: none;
  }

  h3 {
    font-size: 1em;
    font-weight: bold;
  }
  p {
    font-size: 0.7em;
    max-width: var(---readwidth);
  }

  h3 {
    grid-row: 1;
  }

  p {
    grid-row: 2;
  }

  a {
    grid-row: 1 / span 2;
    align-self: end;
  }

  @media (max-width: 699px) {
    p {
      font-size: 0.9em;
    }
    a {
      grid-row: 3;
    }
  }
</style>

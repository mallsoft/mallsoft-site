<script>
  import { page } from '$app/stores';
  import { navRoutes } from '$lib/content';

  $: index = $page.url.pathname === '/';
</script>

<header class:index>
  <a aria-current={$page.url.pathname === '/' ? 'page' : null} href=".">mallsoft•dev</a>
  <nav>
    {#each navRoutes as { href, name }}
      <a aria-current={$page.url.pathname === href ? 'page' : null} {href}>{name}</a>
    {/each}
  </nav>
</header>

<style>
  header {
    transition: opacity 0.4s ease-out, transform 0.3s ease-out;
  }
  header:not(:hover).index {
    transform: translate(0, -110%);
    opacity: 0;
  }

  header {
    font-size: 75%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 1rem;
    flex-wrap: wrap;
    gap: 0.5em;
  }

  header > a {
    display: flex;
    align-items: center;
    margin-right: 1em;
  }

  nav {
    display: flex;
    align-items: center;
    justify-content: end;
    gap: 1em;
  }

  a[aria-current='page'] {
    text-decoration: none;
    color: var(---c-b2);
  }

  a {
    letter-spacing: 0.08em;
  }

  @media (max-width: 600px) {
    header {
      padding-top: 0.8em;
    }
    a {
      padding: 0.5em;
    }
  }
</style>

<script>
  import { page } from '$app/stores';
  import { navRoutes } from '$lib/content';

  $: index = $page.url.pathname === '/' || $page.url.pathname === '/qrgen';
</script>

<nav class:index>
  <a aria-current={$page.url.pathname === '/' ? 'page' : null} href=".">Index</a>
  {#each navRoutes as { href, name }}
    <a aria-current={$page.url.pathname === href ? 'page' : null} {href}>
      {name}
    </a>
  {/each}
</nav>

<style>
  nav {
    font-size: 75%;
    display: flex;
    align-items: center;
    padding: 0.5rem 1rem;
    flex-wrap: wrap;
    justify-content: end;
    gap: 1em;

    transition:
      opacity 0.4s ease-out,
      transform 0.3s ease-out;
  }
  nav:not(:is(:hover, :focus-within)).index {
    transform: translate(0, -110%);
    opacity: 0;
  }

  a:first-of-type {
    margin-right: auto;
  }

  a[aria-current='page'] {
    text-decoration: none;
    color: var(---c-b2);
  }

  a {
    letter-spacing: 0.08em;

    background-color: var(---c-bg);
    border-radius: 6px;
    padding: 3px 6px;
  }

  @media (max-width: 600px) {
    nav {
      padding-top: 0.8em;
      padding-left: 0.4em;
      padding-right: 0.4em;
      gap: 0.8em;
    }
    a {
      padding: 0.2em;
    }
  }
</style>

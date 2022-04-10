<script>
  import { page } from '$app/stores';
  import { me } from '$lib/content';

  $: index = $page.url.pathname === '/';
</script>

<header class:index>
  <a aria-current={$page.url.pathname === '/' ? 'page' : null} href=".">mallsoft•dev</a>
  <nav>
    <a aria-current={$page.url.pathname === '/about' ? 'page' : null} href="about">About</a>
    <a aria-current={$page.url.pathname === '/projects' ? 'page' : null} href="projects">
      Projects
    </a>
    <a aria-current={$page.url.pathname === '/contact' ? 'page' : null} href="contact">Contact</a>
  </nav>
</header>

<style>
  a {
    transition: opacity 0.3s ease-in, transform 0.2s ease-in;
  }
  .index a {
    transform: translate(0, -0.45em);
    opacity: 0;
  }

  header {
    max-width: 2560px;
    font-size: 75%;
    font-family: var(---fontx);
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 0.5rem 1rem;
  }

  header > a {
    display: flex;
    align-items: center;
  }

  nav {
    display: flex;
    align-items: center;
    justify-content: end;
    flex-wrap: wrap;
    margin-left: auto;
  }

  nav a + a {
    margin-left: 1em;
  }

  a[aria-current='page'] {
    text-decoration: none;
    color: var(---c-b2);
  }
</style>

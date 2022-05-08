<script>
  import { page } from '$app/stores';
  import { crossfade } from 'svelte/transition';
  const [s, r] = crossfade({});

  $: index = $page.url.pathname === '/';
</script>

<header class:index>
  <a sveltekit:prefetch aria-current={$page.url.pathname === '/' ? 'page' : null} href="."
    >mallsoft•dev</a
  >
  <nav>
    <a
      sveltekit:prefetch
      aria-current={$page.url.pathname === '/about' ? 'page' : null}
      href="about">About</a
    >
    <a
      sveltekit:prefetch
      aria-current={$page.url.pathname === '/projects' ? 'page' : null}
      href="projects">Projects</a
    >
    <a
      sveltekit:prefetch
      aria-current={$page.url.pathname === '/contact' ? 'page' : null}
      href="contact">Contact</a
    >
  </nav>
</header>

<style>
  header {
    transition: opacity 0.15s, transform 0.1s ease-out;
  }
  header:not(:hover).index {
    transform: translate(0, -110%);
    opacity: 0;
  }

  header {
    font-size: 75%;
    font-family: var(---fontx);
    display: flex;
    justify-content: space-between;
    align-items: center;
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

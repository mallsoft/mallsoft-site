<script>
  import Wscord from '$lib/visualcandy/Wscord.svelte';
</script>

<article class="default">
  <h1>mallsoft•dev</h1>
  <p>a developer based in Bergen<br />— mostly focused on web and UX</p>

  <nav>
    <a href="about" sveltekit:prefetch>About</a>
    <a href="projects" sveltekit:prefetch>Projects</a>
    <a href="contact" sveltekit:prefetch>Contact</a>
  </nav>
</article>

<Wscord />

<style>
  nav {
    margin-top: 0.45em;
    display: flex;
    flex-wrap: wrap;
    gap: 1em;
  }

  p {
    line-height: 1.1;
  }
</style>

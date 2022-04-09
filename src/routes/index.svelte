<script>
  import { me } from '$lib/content';
</script>

<article class="default">
  <h1>mallsoft•dev</h1>
  <p>a developer based in Bergen<br />— mostly focused on web and UX</p>

  <nav>
    <a href="about">About</a>
    <a href="projects">Projects</a>
    <a href="mailto:{me.email}?subject=Halais!">Contact</a>
  </nav>
</article>

<style>
  nav {
    margin-top: 0.45em;
  }
  a {
    font-family: var(---fontx);
    font-size: 80%;
  }
  a + a {
    margin-left: 0.9em;
  }
  h1 {
    color: var(---c-a2);
  }
  p {
    line-height: 1.1;
  }
</style>

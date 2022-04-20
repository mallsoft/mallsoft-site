<script>
  import { me } from '$lib/content';
</script>

<article class="default">
  <h1>Contact</h1>
  <p>
    <a href="mailto:{me.email}?subject=Hello {me.name}!">mailto:</a>
    {me.email}
  </p>
</article>

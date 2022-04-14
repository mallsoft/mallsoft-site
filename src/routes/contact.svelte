<script>
  import { me } from '$lib/content';
</script>

<article class="default">
  <h1>Contact</h1>
  email:
  <a href="mailto:{me.email}?subject=Hello {me.name}!">{me.email}</a>
</article>

<script>
  import { me } from '$lib/content';
</script>

<article class="default">
  <h1>Contact</h1>
  <p>
    <span>email</span>
    <a href="mailto:{me.email}?subject=Hello {me.name}!">{me.email}</a>
  </p>
</article>

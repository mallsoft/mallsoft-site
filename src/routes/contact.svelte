<script>
  // import { messages } from '$lib/announcement/messages';
  import { me } from '$lib/content';

  // function copyToClip(value) {
  //   navigator.clipboard.writeText(value);
  //   messages.add('✂', 'Copy that!', `(${value}) copied to clipboard`, 1300);
  // }
</script>

<article class="default">
  <h1>Contact</h1>
  <p>
    <a href="mailto:{me.email}?subject=Hello {me.name}!">mailto:</a><span>{me.email}</span>
  </p>
  <p>
    <a href="https://github.com{me.github}">github:</a><span>{me.github}</span>
  </p>
</article>

<style>
  span {
    margin-left: 0.5em;
    user-select: all;
  }
</style>

<script context="module">
  import { browser } from '$app/env';
  import { projectlog } from '$lib/content';
  export async function load() {
    if (browser) {
      await Promise.all(
        projectlog.map(({ image }) => {
          return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve();
            img.onerror = (e) => reject(e);
            img.src = image;
          });
        })
      );
    }
    return { status: 200 };
  }
</script>

<script>
  import Projects from '$lib/visualcandy/Projects.svelte';
</script>

<article class="default">
  <h1>Projects</h1>
  <h2>a sample of sites I have worked on</h2>
  <Projects />
</article>

<style>
  h2 {
    font-size: 1em;
    line-height: 1.1;
    font-weight: normal;
    max-width: var(---readwidth);
  }
</style>

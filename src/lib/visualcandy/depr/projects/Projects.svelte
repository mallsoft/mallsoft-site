<script>
  import FloatingLabel from './FloatingLabel.svelte';
  import HexList from './HexList.svelte';
  import PageView from './PageView.svelte';

  let hovering = null;
  let preview = null;
</script>

<HexList
  on:exit={() => (hovering = null)}
  on:hover={({ detail }) => {
    hovering = detail;
  }}
  on:click={({ detail }) => {
    preview = detail;
  }}
/>

<FloatingLabel element={hovering} />
<PageView element={preview} />

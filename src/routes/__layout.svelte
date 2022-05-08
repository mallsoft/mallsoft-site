<script lang="ts">
  import '../app.css';

  import Meta from '$lib/Meta.svelte';
  import Main from '$lib/layout/Main.svelte';
  import Header from '$lib/layout/Header.svelte';
  import Announcer from '$lib/announcement/Announcer.svelte';
  import Achievements from '$lib/achievement/Achievements.svelte';
</script>

<Meta />
<Header />

<Main>
  <slot />
</Main>

<Announcer />
<Achievements />

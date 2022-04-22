<script>
  import { onMount } from 'svelte';

  let showToggle = false;
  let colorScheme = 'light dark'; // default prefers light mode (supported: light, dark)

  const setColorMode = (mode) => {
    document.documentElement.style.colorScheme = mode;
  };

  onMount(() => {
    showToggle = true;

    const saved = localStorage.getItem('colorMode');
    const _matchMedia = window.matchMedia('(prefers-color-scheme: dark)');
    const browserThemeDark = _matchMedia.matches;

    if (saved) {
      colorScheme = saved;
    } else {
      colorScheme = browserThemeDark ? 'dark' : 'normal';
    }

    // clear localStorage if the user changes the color mode in prefers-color-scheme
    const handleColorSchemeChange = () => {
      localStorage.removeItem('colorMode');
    };
    _matchMedia.addEventListener('change', handleColorSchemeChange);

    return () => {
      _matchMedia.removeEventListener('change', handleColorSchemeChange);
    };
  });
</script>

<footer>
  <div>
    {#if showToggle}
      <button
        on:click={() => {
          colorScheme.startsWith('light') ? (colorScheme = 'dark') : (colorScheme = 'light');
          localStorage.setItem('colorMode', colorScheme);
          setColorMode(colorScheme);
        }}
      >
        <svg fill="currentColor" viewBox="0 0 16 16">
          {#if colorScheme.startsWith('dark')}
            <title>Light on icon</title>
            <path
              d="M2 6a6 6 0 1 1 10.174 4.31c-.203.196-.359.4-.453.619l-.762 1.769A.5.5 0 0 1 10.5 13h-5a.5.5 0 0 1-.46-.302l-.761-1.77a1.964 1.964 0 0 0-.453-.618A5.984 5.984 0 0 1 2 6zm3 8.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1l-.224.447a1 1 0 0 1-.894.553H6.618a1 1 0 0 1-.894-.553L5.5 15a.5.5 0 0 1-.5-.5z"
            />
          {:else}
            <title>Light off icon</title>
            <path
              d="M2 6c0-.572.08-1.125.23-1.65l8.558 8.559A.5.5 0 0 1 10.5 13h-5a.5.5 0 0 1-.46-.302l-.761-1.77a1.964 1.964 0 0 0-.453-.618A5.984 5.984 0 0 1 2 6zm10.303 4.181L3.818 1.697a6 6 0 0 1 8.484 8.484zM5 14.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1l-.224.447a1 1 0 0 1-.894.553H6.618a1 1 0 0 1-.894-.553L5.5 15a.5.5 0 0 1-.5-.5zM2.354 1.646a.5.5 0 1 0-.708.708l12 12a.5.5 0 0 0 .708-.708l-12-12z"
            />
          {/if}
        </svg>
      </button>
    {/if}
  </div>
</footer>

<style>
  button {
    background: none;
    border: none;
    padding: 0;
    margin: 0;
    outline: none;
    cursor: pointer;
  }
  svg {
    width: 1.5em;
    height: 1.5em;
  }

  footer > div {
    max-width: var(---readwidth);
    margin: 0 auto;
    display: flex;
    justify-content: flex-end;
    padding: 0.5rem 1rem;

    opacity: 0.25;
    transition: opacity 0.2s ease-in-out;
  }
  footer > div > * {
    font-size: 0.8rem;
  }
  footer:hover > div {
    opacity: 1;
  }
</style>

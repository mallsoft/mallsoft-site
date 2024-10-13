<script lang="ts">
  import { toCanvas } from 'qrcode';

  let canvas: HTMLCanvasElement;
  let qrError: Error | null | undefined = null;

  let code = '';
  let scale = 10;
  let color_dark = '#000000';
  let color_light = '#ffffff00';

  $: canvas &&
    toCanvas(
      canvas,
      code || 'https://mallsoft.dev/',
      {
        scale,
        margin: color_light === '#ffffff00' ? 0 : 4,
        color: {
          dark: color_dark,
          light: color_light
        }
      },
      (err) => {
        qrError = err;
      }
    );
</script>

<svelte:head>
  <title>Qrcode in a pinch</title>
</svelte:head>

<main>
  {#if qrError}
    <pre>qrcode error: {qrError.message}</pre>
  {:else}
    <canvas bind:this={canvas} />
  {/if}

  <div class="io">
    <input type="text" bind:value={code} placeholder="write stuff here" />
    <div class="colors">
      <label>
        <span>FG: {color_dark}</span>
        <input type="color" bind:value={color_dark} />
      </label>
      <label>
        <span>BG: {color_light}</span>
        <input type="color" bind:value={color_light} />
      </label>
    </div>
  </div>
  <div class="io">
    <input type="range" min="4" max="100" bind:value={scale} />
    <span>x{scale}</span>
  </div>
</main>

<style>
  main {
    --checker1: #aaaaaa;
    --checker2: #e9e9e9;

    --text: rgb(46, 46, 46);
    --bg: white;

    color: var(--text);

    display: flex;
    flex-direction: column;
    align-items: center;

    flex-grow: 1;
    gap: 1rem;

    padding: 1rem;

    border-radius: 0.25rem;
    background: repeating-conic-gradient(var(--checker1) 0% 25%, var(--checker2) 0% 50%) 50% / 6px
      6px;
  }

  canvas {
    margin: auto 0;
  }

  .colors {
    background-color: var(--bg);
    color: var(--text);
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;
    width: 100%;
    padding: 0.25rem;
  }

  .io {
    display: flex;
    gap: 1rem;
  }

  .io [type='text'] {
    color: var(--text);
    background-color: var(--bg);

    border: 0.25rem solid currentColor;
    padding: 0 0.25rem;
  }

  .io span {
    color: var(--text);
  }

  label {
    display: flex;
    align-items: center;
    gap: 1rem;
    max-width: max-content;
  }

  label > span {
    font-size: 1rem;
  }
</style>

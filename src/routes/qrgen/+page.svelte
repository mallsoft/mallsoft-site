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

  $: x = JSON.stringify({
    canvas,
    code: code || 'https://mallsoft.dev/',
    hmm: {
      scale,
      margin: color_light === '#ffffff00' ? 0 : 4,
      color: {
        dark: color_dark,
        light: color_light
      }
    }
  });
</script>

<section>
  {#if qrError}
    <pre>qrcode error: {qrError.message}</pre>
  {:else}
    <canvas bind:this={canvas} />
  {/if}

  <input type="text" bind:value={code} placeholder="code" />
  <div>
    <label>
      <span>FG: {color_dark}</span>
      <input type="color" bind:value={color_dark} />
    </label>
    <label>
      <span>BG: {color_light}</span>
      <input type="color" bind:value={color_light} />
    </label>
  </div>
  <input type="range" min="4" max="100" bind:value={scale} />
</section>

<style>
  section {
    display: flex;
    flex-direction: column;

    align-items: center;

    padding: 1rem;

    border-radius: 0.25rem;

    background: repeating-conic-gradient(#aaaaaa 0% 25%, #e9e9e9 0% 50%) 50% / 4px 4px;
  }

  canvas {
    margin: 1rem;
    margin-bottom: 2rem;
  }

  div {
    background-color: gainsboro;
    color: rgb(85, 85, 85);
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;
    width: 100%;
    margin-top: 0.25rem;
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

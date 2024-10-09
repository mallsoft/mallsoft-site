<script lang="ts">
  import { toCanvas } from 'qrcode';

  let code = '';
  let canvas: HTMLCanvasElement;
  let qrError: Error | null | undefined = null;

  let color_dark = '#000000';
  let color_light = '#ffffff00';

  $: canvas &&
    code &&
    toCanvas(
      canvas,
      code,
      {
        scale: 10,
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

<section>
  {#if code}
    <div>
      {#if qrError}
        <pre>qrcode error: {qrError.message}</pre>
      {:else}
        <label>
          <span>QR</span>
          <input type="color" bind:value={color_dark} />
        </label>
        <label>
          <span>Background</span>
          <input type="color" bind:value={color_light} />
        </label>
        <canvas bind:this={canvas} />
        <span>Right click to save as...</span>
      {/if}
    </div>
  {/if}

  <label>
    Enter code
    <input type="text" bind:value={code} placeholder="qrcode" />
  </label>
</section>

<style>
  section,
  label {
    display: flex;
    gap: 1rem;
    flex-direction: column;
  }

  div {
    background-color: rgb(66, 66, 66);
    padding: 1rem;

    display: flex;
    gap: 1rem;
    flex-direction: column;
    align-items: center;
    border-radius: 1rem;
  }

  canvas + span {
    font-size: 1rem;
    margin-right: auto;
  }

  div > label {
    display: flex;
    flex-direction: row;
    font-size: 1rem;
    width: 100%;
  }
</style>

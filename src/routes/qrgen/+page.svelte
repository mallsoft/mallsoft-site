<script lang="ts">
  import { toCanvas } from 'qrcode';

  let code = '';
  let canvas: HTMLCanvasElement;
  let qrError: Error | null | undefined = null;

  $: canvas &&
    toCanvas(
      canvas,
      code,
      {
        scale: 10,
        margin: 0,
        color: {
          dark: '#000000',
          light: '#ffffff00'
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
      <span>Right click to save as</span>
      {#if qrError}
        <pre>qrcode error: {qrError.message}</pre>
      {:else}
        <canvas bind:this={canvas} />
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
  }
</style>

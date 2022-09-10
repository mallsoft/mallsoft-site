<script>
  import { projectlog } from '$lib/content';

  let current = null;
</script>

<div class="box">
  {#if current}
    <div class="frame" aria-label="page preview">
      <button on:click={() => (current = null)}>back</button>
      <h1>{current.title}</h1>

      <div>
        <p>
          {current.link}
          <a href={current.link}>Visit</a>
        </p>
        <iframe
          frameborder="0"
          scrolling="no"
          tabindex="-1"
          on:click|preventDefault
          src={current.link}
          title={current.title}
        />
      </div>
    </div>
  {:else}
    <ul>
      {#each projectlog as { title, description, link }, i}
        <li
          class:diff-remove={projectlog.length - 1 === i}
          role="button"
          tabindex="0"
          on:click={() => {
            current = { title, link };
          }}
          on:keypress={(ev) => {
            if (ev.key === 'Enter') {
              current = { title, link };
            }
          }}
        >
          <h3>
            {title}
          </h3>
          <p>
            {description}
          </p>
        </li>
      {/each}
    </ul>
  {/if}
</div>

<style>
  .frame {
    display: grid;
    grid-template-columns: auto 1fr;
  }

  .frame h1 {
    background: var(---c-bg);
    color: var(---c-a1);
    font-size: 1em;
    margin-bottom: 0.2em;

    align-self: center;
    justify-self: center;

    grid-column: 2;
  }

  .frame button {
    background: var(---c-b1);
    color: var(---c-bg);
    border: none;
    cursor: pointer;
    padding: 5px 20px;

    grid-column: 1;
  }

  .frame button::before {
    content: '← ';
  }
  .frame div {
    width: 100%;
    min-height: 100vh;

    grid-row: 2;
    grid-column: span 2;

    border: 3px solid var(---c-b1);

    box-shadow: inset 0 0 1px 1px var(---c-bg);

    position: relative;
  }

  .frame div::after {
    content: '';
    position: absolute;
    z-index: 1;
    width: 100%;
    height: 100%;
    cursor: crosshair;
  }

  .frame div iframe {
    pointer-events: none;

    width: 100%;
    height: 100%;
    opacity: 0.8;
    position: absolute;
    z-index: 1;

    background: repeating-conic-gradient(#eeeeee 0% 25%, #ffffff 0% 50%) 50% / 20px 20px;

    filter: grayscale(1);
  }

  .frame div p {
    padding: 5px 10px;
    margin: 0;
    font-size: 0.6em;
    color: var(---c-a2);
    background: var(---c-bg);
    border-bottom: 3px solid var(---c-b1);

    display: flex;
    justify-content: space-between;

    position: absolute;
    z-index: 3;
    top: 0;
    left: 0;
    width: 100%;
  }

  ul {
    display: flex;
    flex-direction: column;
  }

  li {
    font-size: 0.8em;
    padding: 20px;

    cursor: pointer;

    transition: transform 0.4s;
  }

  li:is(:hover, :focus-within) {
    transition: transform 0.1s;
    transform: scale(1.02);
  }

  li:is(:hover, :focus-within) h3 {
    color: var(---c-b1);
    transition: color 0.1s;

    position: relative;
  }

  h3 {
    font-size: 2em;
    font-weight: bold;
    color: var(---c-a2);

    transition: color 0.2s;

    line-height: 1.15;
  }

  li p {
    line-height: 1.5;
  }
</style>

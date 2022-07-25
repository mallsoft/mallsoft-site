<script>
  import { projectlog } from '$lib/content';
</script>

<p>
  {#each projectlog as { title, image, link, alt }}
    <a href={link} target="_blank">
      <img src={image} {alt} />
      <span>{title}</span>
    </a>
  {/each}
  {#each Array((3 - (projectlog.length % 3)) % 3) as _}
    <span aria-label="placeholder" aria-hidden="true" />
  {/each}
</p>

<svg clip-rule="evenodd" width="0" height="0" style="position: absolute;" aria-hidden="true">
  <clipPath id="squircle" clipPathUnits="objectBoundingBox">
    <path
      transform="scale(0.01)"
      d="M6 6c7-8 81-8 88 0 8 7 8 81 0 88-7 8-81 8-88 0-8-7-8-81 0-88Z"
    />
  </clipPath>
</svg>

<style>
  p {
    display: grid;
    grid-template-columns: repeat(3, 1fr);

    gap: 1rem;
    margin-top: 0.9em;

    padding: 0.5em;
    border: 4px dashed var(---c-a2);
  }

  p > a {
    --blur: 7px;
    --blur2: 0.4px;
    --color: rgba(0, 0, 0, 0.25);
    --color2: rgba(255, 255, 255, 0.3);
    filter: drop-shadow(2px 2px var(--blur2) var(--color2))
      drop-shadow(-2px -2px var(--blur2) var(--color2))
      drop-shadow(5px 5px var(--blur) var(--color));

    outline: none;
    transition: filter 0.2s;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  p > a > span {
    font-style: italic;
    position: absolute;
    display: block;
    z-index: 4;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    font-size: 55%;
    max-width: 90%;
    height: max-content;
    opacity: 0;
    text-align: center;
    transform: scale(1.2) translateY(-1em);
    transition: opacity 0.25s, transform 0.1s;
    color: rgb(225, 225, 225);
  }

  p > a > img {
    clip-path: url(#squircle);
    width: 100%;
    aspect-ratio: 1/1;

    transition: filter 0.1s;

    color: var(---c-bg);
    background-color: var(---c-a1);
    display: flex;
    align-items: center;
    justify-content: center;

    font-size: 0.6em;
    word-wrap: break-word;
  }

  p > a:is(:active, :hover, :focus) {
    --color2: rgba(0, 0, 0, 0.125);
  }

  p > a:is(:active, :hover, :focus) > img {
    color: white;
    filter: blur(3px) brightness(0.4) grayscale(0.5);
    transition: filter 0.2s;
  }

  p > a:is(:active, :hover, :focus) > span {
    transform: scale(1);
    opacity: 1;
  }

  p > a::after {
    opacity: 1;
    clip-path: url(#squircle);
    width: 96%;
    height: 96%;
    background: linear-gradient(-155deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0) 15%),
      linear-gradient(25deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0) 9%);
    opacity: 1;
    transition: opacity 0.25s;
  }
  p > a:is(:active, :hover, :focus)::after {
    opacity: 0.3;
  }

  @media (hover: none) {
    p > a > img {
      filter: blur(3px) brightness(0.4) grayscale(0.5);
    }
    p > a > span {
      transform: scale(1);
      opacity: 1;
    }
  }

  p > span {
    clip-path: url(#squircle);
    width: 100%;
    height: 100%;
    background-color: var(---c-a2);
    opacity: 0.1;
    pointer-events: none;
    user-select: none;
  }
</style>

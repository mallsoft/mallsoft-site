<script>
  import { me } from '$lib/content';
  import { Engine, Runner, Composite, Bodies } from 'matter-js';
  import { onMount } from 'svelte';

  let wordBox;
  const elements = [];

  function getAbsoluteRect(element) {
    const rect = element.getBoundingClientRect();
    return {
      left: rect.left + window.scrollX,
      top: rect.top + window.scrollY,
      right: rect.right + window.scrollX,
      bottom: rect.bottom + window.scrollY,
      cx: rect.left + window.scrollX + rect.width / 2,
      cy: rect.top + window.scrollY + rect.height / 2,
      width: rect.width,
      height: rect.height,
      radius: (rect.width + rect.height) / 4
    };
  }

  let engine, runner;
  onMount(() => {
    engine = Engine.create({
      enableSleeping: true,
      gravity: {
        x: 0,
        y: -1
      },
      positionIterations: 4
    });
    runner = Runner.create();

    const box = getAbsoluteRect(wordBox);

    elements.forEach((el) => {
      const rect = getAbsoluteRect(el);
      el['physics'] = Bodies.circle(rect.cx, rect.cy, rect.radius, {
        isStatic: false
      });
      el.referencePos = rect;
      Composite.add(engine.world, el['physics']);
    });

    // create bounding box
    Composite.add(engine.world, [
      Bodies.rectangle(box.cx, box.bottom, box.width, 10, {
        isStatic: true
      }), // bottom
      Bodies.rectangle(box.left, box.cy, 10, box.height, {
        isStatic: true
      }), // left
      Bodies.rectangle(box.right, box.cy, 10, box.height, {
        isStatic: true
      }), // right
      Bodies.rectangle(box.cx, box.top, box.width, 10, {
        isStatic: true
      }) // top
    ]);

    Runner.run(runner, engine);

    function loop() {
      Engine.update(engine);

      if (elements.length && elements[0]?.physics) {
        elements.forEach((el) => {
          const { x, y } = el.physics.position;
          const { referencePos: rp } = el;

          el.style.transform = `translate(${x - (rp.left + rp.radius)}px, ${
            y - (rp.top + rp.radius)
          }px) rotate(${el.physics.angle}rad)`;
        });
      }

      requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);

    return () => {
      Runner.stop(runner);
    };
  });
</script>

<svelte:window
  on:resize={() => {
    elements.forEach((el) => {
      const rect = getAbsoluteRect(el);
      el.physics.position.x = rect.cx;
      el.physics.position.y = rect.cy;
      el.referencePos = rect;
    });
  }}
/>

<ul bind:this={wordBox}>
  {#each me.keywords as word, i}
    <li bind:this={elements[i]}>
      {word}
    </li>
  {/each}
</ul>

<style>
  ul {
    padding: 5px;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-wrap: wrap;

    gap: 1ch;
    font-size: 1rem;
    margin-top: 0.9rem;
    min-height: 800px;

    position: relative;
  }

  li::selection {
    background: var(---c-bg);
    color: var(---c-a2);
  }
  li {
    color: var(---c-bg);
    background-color: var(---c-a2);

    border-radius: 100%;
    padding: 1em;

    text-align: center;
    width: min-content;
    aspect-ratio: 1/1;

    display: flex;
    justify-content: center;
    align-items: center;

    user-select: none;
  }
</style>

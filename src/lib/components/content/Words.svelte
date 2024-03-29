<script>
  import { me } from '$lib/content';
  import { getAbsoluteRect, Throttle } from '$lib/utils';
  import matter from 'matter-js';
  import { onMount } from 'svelte';

  const { Engine, Runner, Composite, Bodies, MouseConstraint, Mouse, Body } = matter;

  let frame, wordBox, engine, runner;
  const elements = [];

  function getBodies() {
    const box = getAbsoluteRect(wordBox);
    const bodies = [
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
    ];

    // add all balls to the list
    elements.forEach((el) => {
      const rect = getAbsoluteRect(el);
      el['physics'] = Bodies.circle(rect.cx, rect.cy, rect.radius);
      el.referencePos = rect;
      bodies.push(el['physics']);
    });

    return bodies;
  }

  const throttledReCreate = new Throttle(() => {
    Composite.clear(engine.world, false);
    Composite.add(engine.world, getBodies());
    addMouse(wordBox);
  }, 200);

  function addMouse(elem) {
    const mouse = Mouse.create(elem);

    //monkey patch...
    Mouse._getRelativeMousePosition = function (event, element, pixelRatio) {
      let touches = event.changedTouches;
      let x;
      let y;

      if (touches) {
        x = touches[0].pageX;
        y = touches[0].pageY;
      } else {
        x = event.pageX;
        y = event.pageY;
      }

      return {
        x: x,
        y: y
      };
    };

    const mc = MouseConstraint.create(engine, {
      mouse
    });
    mc.mouse.element.removeEventListener('mousewheel', mc.mouse.mousewheel);
    mc.mouse.element.removeEventListener('DOMMouseScroll', mc.mouse.mousewheel);

    Composite.add(engine.world, mc);
  }

  onMount(async () => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    engine = Engine.create({
      gravity: {
        x: 0,
        y: -1
      },
      enableSleeping: true,
      positionIterations: 4, // 6
      velocityIterations: 3, // 4
      costraintIterations: 2 // 2
    });

    runner = Runner.create();
    // runner.delta = 8;
    // runner.isFixed = true;

    throttledReCreate.exec();

    Runner.run(runner, engine);

    function loop() {
      frame = requestAnimationFrame(loop);
      Engine.update(engine);

      if (elements.length && elements[0]?.physics) {
        elements.forEach((el) => {
          const { x, y } = el.physics.position;
          const { referencePos: rp } = el;

          el.style.opacity = 1;
          el.style.transform = `translate(${x - (rp.left + rp.radius)}px, ${
            y - (rp.top + rp.radius)
          }px) rotate(${el.physics.angle}rad)`;
        });
      }
    }
    frame = requestAnimationFrame(loop);

    const checkEscapee = setInterval(() => {
      if (elements.length && elements[0]?.physics) {
        const rect = getAbsoluteRect(wordBox);
        elements.forEach((el) => {
          const { x, y } = el.physics.position;

          if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
            const { cx, cy } = el.referencePos;
            Body.setPosition(el.physics, { x: cx, y: cy });
            Body.setVelocity(el.physics, { x: 0, y: 0 });
          }
        });
      }
    }, 1000);

    return () => {
      Runner.stop(runner);
      Composite.clear(engine.world, false);
      cancelAnimationFrame(frame);
      clearInterval(checkEscapee);
      throttledReCreate.clear();
    };
  });
</script>

<svelte:window
  on:resize={() => {
    if (!engine) return;
    elements.forEach((el) => {
      el.physics = null;
      el.style.transform = null;
      el.style.opacity = 0;
    });
    throttledReCreate.call();
  }}
/>

<section>
  <h2>Some words I know</h2>
  <ul bind:this={wordBox}>
    {#each me.keywords.sort((a, b) => b.length - a.length) as word, i}
      <li
        bind:this={elements[i]}
        on:pointerdown={() => {
          Body.setAngle(elements[i].physics, 0);
        }}
      >
        {word}
      </li>
    {/each}
  </ul>
</section>

<style>
  ul {
    margin: 0.9rem 0;
    padding: 5px;
    border: 2px dashed var(---c-a2);

    overflow: hidden;

    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-wrap: wrap;

    min-height: 200px;

    font-size: calc(1vmin + 0.4rem);
  }

  li {
    border-radius: 100%;
    padding: 1em;

    text-align: center;
    letter-spacing: 0.12em;
    font-weight: bold;

    width: min-content;
    aspect-ratio: 1/1;

    display: flex;
    justify-content: center;
    align-items: center;

    user-select: none;
    cursor: grab;

    transition:
      transform 0.05s,
      background-color 0.2s;

    background-color: var(---c-b1);
    color: var(---c-bg);
  }

  li:hover {
    background-color: var(---c-b2);
  }
  li:active {
    cursor: grabbing;
  }
</style>

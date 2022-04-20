<script>
  import { Throttle } from '$lib/utils';
  import { onMount } from 'svelte';
  import {
    Color,
    IcosahedronGeometry,
    MeshPhongMaterial,
    FrontSide,
    Mesh,
    WebGLRenderer,
    PerspectiveCamera,
    Scene,
    HemisphereLight,
    PointLight
  } from 'three';

  export let activated = false;

  let innerHeight, innerWidth, _canvas, throttledResize;
  let fx = 0; //-1 to 1
  let fy = 0; //-1 to 1
  let activePointer = false;

  const inactivate = new Throttle(() => {
    activePointer = false;
  }, 100);

  function getColors(elem, attr) {
    return getComputedStyle(elem).getPropertyValue(attr);
  }

  function getCanvasElementColorsHex(suffix) {
    return new Color(getColors(_canvas, '---c-' + suffix)).getHex();
  }

  onMount(() => {
    throttledResize = new Throttle(() => {
      camera.aspect = innerWidth / innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(innerWidth, innerHeight);
    }, 200);

    const fov = 70;
    const aspect = innerWidth / innerHeight;
    const near = 0.1;
    const far = 1000;

    //  ---------------------------------------------------------------
    const geometry = new IcosahedronGeometry(1, 1);

    const material = new MeshPhongMaterial({
      color: getCanvasElementColorsHex('bg'),
      side: FrontSide,
      flatShading: true
    });

    const mesh = new Mesh(geometry, material);
    mesh.position.y = -0.8;
    mesh.position.z = -3;

    //  ---------------------------------------------------------------
    const renderer = new WebGLRenderer({ antialias: true, canvas: _canvas, alpha: true });
    renderer.setSize(innerWidth, innerHeight);

    const camera = new PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 0.1;

    const scene = new Scene();
    scene.add(mesh);
    //  ---------------lights------------------------------------------------

    const light = new HemisphereLight(0xffffff, 0x888888);
    light.position.set(0, 1, 0.1);
    scene.add(light);

    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      renderer.render(scene, camera);
    } else {
      renderer.setAnimationLoop(animation);
    }

    function animation(time) {
      mesh.rotation.x = time / 8000 + fy;
      mesh.rotation.y = time / 8000 + fx;
      mesh.rotation.z = time / 8000;

      renderer.render(scene, camera);
    }

    const handleMMThemeChange = (ev) => {
      material.color.setHex(getCanvasElementColorsHex('bg'));
    };
    const mmTheme = matchMedia('(prefers-color-scheme: dark)');
    mmTheme.addEventListener('change', handleMMThemeChange);

    return () => {
      mmTheme.removeEventListener('change', handleMMThemeChange);
      inactivate.cancel();
      throttledResize.cancel();
      renderer.dispose();
    };
  });
</script>

<svelte:window
  bind:innerWidth
  bind:innerHeight
  on:resize={() => {
    throttledResize.exec();
  }}
  on:mousemove={(ev) => {
    fx = (ev.clientX - innerWidth / 2) / (innerWidth / 2);
    fy = (ev.clientY - innerHeight / 2) / (innerHeight / 2);
    activePointer = true;
    inactivate.exec();
  }}
/>
<canvas class:activePointer bind:this={_canvas}>
  <p>animated 3d figure, Icosahedron</p>
</canvas>

<style>
  canvas {
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: -1;
    top: 0;
    left: 0;
  }
</style>

<script>
  import { Throttle } from '$lib/utils';
  import { onMount } from 'svelte';
  import {
    Color,
    IcosahedronGeometry,
    MeshBasicMaterial,
    FrontSide,
    Mesh,
    WebGLRenderer,
    PerspectiveCamera,
    Scene
  } from 'three';

  let innerHeight,
    innerWidth,
    _canvas,
    throttledResize,
    x = 0,
    y = 0,
    isActive = false;

  const inactivate = new Throttle(() => {
    isActive = false;
  }, 100);

  function getColors(elem, attr) {
    return getComputedStyle(elem).getPropertyValue(attr);
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
    const far = 2.55;

    //  ---------------------------------------------------------------
    const geometry = new IcosahedronGeometry(1, 1);

    const material = new MeshBasicMaterial({
      side: FrontSide,
      color: new Color(getColors(_canvas, 'color')).getHex(),
      wireframe: true
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

    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      renderer.render(scene, camera);
    } else {
      renderer.setAnimationLoop(animation);
    }

    function animation(time) {
      const xOffset = y * Math.PI;
      const yOffset = -x * Math.PI;

      mesh.rotation.x = time / 8000 + xOffset;
      mesh.rotation.y = time / 8000 + yOffset;
      mesh.rotation.z = time / 8000;

      renderer.render(scene, camera);
    }

    return () => {
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
  on:mousemove={(e) => {
    x = (e.clientX - innerWidth / 2) / (innerWidth / 2);
    y = (e.clientY - innerHeight / 2) / (innerHeight / 2);
    isActive = true;
    inactivate.exec();
  }}
/>

<canvas class:isActive bind:this={_canvas}>
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
    opacity: 0.35;
    transition: opacity 0.5s ease-in-out;
  }

  .isActive {
    opacity: 0.6;
  }
</style>

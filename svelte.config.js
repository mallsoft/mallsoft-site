import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';

const dev = process.env.NODE_ENV === 'development';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: preprocess(),
  kit: {
    prerender: {
      default: true
    },
    adapter: adapter(),
    paths: {
      base: dev ? '' : '/mallsoft-site'
    }
  }
};

export default config;

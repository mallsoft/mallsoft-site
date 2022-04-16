import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: preprocess(),
  kit: {
    prerender: {
      default: true
    },
    adapter: adapter({
      fallback: null,
      precompress: true
    }),
    paths: {
      base: process.env.NODE_ENV === 'development' ? '' : '/mallsoft-site'
    }
  }
};

export default config;

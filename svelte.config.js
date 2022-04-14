import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';

const dev = process.env.NODE_ENV === 'development';
const reponame = 'mallsoft-site';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: preprocess(),
  kit: {
    prerender: {
      default: true
    },
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: null,
      precompress: true
    }),
    paths: {
      base: dev ? '' : '/' + reponame
    }
  }
};

export default config;

import { defineConfig } from 'astro/config';

// User site: served from the domain root, so no `base` is needed.
export default defineConfig({
  site: 'https://ibaidoronoz.github.io',
  vite: {
    build: {
      // Never ship source maps: everything in dist/ is public.
      sourcemap: false,
    },
  },
});

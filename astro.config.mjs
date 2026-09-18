import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://aerovectorengineering.com',
  // TODO: interim deploy target is https://blindsleeper.github.io/aero-vector-site/
  // (GitHub Pages project-site subpath). Remove this `base` once the custom domain
  // aerovectorengineering.com is live and GitHub Pages is serving from the repo root.
  base: '/aero-vector-site/',
  output: 'static',
  integrations: [sitemap()],
});

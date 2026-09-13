import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

export default defineConfig({
  site: 'https://allanfeidplumbing.com',
  output: 'static',
  adapter: vercel(),
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [sitemap({ filter: (page) => !page.includes('/contact/thanks') && !page.includes('/api/') })],
});

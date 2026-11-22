// @ts-check
import { defineConfig } from 'astro/config';

import preact from '@astrojs/preact';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

import node from '@astrojs/node';
import vercel from '@astrojs/vercel';

const isVercel = Boolean(process.env.VERCEL);

// https://astro.build/config
export default defineConfig({
  site: 'https://kinbosoft.com',
  output: 'server',
  compressHTML: true,
  security: {
    checkOrigin: false
  },
  integrations: [
    preact(),
    mdx(),
    sitemap({
      filter: (page) =>
        !page.includes('/admin') &&
        !page.includes('/api/') &&
        !page.includes('/apply'),
    }),
  ],

  vite: {
    plugins: [tailwindcss()]
  },

  adapter: isVercel ? vercel() : node({ mode: 'standalone' })
});

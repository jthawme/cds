import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';
import svg from '@poppanator/sveltekit-svg';
import FaviconManifest from 'vite-favicon-manifest';
import DataPlugin from 'sveltekit-data-plugin';
import { enhancedImages } from '@sveltejs/enhanced-img';

export default defineConfig({
	plugins: [
		DataPlugin(enhancedImages()),

		sveltekit(),

		svg({
			includePaths: ['./src/lib/svg/'],
			svgoOptions: {
				multipass: true,
				plugins: [
					{
						name: 'preset-default',
						// by default svgo removes the viewBox which prevents svg icons from scaling
						// not a good idea! https://github.com/svg/svgo/pull/1461
						params: { overrides: { removeViewBox: false } }
					},
					{
						name: 'convertColors',
						params: {
							currentColor: true
						}
					},
					{ name: 'removeAttrs', params: { attrs: 'svg(width|height)' } }
				]
			}
		}),

		FaviconManifest({
			manifest: {
				name: 'Site Template'
			}
		})
	],
	css: {
		preprocessorOptions: {
			scss: {
				api: 'modern',
				additionalData: `@use '$lib/styles/parts/mixins' as *;`
			}
		}
	}
});

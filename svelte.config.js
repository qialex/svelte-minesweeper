import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: undefined,
			precompress: false,
			strict: true
		}),
		prerender: {
			handleHttpError: ({ path, message }) => {
				// Ignore storybook links - it's built separately and combined in CI
				if (path.includes('storybook')) {
					return;
				}
				throw new Error(message);
			}
		}
	},
	compilerOptions: { experimental: { async: true } }
};

export default config;
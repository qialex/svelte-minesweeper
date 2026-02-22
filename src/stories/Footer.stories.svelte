<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Footer from '$lib/Footer.svelte';

	const { Story } = defineMeta({
		title: 'UI/Footer',
		component: Footer,
		tags: ['autodocs'],
		parameters: {
			docs: {
				description: {
					component: 'Footer with social links (GitHub, LinkedIn) and Storybook documentation link.'
				}
			}
		},
		argTypes: {
			githubUrl: { control: 'text', description: 'GitHub repository URL' },
			linkedinUrl: { control: 'text', description: 'LinkedIn profile URL' },
			storybookUrl: { control: 'text', description: 'Storybook documentation URL' }
		}
	});
</script>

<Story name="Default" args={{}} />

<Story name="Custom URLs" args={{
	githubUrl: 'https://github.com/example/repo',
	linkedinUrl: 'https://linkedin.com/in/example',
	storybookUrl: '/docs'
}} />

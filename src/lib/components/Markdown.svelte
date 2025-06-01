<script>
	// @ts-nocheck

	import SvelteMarkdown from 'svelte-markdown';
	import { marked } from 'marked';

	/** @type {{content: string, inline?: boolean}} */
	let { content, inline } = $props();

	/** @type {import('marked').TokenizerAndRendererExtension} */
	// const logoTokenizer = {
	// 	name: 'chord',
	// 	level: 'inline',
	// 	start(src) {
	// 		return src.match(/\[lw12\]/i)?.index;
	// 	},
	// 	tokenizer(src, tokens) {
	// 		const rule = new RegExp(/\[lw12\]/, 'i');
	// 		const match = rule.exec(src);

	// 		if (match) {
	// 			return {
	// 				type: 'logo',
	// 				raw: match[0]
	// 			};
	// 		}
	// 	}
	// };

	// marked.use({
	// 	extensions: [logoTokenizer]
	// });

	const options = { ...marked.defaults, breaks: !inline, mangle: false };
</script>

<!-- <SvelteMarkdown
	renderers={{
		logo: InlineLogo
	}}
	{options}
	source={content}
	isInline={inline}
/> -->
<SvelteMarkdown {options} source={content} isInline={inline} />

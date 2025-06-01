<script>
	import 'normalize.css';
	import '$lib/styles/global.scss';

	import { setContext } from 'svelte';
	import Manager from '$lib/components/Toast/Manager.svelte';

	/** @type {{ data: import('./$types').LayoutData, children: import('svelte').Snippet }} */
	let { data, children } = $props();

	setContext('site', {
		title: 'CDs',
		description: 'These are my cds, I love them very much, more than I love you',
		url: 'https://cds.jthaw.club',
		seperator: '–'
	});
</script>

<Manager />

{@render children()}

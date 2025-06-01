<script>
	import { page } from '$app/state';
	import { getContext } from 'svelte';

	const siteTitle = getContext('site').title;
	const siteDescription = getContext('site').description;
	const siteURL = getContext('site').url;

	/** @type {{title?: string, image?: string, description?: string}} */
	let { title, description } = $props();
	// export let title = "Home | Example.com”;
	// export let description = “Description of your website.”;
	// export let image = "https://example.com/your-logo.png”;

	let fullTitle = $derived(
		[title, siteTitle].filter((item) => !!item).join(` ${getContext('site').seperator ?? '|'} `)
	);

	let fullURL = $derived([siteURL, page.url.pathname].join(''));
</script>

<svelte:head>
	<title>{fullTitle}</title>
	<meta name="description" content={description ?? siteDescription} />
	<meta property="og_site_name" content={siteTitle} />
	<meta property="og:url" content={fullURL} />
	<meta property="og:type" content="website" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description ?? siteDescription} />
	<!-- <meta property="og:image" content={image}> -->

	<meta name="twitter:card" content="summary_large_image" />
	<meta property="twitter:domain" content={siteURL} />
	<meta property="twitter:url" content={fullURL} />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description ?? siteDescription} />
	<!-- <meta name="twitter:image" content={image}> -->
</svelte:head>

<script lang="ts">
	import { onMount } from 'svelte';
	import './layout.css';
	import DemoLinks from './demo/DemoLinks.svelte';
	import { page } from '$app/state';
	import type { LayoutProps } from './$types';
	import { bindContactLinks } from '#lib/contact-modal.ts';
	import { startSmoothScroll, stopSmoothScroll } from '#lib/smooth-scroll.ts';
	import {
		absoluteUrl,
		canonicalUrl,
		defaultDescription,
		defaultTitle,
		organizationSchema,
		siteName
	} from '#lib/seo.ts';

	let { children }: LayoutProps = $props();

	const showDemos = $derived(page.url.pathname.startsWith('/demo'));
	const canonical = $derived(canonicalUrl(page.url));
	const image = $derived(absoluteUrl(page.url, '/logo/zentaris-icon-teal-512.png'));
	const robots = $derived(showDemos ? 'noindex, nofollow' : 'index, follow');
	const orgJson = $derived(JSON.stringify(organizationSchema(page.url)));

	onMount(() => {
		const unbindContact = bindContactLinks();
		startSmoothScroll();
		return () => {
			unbindContact();
			stopSmoothScroll();
		};
	});
</script>

<svelte:head>
	<title>{defaultTitle}</title>
	<meta name="description" content={defaultDescription} />
	<meta name="robots" content={robots} />
	<meta name="author" content={siteName} />
	<link rel="canonical" href={canonical} />
	<link rel="sitemap" type="application/xml" href="/sitemap.xml" />

	<meta property="og:type" content="website" />
	<meta property="og:site_name" content={siteName} />
	<meta property="og:locale" content="en_IN" />
	<meta property="og:title" content={defaultTitle} />
	<meta property="og:description" content={defaultDescription} />
	<meta property="og:url" content={canonical} />
	<meta property="og:image" content={image} />
	<meta property="og:image:alt" content="Zentaris mark" />
	<meta property="og:image:width" content="512" />
	<meta property="og:image:height" content="512" />

	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content={defaultTitle} />
	<meta name="twitter:description" content={defaultDescription} />
	<meta name="twitter:image" content={image} />
	<meta name="twitter:image:alt" content="Zentaris mark" />

	{@html `<script type="application/ld+json">${orgJson}</script>`}
	{#if import.meta.env.DEV}
		{@html `<script>(function(){try{var t=localStorage.getItem('zentaris-theme');if(t==='light'||t==='dark')document.documentElement.setAttribute('data-theme',t)}catch(e){}})()</script>`}
	{/if}
</svelte:head>

{@render children()}
{#if showDemos}
	<DemoLinks />
{/if}

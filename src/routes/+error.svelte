<script lang="ts">
	import { page } from '$app/state';
	import { contactEmail } from '#lib/seo.ts';
	import { homeHref, homeRoot } from '#lib/home-href.ts';
	import SiteHeader from '#lib/components/home/SiteHeader.svelte';
	import SiteFooter from '#lib/components/home/SiteFooter.svelte';

	const status = $derived(page.status);
	const is404 = $derived(status === 404);
	const path = $derived(page.url.pathname);
	const title = $derived(is404 ? 'Page not found — Zentaris' : 'Something went wrong — Zentaris');
	const jumps = [
		{ hash: '#work', label: 'Work' },
		{ hash: '#services', label: 'Services' },
		{ hash: '#approach', label: 'Approach' },
		{ hash: '#faq', label: 'FAQ' }
	] as const;
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="robots" content="noindex, nofollow" />
</svelte:head>

<div class="sheet" id="top">
	<SiteHeader />
	<section class="err" aria-labelledby="err-title">
		<div class="in err-inner">
			<p class="mono label">{status}</p>
			{#if is404}
				<h1 id="err-title">This page isn't here.</h1>
				<p class="lede">
					The link may be old, or the address may have a typo. Work, services and the contact form
					are still on the home page.
				</p>
			{:else}
				<h1 id="err-title">Something went wrong on our side.</h1>
				<p class="lede">
					Try the home page, or email {contactEmail} and we'll look at it.
				</p>
			{/if}
			<div class="err-actions">
				<a class="btn btn-teal" href={homeRoot(path)}>Go home</a>
				{#if is404}
					<a class="btn btn-line" href={homeHref(path, '#contact')}>Book a call</a>
				{:else}
					<a class="btn btn-line" href="mailto:{contactEmail}">Email us</a>
				{/if}
			</div>
			<nav class="err-jump" aria-label="Try these instead">
				{#each jumps as jump}
					<a href={homeHref(path, jump.hash)}>{jump.label}</a>
				{/each}
			</nav>
		</div>
	</section>
	<SiteFooter />
</div>

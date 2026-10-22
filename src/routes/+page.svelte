<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import { enhanceHeroLab } from '#lib/hero-lab/enhance.ts';
	import { faqSchema, websiteSchema } from '#lib/seo.ts';
	import SiteHeader from '#lib/components/home/SiteHeader.svelte';
	import Hero from '#lib/components/home/Hero.svelte';
	import Problem from '#lib/components/home/Problem.svelte';
	import WhatWeDo from '#lib/components/home/WhatWeDo.svelte';
	import Services from '#lib/components/home/Services.svelte';
	import HowWeThink from '#lib/components/home/HowWeThink.svelte';
	import Approach from '#lib/components/home/Approach.svelte';
	import Process from '#lib/components/home/Process.svelte';
	import Work from '#lib/components/home/Work.svelte';
	import About from '#lib/components/home/About.svelte';
	import Faq from '#lib/components/home/Faq.svelte';
	import Contact from '#lib/components/home/Contact.svelte';
	import SiteFooter from '#lib/components/home/SiteFooter.svelte';

	onMount(() => enhanceHeroLab());

	const extraJson = $derived(
		JSON.stringify([websiteSchema(page.url), faqSchema()])
	);
</script>

<svelte:head>
	{@html `<script type="application/ld+json">${extraJson}</script>`}
</svelte:head>

<div class="sheet" id="top">
	<SiteHeader />
	<Hero />
	<Problem />
	<WhatWeDo />
	<Services />
	<HowWeThink />
	<Approach />
	<Process />
	<Work />
	<About />
	<Faq />
	<Contact />
	<SiteFooter />
</div>

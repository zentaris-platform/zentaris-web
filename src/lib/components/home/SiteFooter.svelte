<script lang="ts">
	import { page } from '$app/state';
	import { city, contactEmail, contactPhone, contactPhoneHref, linkedInUrl } from '#lib/seo.ts';
	import { homeHref, homeRoot } from '#lib/home-href.ts';
	import LogoMark from './LogoMark.svelte';
	import FooterMark from './illustrations/FooterMark.svelte';

	const path = $derived(page.url.pathname);
</script>

<footer class="zf">
	<div class="in zf-top">
		<div class="zf-brand">
			<a class="logo" href={homeRoot(path)} aria-label="Zentaris home">
				<LogoMark />
				<span>ZENTARIS</span>
			</a>
			<p>
				One team for the software you run on, the brand people remember and the attention that
				brings them in.
			</p>
			<a class="zf-cta" href={homeHref(path, '#contact')}>
				Book a free 30-minute call <span aria-hidden="true">→</span>
			</a>
		</div>
		<nav class="zf-col" aria-label="Explore">
			<p class="mono">Explore</p>
			<a href={homeHref(path, '#services')}>Services</a>
			<a href={homeHref(path, '#approach')}>Approach</a>
			<a href={homeHref(path, '#process')}>Process</a>
			<a href={homeHref(path, '#stack')}>Stack</a>
			<a href={homeHref(path, '#work')}>Work</a>
			<a href={homeHref(path, '#faq')}>FAQ</a>
		</nav>
		<nav class="zf-col" aria-label="Services">
			<p class="mono">Services</p>
			<a href={homeHref(path, '#enterprise')}>Tech solutions</a>
			<a href={homeHref(path, '#marketing')}>Digital marketing</a>
			<a href={homeHref(path, '#branding')}>Branding</a>
		</nav>
		<div class="zf-col">
			<p class="mono">Connect</p>
			<a href={homeHref(path, '#contact')}>Start a project</a>
			<a href="mailto:{contactEmail}">{contactEmail}</a>
			<a href={contactPhoneHref}>{contactPhone}</a>
			<a href={linkedInUrl} target="_blank" rel="noopener noreferrer">LinkedIn</a>
			<span>Based in {city}, working worldwide</span>
		</div>
	</div>
	<div class="zf-mark" aria-hidden="true">
		<FooterMark />
	</div>
	<div class="in zf-legal">
		<span>© 2026 Zentaris</span>
		<span class="zf-links">
			<a href={homeRoot(path)}>Privacy</a>
			<a href={homeRoot(path)}>Terms</a>
			<a href={homeRoot(path)}>Back to top ↑</a>
		</span>
	</div>
</footer>

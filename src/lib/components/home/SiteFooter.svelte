<script lang="ts">
	import { city, contactEmail, linkedInUrl } from '#lib/seo.ts';
	import LogoMark from './LogoMark.svelte';
	import FooterMark from './illustrations/FooterMark.svelte';
</script>

<footer class="zf">
	<div class="in zf-top">
		<div class="zf-brand">
			<a class="logo" href="#top" aria-label="Zentaris home">
				<LogoMark />
				<span>ZENTARIS</span>
			</a>
			<p>
				One team for the software you run on, the brand people remember and the attention that
				brings them in.
			</p>
			<a class="zf-cta" href="#contact">Book a free 30-minute call <span aria-hidden="true">→</span></a>
		</div>
		<nav class="zf-col" aria-label="Explore">
			<p class="mono">Explore</p>
			<a href="#services">Services</a>
			<a href="#approach">Approach</a>
			<a href="#process">Process</a>
			<a href="#work">Work</a>
			<a href="#faq">FAQ</a>
		</nav>
		<nav class="zf-col" aria-label="Services">
			<p class="mono">Services</p>
			<a href="#build">Tech solutions</a>
			<a href="#market">Digital marketing</a>
			<a href="#brand">Branding</a>
		</nav>
		<div class="zf-col">
			<p class="mono">Connect</p>
			<a href="#contact">Start a project</a>
			<a href="mailto:{contactEmail}">{contactEmail}</a>
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
			<a href="#top">Privacy</a>
			<a href="#top">Terms</a>
			<a href="#top">Back to top ↑</a>
		</span>
	</div>
</footer>

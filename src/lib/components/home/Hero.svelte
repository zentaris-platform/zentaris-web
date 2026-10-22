<script lang="ts">
	import HeroStack from './illustrations/HeroStack.svelte';
</script>

<section class="hero hero-x hero-grid">
	<div class="hg-bg" aria-hidden="true">
		<svg class="hg-svg hg-base"></svg>
		<svg class="hg-svg hg-spot"></svg>
	</div>
	<div class="in hx-grid">
		<div class="hx-copy">
			<p class="mono label">Software · Brand · Attention</p>
			<h1>Three sides. <span class="h1-2">One team.</span></h1>
			<p class="sub">
				Your software, your brand and the attention that brings customers in, planned and built
				together.
			</p>
			<div class="cta">
				<a class="btn btn-teal" href="#contact">Book a free 30-minute call</a>
				<a class="btn btn-line" href="#services">See what we build</a>
			</div>
			<p class="hx-note">A clear next step from every call, even if it isn't us.</p>
		</div>
		<div class="hero-art hx-art">
			<HeroStack />
		</div>
	</div>
</section>

<script lang="ts">
	import { city, contactEmail } from '#lib/seo.ts';
</script>

<section id="contact" class="ruled">
	<div class="in contact contact-close">
		<div>
			<p class="mono label">Contact</p>
			<h2>Tell us what you're building</h2>
			<p class="sub">
				Book a free 30-minute call. You'll leave with clear next steps, whether or not you work with
				us.
			</p>
			<div class="lines">
				<div>
					<span>Email</span>
					<a href="mailto:{contactEmail}">{contactEmail}</a>
				</div>
				<div><span>Based in</span>{city}, India</div>
			</div>
			<a class="btn btn-teal contact-open" href="#contact">Request a call</a>
		</div>
	</div>
</section>

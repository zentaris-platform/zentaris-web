<script lang="ts">
	import { city, contactEmail } from '#lib/seo.ts';
</script>

<section id="contact" class="ruled">
	<div class="in contact">
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
		</div>
		<form id="contact-form" novalidate>
			<div class="two">
				<div class="field">
					<label for="f-name">Name</label>
					<input id="f-name" autocomplete="name" />
				</div>
				<div class="field">
					<label for="f-email">Email</label>
					<input id="f-email" type="email" autocomplete="email" />
				</div>
			</div>
			<div class="field">
				<label for="f-service">What do you need?</label>
				<select id="f-service">
					<option>A new website</option>
					<option>Digital marketing</option>
					<option>Branding / logo</option>
					<option>All three</option>
					<option>Not sure yet</option>
				</select>
			</div>
			<div class="field">
				<label for="f-msg">About your business</label>
				<textarea id="f-msg"></textarea>
			</div>
			<button class="btn btn-teal" type="submit" style="justify-self:start">Request a call</button>
			<p class="note" id="form-note">We reply within one working day.</p>
		</form>
	</div>
</section>

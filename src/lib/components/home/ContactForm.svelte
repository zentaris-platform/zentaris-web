<form
	id="contact-form"
	class="cf"
	name="enquiries"
	method="POST"
	action="/"
	data-netlify="true"
	data-netlify-honeypot="bot-field"
	novalidate
>
	<input type="hidden" name="form-name" value="enquiries" />
	<p class="hp">
		<label>Leave blank <input name="bot-field" tabindex="-1" autocomplete="off" /></label>
	</p>
	<div class="cf-grid">
		<label class="cf-field" for="f-name">
			<span>Name</span>
			<input id="f-name" name="name" autocomplete="name" placeholder="Your name" />
		</label>
		<label class="cf-field" for="f-email">
			<span>Email</span>
			<input
				id="f-email"
				name="email"
				type="email"
				autocomplete="email"
				placeholder="Email address"
			/>
		</label>
	</div>
	<label class="cf-field" for="f-service">
		<span>What do you need?</span>
		<select id="f-service" name="service">
			<option>A new website</option>
			<option>Digital marketing</option>
			<option>Branding / logo</option>
			<option>All three</option>
			<option>Not sure yet</option>
		</select>
	</label>
	<label class="cf-field cf-msg" for="f-msg">
		<span>About your business</span>
		<textarea id="f-msg" name="message" placeholder="What are you building?"></textarea>
	</label>
	<button class="btn btn-teal cf-go" type="submit">Request a call</button>
	<p class="note" id="form-note" aria-live="polite">We reply within one working day.</p>
</form>

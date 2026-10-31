<script lang="ts">
	import { onMount } from 'svelte';

	const services = [
		{
			title: 'Marketing & Brand Growth',
			detail:
				'Brand Strategy & Identity · Landing Page Design & Development · Google & Meta Ads · Lead Generation · Marketing Automation · Social Media Marketing · SEO'
		},
		{
			title: 'Fintech & Payment Solutions',
			detail:
				'Payment gateway integration · Payment infrastructure · Fintech product development · Enterprise fintech solutions'
		},
		{
			title: 'Enterprise Technology',
			detail:
				'Enterprise software · Web applications · Mobile applications · API development & integration'
		},
		{
			title: 'Emerging Technologies',
			detail: 'Blockchain development · Smart contracts · Web3 applications · Blockchain integration'
		},
		{
			title: 'Technology Consulting',
			detail:
				'IT project consulting · Technical architecture · Digital transformation · Technology strategy'
		}
	] as const;

	let open = $state(false);
	let picked = $state<string[]>([]);
	let root: HTMLElement | undefined;

	const emptyLabel = 'Select one or more areas';
	const summary = $derived(
		picked.length === 0
			? emptyLabel
			: picked.length === 1
				? picked[0]
				: `${picked[0]} +${picked.length - 1} more`
	);

	function toggle(value: string, checked: boolean) {
		picked = checked ? [...picked, value] : picked.filter((item) => item !== value);
		root?.classList.remove('is-error');
	}

	function onReset() {
		picked = [];
		open = false;
	}

	onMount(() => {
		function onDocClick(event: MouseEvent) {
			if (!open || !root) return;
			if (!root.contains(event.target as Node)) open = false;
		}
		function onKey(event: KeyboardEvent) {
			if (event.key === 'Escape' && open) open = false;
		}
		document.addEventListener('click', onDocClick);
		document.addEventListener('keydown', onKey);
		return () => {
			document.removeEventListener('click', onDocClick);
			document.removeEventListener('keydown', onKey);
		};
	});
</script>

<form
	id="contact-form"
	class="cf"
	name="enquiries"
	method="POST"
	action="/"
	data-netlify="true"
	data-netlify-honeypot="bot-field"
	novalidate
	onreset={onReset}
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
	<div class="dd" id="dd-services" bind:this={root}>
		<span class="dd-label" id="dd-lab">What are you looking to build?</span>
		<button
			type="button"
			class="dd-trigger"
			aria-haspopup="true"
			aria-expanded={open}
			aria-controls="dd-panel"
			aria-labelledby="dd-lab dd-value"
			onclick={() => (open = !open)}
		>
			<span class="dd-value" id="dd-value" class:is-empty={!picked.length} data-empty={emptyLabel}>
				{summary}
			</span>
			<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6" /></svg>
		</button>
		<fieldset class="dd-panel" id="dd-panel" hidden={!open}>
			<legend class="dd-sr">Services</legend>
			<p class="dd-hint">Select one or more areas where you need our expertise.</p>
			{#each services as item}
				<label class="dd-opt">
					<input
						type="checkbox"
						name="services"
						value={item.title}
						checked={picked.includes(item.title)}
						onchange={(event) => toggle(item.title, event.currentTarget.checked)}
					/>
					<span class="dd-txt">
						<b>{item.title}</b>
						<span>{item.detail}</span>
					</span>
					<i class="dd-check" aria-hidden="true"></i>
				</label>
			{/each}
			<div class="dd-foot">
				<span class="dd-count mono">{picked.length} selected</span>
				<button type="button" class="dd-done" onclick={() => (open = false)}>Done</button>
			</div>
		</fieldset>
	</div>
	<label class="cf-field cf-msg" for="f-msg">
		<span>Something else in mind?</span>
		<textarea
			id="f-msg"
			name="message"
			placeholder="Tell us briefly what you are looking for..."
		></textarea>
	</label>
	<button class="btn btn-teal cf-go" type="submit">Request a call</button>
	<p class="note" id="form-note" aria-live="polite">We reply within one working day.</p>
</form>

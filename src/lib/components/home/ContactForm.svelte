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

	const stages = [
		{
			title: 'I have an idea',
			detail: 'Looking to turn an idea into reality.'
		},
		{
			title: "I'm starting a business",
			detail: 'Need a website, brand, or digital presence.'
		},
		{
			title: "I'm growing a business",
			detail: 'Looking to expand with technology and marketing.'
		},
		{
			title: "I'm an established enterprise",
			detail: 'Need complex technology and strategic solutions.'
		}
	] as const;

	let open = $state(false);
	let stageOpen = $state(false);
	let picked = $state<string[]>([]);
	let stage = $state('');
	let root: HTMLElement | undefined;
	let stageRoot: HTMLElement | undefined;

	const emptyLabel = 'Select one or more areas';
	const emptyStage = 'Select a stage';
	const summary = $derived(
		picked.length === 0
			? emptyLabel
			: picked.length === 1
				? picked[0]
				: `${picked[0]} +${picked.length - 1} more`
	);
	const stageSummary = $derived(stage || emptyStage);

	function toggle(value: string, checked: boolean) {
		picked = checked ? [...picked, value] : picked.filter((item) => item !== value);
		root?.classList.remove('is-error');
	}

	function pickStage(value: string) {
		stage = value;
		stageOpen = false;
	}

	function toggleServices() {
		open = !open;
		if (open) stageOpen = false;
	}

	function toggleStage() {
		stageOpen = !stageOpen;
		if (stageOpen) open = false;
	}

	function onReset() {
		picked = [];
		stage = '';
		open = false;
		stageOpen = false;
	}

	onMount(() => {
		function onDocClick(event: MouseEvent) {
			const target = event.target as Node;
			if (open && root && !root.contains(target)) open = false;
			if (stageOpen && stageRoot && !stageRoot.contains(target)) stageOpen = false;
		}
		function onKey(event: KeyboardEvent) {
			if (event.key !== 'Escape') return;
			if (open) open = false;
			if (stageOpen) stageOpen = false;
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
			onclick={toggleServices}
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
	<div class="dd" id="dd-stage" bind:this={stageRoot}>
		<span class="dd-label" id="dd-stage-lab">What stage are you at?</span>
		<button
			type="button"
			class="dd-trigger"
			aria-haspopup="true"
			aria-expanded={stageOpen}
			aria-controls="dd-stage-panel"
			aria-labelledby="dd-stage-lab dd-stage-value"
			onclick={toggleStage}
		>
			<span
				class="dd-value"
				id="dd-stage-value"
				class:is-empty={!stage}
				data-empty={emptyStage}
			>
				{stageSummary}
			</span>
			<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6" /></svg>
		</button>
		<fieldset class="dd-panel" id="dd-stage-panel" hidden={!stageOpen}>
			<legend class="dd-sr">Stage</legend>
			<p class="dd-hint">Tell us a little about your project.</p>
			{#each stages as item}
				<label class="dd-opt">
					<input
						type="radio"
						name="stage"
						value={item.title}
						checked={stage === item.title}
						onchange={() => pickStage(item.title)}
					/>
					<span class="dd-txt">
						<b>{item.title}</b>
						<span>{item.detail}</span>
					</span>
					<i class="dd-check" aria-hidden="true"></i>
				</label>
			{/each}
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

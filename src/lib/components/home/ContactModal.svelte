<script lang="ts">
	import { onMount } from 'svelte';
	import ContactForm from './ContactForm.svelte';
	import { onContactDialogClosed, registerContactDialog } from '#lib/contact-modal.ts';

	let node: HTMLDialogElement;

	onMount(() => {
		registerContactDialog(node);
		function onBackdrop(event: MouseEvent) {
			if (event.target === node) node.close();
		}
		node.addEventListener('click', onBackdrop);
		return () => {
			node.removeEventListener('click', onBackdrop);
			registerContactDialog(null);
		};
	});
</script>

<dialog
	bind:this={node}
	class="cf-modal"
	aria-labelledby="cf-modal-h"
	onclose={onContactDialogClosed}
>
	<div class="cf-modal-top">
		<div>
			<p class="mono label">Contact</p>
			<h2 id="cf-modal-h">Tell us what you're building</h2>
		</div>
		<button class="cf-modal-x" type="button" aria-label="Close" onclick={() => node?.close()}>
			<span aria-hidden="true">+</span>
		</button>
	</div>
	<p class="cf-modal-sub">
		Book a free 30-minute call. You'll leave with clear next steps, whether or not you work with us.
	</p>
	<ContactForm />
</dialog>

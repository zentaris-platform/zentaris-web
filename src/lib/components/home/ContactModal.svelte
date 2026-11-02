<script lang="ts">
	import { onMount } from 'svelte';
	import ContactForm from './ContactForm.svelte';
	import { onContactDialogClosed, registerContactDialog } from '#lib/contact-modal.ts';

	let node: HTMLDialogElement;

	const edge = 24;

	function fitModal() {
		if (!node?.open) {
			if (node) node.style.transform = '';
			return;
		}
		node.style.transform = 'none';
		const needed = node.offsetHeight;
		const available = window.innerHeight - edge;
		if (needed <= 0 || available <= 0) return;
		const scale = Math.min(1, available / needed);
		node.style.transform = scale < 0.999 ? `scale(${scale})` : '';
	}

	onMount(() => {
		registerContactDialog(node);
		function onBackdrop(event: MouseEvent) {
			if (event.target === node) node.close();
		}
		function onToggle() {
			requestAnimationFrame(fitModal);
		}
		node.addEventListener('click', onBackdrop);
		node.addEventListener('toggle', onToggle);
		window.addEventListener('resize', fitModal);
		window.visualViewport?.addEventListener('resize', fitModal);
		return () => {
			node.removeEventListener('click', onBackdrop);
			node.removeEventListener('toggle', onToggle);
			window.removeEventListener('resize', fitModal);
			window.visualViewport?.removeEventListener('resize', fitModal);
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

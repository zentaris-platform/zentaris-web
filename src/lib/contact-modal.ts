import { getLenis } from './smooth-scroll.ts';

let dialog: HTMLDialogElement | null = null;
let pending = false;

export function registerContactDialog(el: HTMLDialogElement | null): void {
	dialog = el;
	if (el && pending) {
		pending = false;
		openContactModal();
	}
}

export function openContactModal(): void {
	if (!dialog) {
		pending = true;
		return;
	}
	if (dialog.open) return;
	dialog.showModal();
	getLenis()?.stop();
}

export function onContactDialogClosed(): void {
	getLenis()?.start();
}

export function bindContactLinks(): () => void {
	if (location.hash === '#contact') {
		history.replaceState(null, '', `${location.pathname}${location.search}`);
		pending = true;
	}

	function onClick(event: MouseEvent) {
		const target = event.target;
		if (!(target instanceof Element)) return;
		const link = target.closest('a[href="#contact"]');
		if (!link) return;
		event.preventDefault();
		event.stopImmediatePropagation();
		openContactModal();
	}

	document.addEventListener('click', onClick, true);
	return () => document.removeEventListener('click', onClick, true);
}

import { getLenis } from './smooth-scroll.ts';

let dialog: HTMLDialogElement | null = null;
let pending = false;
let locked = false;
let lockY = 0;

function isInsideDialog(target: EventTarget | null): boolean {
	return target instanceof Node && Boolean(dialog?.contains(target));
}

function onGuardScroll(event: Event): void {
	if (!dialog?.open) return;
	if (isInsideDialog(event.target)) return;
	event.preventDefault();
}

function lockPage(): void {
	if (locked) return;
	locked = true;
	lockY = window.scrollY;
	getLenis()?.stop();
	document.documentElement.classList.add('modal-lock');
	document.body.classList.add('modal-lock');
	document.body.style.position = 'fixed';
	document.body.style.top = `-${lockY}px`;
	document.body.style.left = '0';
	document.body.style.right = '0';
	document.body.style.width = '100%';
	document.addEventListener('wheel', onGuardScroll, { passive: false });
	document.addEventListener('touchmove', onGuardScroll, { passive: false });
}

function unlockPage(): void {
	if (!locked) return;
	locked = false;
	document.removeEventListener('wheel', onGuardScroll);
	document.removeEventListener('touchmove', onGuardScroll);
	document.documentElement.classList.remove('modal-lock');
	document.body.classList.remove('modal-lock');
	document.body.style.position = '';
	document.body.style.top = '';
	document.body.style.left = '';
	document.body.style.right = '';
	document.body.style.width = '';
	window.scrollTo(0, lockY);
	getLenis()?.start();
}

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
	lockPage();
}

export function onContactDialogClosed(): void {
	unlockPage();
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
	return () => {
		document.removeEventListener('click', onClick, true);
		unlockPage();
	};
}

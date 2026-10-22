import { onSmoothScroll } from './smooth-scroll.ts';

const SELECTOR = [
	'.hero h1',
	'.hero .sub',
	'.sheet section h2',
	'.wd-state h3',
	'.wd-panel h3'
].join(',');

function clamp(n: number): number {
	return n < 0 ? 0 : n > 1 ? 1 : n;
}

function wrapWords(el: HTMLElement): void {
	if (el.dataset.st === '1') return;
	const visit = (node: Node) => {
		if (node.nodeType === Node.TEXT_NODE) {
			const text = node.textContent ?? '';
			if (!text.trim()) return;
			const frag = document.createDocumentFragment();
			for (const part of text.split(/(\s+)/)) {
				if (!part || /^\s+$/.test(part)) {
					frag.appendChild(document.createTextNode(part));
					continue;
				}
				const span = document.createElement('span');
				span.className = 'st-w';
				span.textContent = part;
				frag.appendChild(span);
			}
			node.parentNode?.replaceChild(frag, node);
			return;
		}
		if (node.nodeType === Node.ELEMENT_NODE) {
			const eln = node as HTMLElement;
			if (eln.classList.contains('st-w')) return;
			[...eln.childNodes].forEach(visit);
		}
	};
	[...el.childNodes].forEach(visit);
	el.classList.add('st-line');
	el.dataset.st = '1';
}

function paint(lines: HTMLElement[]): void {
	const vh = window.innerHeight;
	const start = vh * 0.9;
	const end = vh * 0.26;
	for (const el of lines) {
		const words = el.querySelectorAll<HTMLElement>('.st-w');
		const n = words.length;
		if (!n) continue;
		const r = el.getBoundingClientRect();
		const y = r.top + Math.min(r.height * 0.35, vh * 0.22);
		const p = clamp((start - y) / (start - end));
		const span = Math.max(2.2, n * 0.18);
		words.forEach((word, i) => {
			const local = clamp((p * (n + span) - i) / span);
			word.style.setProperty('--st', local.toFixed(3));
		});
	}
}

export function enhanceScrollText(): () => void {
	if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return () => {};
	const lines = [...document.querySelectorAll<HTMLElement>(SELECTOR)];
	if (!lines.length) return () => {};
	lines.forEach(wrapWords);
	const tick = () => paint(lines);
	tick();
	const off = onSmoothScroll(tick);
	addEventListener('resize', tick, { passive: true });
	return () => {
		off();
		removeEventListener('resize', tick);
	};
}

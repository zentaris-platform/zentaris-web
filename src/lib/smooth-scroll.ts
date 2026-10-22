import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

let lenis: Lenis | null = null;

function prefersReducedMotion(): boolean {
	return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function startSmoothScroll(): Lenis | null {
	if (lenis || prefersReducedMotion()) return lenis;
	lenis = new Lenis({
		autoRaf: true,
		anchors: true,
		autoToggle: true,
		allowNestedScroll: true,
		stopInertiaOnNavigate: true
	});
	return lenis;
}

export function stopSmoothScroll(): void {
	lenis?.destroy();
	lenis = null;
}

export function getLenis(): Lenis | null {
	return lenis;
}

export function onSmoothScroll(fn: () => void): () => void {
	const offLenis = lenis?.on('scroll', fn);
	addEventListener('scroll', fn, { passive: true });
	return () => {
		offLenis?.();
		removeEventListener('scroll', fn);
	};
}

export function scrollToTarget(el: Element, instant = false): void {
	if (lenis && !instant) {
		lenis.scrollTo(el);
		return;
	}
	el.scrollIntoView({ behavior: instant ? 'auto' : 'smooth', block: 'start' });
}

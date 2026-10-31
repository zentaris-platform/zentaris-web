import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

let lenis: Lenis | null = null;
let desktopMq: MediaQueryList | null = null;

function prefersReducedMotion(): boolean {
	return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function createLenis(): Lenis {
	return new Lenis({
		autoRaf: true,
		anchors: true,
		autoToggle: true,
		allowNestedScroll: true,
		stopInertiaOnNavigate: true
	});
}

function syncLenisToViewport(): void {
	if (!desktopMq) return;
	if (desktopMq.matches && !prefersReducedMotion()) {
		if (!lenis) lenis = createLenis();
		return;
	}
	lenis?.destroy();
	lenis = null;
}

export function startSmoothScroll(): Lenis | null {
	if (prefersReducedMotion()) return null;
	desktopMq = window.matchMedia('(min-width: 761px)');
	desktopMq.addEventListener('change', syncLenisToViewport);
	syncLenisToViewport();
	return lenis;
}

export function stopSmoothScroll(): void {
	desktopMq?.removeEventListener('change', syncLenisToViewport);
	desktopMq = null;
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

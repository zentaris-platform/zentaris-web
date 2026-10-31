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
		allowNestedScroll: true,
		stopInertiaOnNavigate: true,
		overscroll: false,
		lerp: 0.18,
		wheelMultiplier: 1,
		touchMultiplier: 1.15,
		syncTouchLerp: 0.14
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
	let raf = 0;
	const tick = () => {
		raf = 0;
		fn();
	};
	const on = () => {
		if (raf) return;
		raf = requestAnimationFrame(tick);
	};
	const offLenis = lenis?.on('scroll', on);
	addEventListener('scroll', on, { passive: true });
	return () => {
		offLenis?.();
		removeEventListener('scroll', on);
		if (raf) cancelAnimationFrame(raf);
	};
}

export function scrollToTarget(el: Element, instant = false): void {
	if (lenis && !instant) {
		lenis.scrollTo(el);
		return;
	}
	el.scrollIntoView({ behavior: instant ? 'auto' : 'smooth', block: 'start' });
}

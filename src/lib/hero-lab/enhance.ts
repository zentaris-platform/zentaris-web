/** Client enhancements ported from zentaris-hero-lab/index.html */

import { openContactModal } from '../contact-modal.ts';
import { onSmoothScroll, scrollToTarget } from '../smooth-scroll.ts';
import { enhanceScrollText } from '../scroll-text.ts';

type Face = 'build' | 'market' | 'brand';
type Layer = 'launch' | 'market' | 'brand' | 'core';
type BoxEls = {
	g: SVGElement;
	left: SVGPolygonElement;
	right: SVGPolygonElement;
	top: SVGPolygonElement;
	grid: SVGPathElement;
};
type LayerState = {
	wrap: SVGElement;
	mod: HTMLElement;
	items: SVGElement[];
	body?: BoxEls;
};

declare global {
	interface Window {
		__stackSeek?: (t: number) => void;
		__stackPause?: (on: boolean) => void;
		__stackPhases?: Record<string, [number, number]>;
		__heroGridBuild?: () => void;
	}
}

function prefersReducedMotion(): boolean {
	return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function asKey<T extends string>(value: string | null, keys: readonly T[]): T | null {
	if (!value) return null;
	return (keys as readonly string[]).includes(value) ? (value as T) : null;
}

export function enhanceHeroLab() {
	(function () {
		const links = [...document.querySelectorAll<HTMLAnchorElement>('.svc-index a')];
		const panels = links
			.map((a) => {
				const href = a.getAttribute('href');
				return href ? document.querySelector(href) : null;
			})
			.filter((p): p is Element => Boolean(p));
		if (panels.length && 'IntersectionObserver' in window) {
			const io = new IntersectionObserver(
				(es) => {
					es.forEach((e) => {
						if (e.isIntersecting) {
							const i = panels.indexOf(e.target);
							links.forEach((l, j) => {
								l.classList.toggle('on', j === i);
							});
						}
					});
				},
				{ rootMargin: '-40% 0px -55% 0px' }
			);
			panels.forEach((p) => {
				io.observe(p);
			});
		}
		const form = document.getElementById('contact-form') as HTMLFormElement | null;
		if (form)
			form.addEventListener('submit', function (e) {
				e.preventDefault();
				const n = document.getElementById('form-note');
				const name = document.getElementById('f-name') as HTMLInputElement | null;
				const em = document.getElementById('f-email') as HTMLInputElement | null;
				const btn = form.querySelector<HTMLButtonElement>('button[type="submit"]');
				if (!n || !name || !em) return;
				if (!name.value.trim()) {
					n.textContent = 'Please add your name.';
					n.className = 'note';
					name.focus();
					return;
				}
				if (!/^\S+@\S+\.\S+$/.test(em.value)) {
					n.textContent = 'Please enter a valid email so we can reply.';
					n.className = 'note';
					em.focus();
					return;
				}
				const picked = form.querySelectorAll<HTMLInputElement>('input[name="services"]:checked');
				const message = document.getElementById('f-msg') as HTMLTextAreaElement | null;
				const dropdown = form.querySelector('.dd');
				if (!picked.length && !message?.value.trim()) {
					n.textContent = 'Choose an area from the dropdown, or tell us what you have in mind.';
					n.className = 'note';
					dropdown?.classList.add('is-error');
					form.querySelector<HTMLButtonElement>('.dd-trigger')?.focus();
					return;
				}
				dropdown?.classList.remove('is-error');

				const finish = (text: string, ok: boolean) => {
					n.textContent = text;
					n.className = ok ? 'note ok' : 'note';
					if (btn) {
						btn.disabled = false;
						btn.textContent = 'Request a call';
					}
				};

				if (import.meta.env.DEV) {
					finish(
						'Looks good. After deploy, Netlify will file this under Forms → enquiries.',
						true
					);
					return;
				}

				if (btn) {
					btn.disabled = true;
					btn.textContent = 'Sending…';
				}

				const body = new URLSearchParams();
				for (const [key, value] of new FormData(form).entries()) {
					body.append(key, String(value));
				}

				void fetch('/', {
					method: 'POST',
					headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
					body: body.toString()
				})
					.then((res) => {
						if (!res.ok) throw new Error('submit failed');
						form.reset();
						finish("Thanks. We'll reply within one working day.", true);
					})
					.catch(() => {
						finish("Couldn't send just now. Email growth@zentaris.in and we'll pick it up.", false);
					});
			});
	})();
	(function () {
		const svg = document.querySelector<SVGSVGElement>('.iso');
		if (!svg) return;
		const reduce = prefersReducedMotion();
		if (!reduce) {
			svg.classList.add('intro');
		}
		const faces = ['build', 'market', 'brand'] as const;
		const map: Record<Face, string> = { build: 't-build', market: 't-market', brand: 't-brand' };
		const target: Record<Face, string> = {
			build: '#enterprise',
			market: '#marketing',
			brand: '#branding'
		};
		svg.querySelectorAll<SVGGElement>('.mod').forEach((m) => {
			const n = asKey(m.getAttribute('data-name'), faces);
			const t = n ? document.getElementById(map[n]) : null;
			function on() {
				m.classList.add('on');
				if (t) t.classList.add('on');
			}
			function off() {
				m.classList.remove('on');
				if (t) t.classList.remove('on');
			}
			m.addEventListener('pointerenter', on);
			m.addEventListener('pointerleave', off);
			m.addEventListener('focus', on);
			m.addEventListener('blur', off);
			function go() {
				if (!n) return;
				const el = document.querySelector(target[n]);
				if (el) scrollToTarget(el, reduce);
			}
			m.addEventListener('click', go);
			m.addEventListener('keydown', function (e: KeyboardEvent) {
				if (e.key === 'Enter' || e.key === ' ') {
					e.preventDefault();
					go();
				}
			});
		});
		if (!reduce && window.matchMedia('(pointer: fine)').matches) {
			const hero = svg.closest('.hero') || svg;
			hero.addEventListener('pointermove', function (e) {
				const r = svg.getBoundingClientRect();
				const px = (((e as PointerEvent).clientX - r.left) / r.width - 0.5) * -14;
				const py = (((e as PointerEvent).clientY - r.top) / r.height - 0.5) * -10;
				svg.style.setProperty('--px', px.toFixed(2));
				svg.style.setProperty('--py', py.toFixed(2));
			});
			hero.addEventListener('pointerleave', function () {
				svg.style.setProperty('--px', '0');
				svg.style.setProperty('--py', '0');
			});
		}
		const msgs = ['Brand ready', 'Site launched', 'Campaign live', 'Leads +1'];
		let i = 0;
		const st = document.getElementById('status-text');
		if (st && !reduce) {
			setInterval(function () {
				i = (i + 1) % msgs.length;
				st.textContent = msgs[i];
			}, 2600);
		}
	})();
	(function () {
		const svg = document.querySelector<SVGSVGElement>('.iso');
		if (!svg) return;
		const faces = ['build', 'market', 'brand'] as const;
		const tags: Record<Face, string> = { build: 't-build', market: 't-market', brand: 't-brand' };
		const links = [...document.querySelectorAll<HTMLAnchorElement>('.hx-list a')];
		function set(name: string | null, on: boolean) {
			const n = asKey(name, faces);
			if (!n) return;
			const m = document.getElementById('m-' + n);
			const t = document.getElementById(tags[n]);
			if (m) m.classList.toggle('on', on);
			if (t) t.classList.toggle('on', on);
			links.forEach((a) => {
				if (a.getAttribute('data-mod') === n) a.classList.toggle('on', on);
			});
		}
		links.forEach((a) => {
			const n = a.getAttribute('data-mod');
			a.addEventListener('pointerenter', function () {
				set(n, true);
			});
			a.addEventListener('pointerleave', function () {
				set(n, false);
			});
			a.addEventListener('focus', function () {
				set(n, true);
			});
			a.addEventListener('blur', function () {
				set(n, false);
			});
		});
		svg.querySelectorAll('.mod').forEach((m) => {
			const n = m.getAttribute('data-name');
			m.addEventListener('pointerenter', function () {
				set(n, true);
			});
			m.addEventListener('pointerleave', function () {
				set(n, false);
			});
		});
	})();
	(function () {
		const svg = document.querySelector<SVGSVGElement>('.iso-stack');
		if (!svg) return;
		const reduce = prefersReducedMotion();
		if (!reduce) svg.classList.add('intro');
		const layers = ['core', 'brand', 'market', 'launch'] as const;
		const go: Record<Exclude<Layer, 'launch'>, string> = {
			core: '#approach',
			brand: '#branding',
			market: '#marketing'
		};
		svg.querySelectorAll<SVGGElement>('.plate').forEach((m) => {
			const n = asKey(m.getAttribute('data-name'), layers);
			const t = n ? document.getElementById('t-' + n) : null;
			function on() {
				m.classList.add('on');
				if (t) t.classList.add('on');
			}
			function off() {
				m.classList.remove('on');
				if (t) t.classList.remove('on');
			}
			m.addEventListener('pointerenter', on);
			m.addEventListener('pointerleave', off);
			m.addEventListener('focus', on);
			m.addEventListener('blur', off);
			function nav() {
				if (!n) return;
				if (n === 'launch') {
					openContactModal();
					return;
				}
				const el = document.querySelector(go[n]);
				if (el) scrollToTarget(el, reduce);
			}
			m.addEventListener('click', nav);
			m.addEventListener('keydown', function (e: KeyboardEvent) {
				if (e.key === 'Enter' || e.key === ' ') {
					e.preventDefault();
					nav();
				}
			});
		});
	})();
	(function () {
		const hero = document.querySelector<HTMLElement>('.hero-grid');
		if (!hero) return;
		const bgEl = hero.querySelector<HTMLElement>('.hg-bg');
		const baseEl = hero.querySelector<SVGElement>('.hg-base');
		const spotEl = hero.querySelector<SVGElement>('.hg-spot');
		if (!bgEl || !baseEl || !spotEl) return;
		const bg: HTMLElement = bgEl;
		const base: SVGElement = baseEl;
		const spot: SVGElement = spotEl;
		const reduce = prefersReducedMotion();
		function build() {
			const r = bg.getBoundingClientRect();
			const wide = r.width > 960;
			let hw = wide ? 58 : 40;
			let hh = hw * 0.57735;
			let Z = hh * 0.62; // true isometric cell + one step height
			let ox = r.width * (wide ? 0.72 : 0.62);
			let oy = r.height * (wide ? 0.52 : 0.86); // lattice origin = mask centre
			const st = document.querySelector<SVGSVGElement>('.iso-stack');
			const m = st?.getScreenCTM?.();
			if (st && m) {
				const pt = st.createSVGPoint();
				pt.x = 0;
				pt.y = 0;
				const q = pt.matrixTransform(m);
				ox = q.x - r.left;
				oy = q.y - r.top;
				hw = 0.8660254 * 50 * (3.2 / 3) * m.a;
				hh = hw * 0.57735;
				Z = hh * 0.62;
			} // floor cell = plate cell
			function P(i: number, j: number, z?: number): [string, string] {
				return [(ox + (i - j) * hw).toFixed(1), (oy + (i + j) * hh - (z || 0) * Z).toFixed(1)];
			}
			function L(a: [string, string], b: [string, string]) {
				return 'M' + a.join(',') + 'L' + b.join(',');
			}
			const N = Math.ceil(Math.max(r.width, r.height * 1.8) / hw) + 4;
			let d = '';
			for (let k = -N; k <= N; k++) {
				d += L(P(k, -N), P(k, N)) + L(P(-N, k), P(N, k));
			}
			let out = '<path class="fl" d="' + d + '"/>';
			// raised terraces: [i0,i1,j0,j1,height in steps]; drawn back to front
			const plats: number[][] = [];
			plats.forEach(function (p) {
				const i0 = p[0];
				const i1 = p[1];
				const j0 = p[2];
				const j1 = p[3];
				const z = p[4];
				let g = '';
				// two visible side faces (+i and +j)
				g +=
					'<path class="pf" d="M' +
					P(i1, j0, 0) +
					'L' +
					P(i1, j1, 0) +
					'L' +
					P(i1, j1, z) +
					'L' +
					P(i1, j0, z) +
					'Z"/>';
				g +=
					'<path class="pf" d="M' +
					P(i0, j1, 0) +
					'L' +
					P(i1, j1, 0) +
					'L' +
					P(i1, j1, z) +
					'L' +
					P(i0, j1, z) +
					'Z"/>';
				g +=
					'<path class="pf" d="M' +
					P(i0, j0, z) +
					'L' +
					P(i1, j0, z) +
					'L' +
					P(i1, j1, z) +
					'L' +
					P(i0, j1, z) +
					'Z"/>';
				let t = '';
				for (let i = i0 + 1; i < i1; i++) t += L(P(i, j0, z), P(i, j1, z));
				for (let j = j0 + 1; j < j1; j++) t += L(P(i0, j, z), P(i1, j, z));
				if (t) g += '<path class="pl" d="' + t + '"/>';
				out += g;
			});
			base.innerHTML = out;
			spot.innerHTML = out;
		}
		window.__heroGridBuild = build;
		build();
		addEventListener('load', build);
		let rt: ReturnType<typeof setTimeout>;
		addEventListener('resize', function () {
			clearTimeout(rt);
			rt = setTimeout(build, 150);
		});
		if (!reduce && window.matchMedia('(pointer: fine)').matches) {
			hero.addEventListener('pointermove', function (e) {
				const r = bg.getBoundingClientRect();
				spot.style.setProperty('--mx', e.clientX - r.left + 'px');
				spot.style.setProperty('--my', e.clientY - r.top + 'px');
				hero.classList.add('spot-on');
			});
			hero.addEventListener('pointerleave', function () {
				hero.classList.remove('spot-on');
			});
		}
	})();
	(function () {
		const stackEl = document.querySelector<SVGSVGElement>('.iso-stack');
		if (!stackEl) return;
		const svg: SVGSVGElement = stackEl;
		const NS = 'http://www.w3.org/2000/svg';
		const U = 50;
		const C = Math.cos(Math.PI / 6);
		const S = 0.5;
		const W = 3.2;
		const TH = 0.2;
		const GAP = 1.95;
		const CELL = W / 3;
		const LAYERS: Layer[] = ['launch', 'market', 'brand', 'core'];
		const Z: Record<Layer, number> = { launch: 0, market: GAP, brand: 2 * GAP, core: 3 * GAP };
		const TOP = 3 * GAP + TH;
		const FLAT = 2 * TH;
		function P(x: number, y: number, z: number): [number, number] {
			return [(x - y) * C * U, (x + y) * S * U - z * U];
		}
		function pts(a: [number, number][]) {
			return a
				.map(function (p) {
					return p[0].toFixed(1) + ',' + p[1].toFixed(1);
				})
				.join(' ');
		}
		function mk<K extends keyof SVGElementTagNameMap>(
			tag: K,
			cls: string,
			parent: Element,
			before?: Element | null
		): SVGElementTagNameMap[K] {
			const e = document.createElementNS(NS, tag);
			if (cls) e.setAttribute('class', cls);
			if (before) parent.insertBefore(e, before);
			else parent.appendChild(e);
			return e;
		}
		function clamp(v: number) {
			return v < 0 ? 0 : v > 1 ? 1 : v;
		}
		function seg(t: number, a: number, b: number) {
			return clamp((t - a) / (b - a));
		}
		function eio(t: number) {
			return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
		}
		function eout(t: number) {
			return 1 - Math.pow(1 - t, 3);
		}
		function gridPath(x0: number, y0: number, n: number, z: number) {
			let d = '';
			for (let k = 1; k < n; k++) {
				const a = P(x0 + k * CELL, y0, z);
				const b = P(x0 + k * CELL, y0 + n * CELL, z);
				const c = P(x0, y0 + k * CELL, z);
				const e = P(x0 + n * CELL, y0 + k * CELL, z);
				d +=
					'M' +
					a[0].toFixed(1) +
					',' +
					a[1].toFixed(1) +
					'L' +
					b[0].toFixed(1) +
					',' +
					b[1].toFixed(1) +
					'M' +
					c[0].toFixed(1) +
					',' +
					c[1].toFixed(1) +
					'L' +
					e[0].toFixed(1) +
					',' +
					e[1].toFixed(1);
			}
			return d;
		}
		function boxEls(parent: Element): BoxEls {
			const g = mk('g', 'body', parent);
			return {
				g,
				left: mk('polygon', 'e f-left hatch', g),
				right: mk('polygon', 'e f-right hatch', g),
				top: mk('polygon', 'e f-top', g),
				grid: mk('path', 'pgrid', g)
			};
		}
		function setBox(o: BoxEls, zb: number, zt: number, withGrid: boolean) {
			if (zt - zb <= 0.002) {
				o.g.style.display = 'none';
				return;
			}
			o.g.style.display = '';
			o.left.setAttribute('points', pts([P(0, W, zb), P(W, W, zb), P(W, W, zt), P(0, W, zt)]));
			o.right.setAttribute('points', pts([P(W, 0, zb), P(W, W, zb), P(W, W, zt), P(W, 0, zt)]));
			o.top.setAttribute('points', pts([P(0, 0, zt), P(W, 0, zt), P(W, W, zt), P(0, W, zt)]));
			o.grid.setAttribute('d', withGrid ? gridPath(0, 0, 3, zt) : '');
		}

		// ---- per-layer fills (split) + one column (rise / flatten)
		const L = {} as Record<Layer, LayerState>;
		LAYERS.forEach(function (n) {
			const m = document.getElementById('m-' + n);
			if (!m?.parentNode) return;
			L[n] = {
				wrap: m.parentNode as SVGElement,
				mod: m,
				items: [...m.querySelectorAll<SVGElement>('.rv')]
			};
			if (n !== 'core') L[n].body = boxEls(m);
		});
		if (!L.launch?.mod || !L.market?.body || !L.brand?.body || !L.core) return;
		const column = boxEls(L.launch.mod);
		const extras = [...svg.querySelectorAll<SVGElement>('.gap, .layer-tags, .tag, .tag-lead')];

		// ---- IDP-style board: 7x7 cells around the flattened block, tool tiles pop in by ring
		const firstPlate = svg.querySelector('.plate-wrap');
		const boardBack = mk('g', 'idp idp-back', svg, firstPlate);
		const boardFront = mk('g', 'idp idp-front', svg);
		const B0 = -CELL;
		const BN = 5;
		const board = mk('polygon', 'idp-board', boardBack);
		board.setAttribute(
			'points',
			pts([
				P(B0, B0, 0),
				P(B0 + BN * CELL, B0, 0),
				P(B0 + BN * CELL, B0 + BN * CELL, 0),
				P(B0, B0 + BN * CELL, 0)
			])
		);
		const boardGrid = mk('path', 'idp-grid', boardBack);
		boardGrid.setAttribute('d', gridPath(B0, B0, BN, 0.001));
		const GLY = [
			'<path d="M22 32 H78 V70 H22 Z M22 32 L50 54 L78 32"/>', // mail
			'<path d="M20 28 H30 L38 62 H72 L80 38 H34 M42 74 a4 4 0 1 0 0.1 0 M68 74 a4 4 0 1 0 0.1 0"/>', // cart
			'<path d="M26 74 V54 M42 74 V40 M58 74 V48 M74 74 V28"/>', // bars
			'<path d="M24 30 H76 V62 H46 L32 74 V62 H24 Z"/>', // chat
			'<path d="M44 26 a18 18 0 1 0 0.1 0 M57 57 L76 76"/>', // search
			'<path d="M50 24 a26 26 0 1 0 0.1 0 M24 50 H76 M50 24 Q34 50 50 76 Q66 50 50 24"/>', // globe
			'<path d="M40 34 L24 50 L40 66 M60 34 L76 50 L60 66"/>', // code
			'<path d="M28 60 L44 44 L56 56 L74 36 M62 36 H74 V48"/>', // growth
			'<path d="M38 30 L70 50 L38 70 Z"/>', // play
			'<path d="M50 24 a20 20 0 0 1 20 20 C70 60 50 76 50 76 C50 76 30 60 30 44 a20 20 0 0 1 20 -20 M50 38 a6 6 0 1 0 0.1 0"/>', // pin
			'<path d="M50 22 L58 42 L78 42 L62 55 L68 76 L50 63 L32 76 L38 55 L22 42 L42 42 Z"/>', // star
			'<path d="M34 62 V46 a16 16 0 0 1 32 0 V62 L72 68 H28 Z M45 74 H55"/>' // bell
		];
		// the 16 cells ringing the 3x3 block, walked clockwise so tiles pop in a sweep
		const CELLS: [number, number, number, number][] = [];
		const ringOrder = [
			[-1, -1],
			[0, -1],
			[1, -1],
			[2, -1],
			[3, -1],
			[3, 0],
			[3, 1],
			[3, 2],
			[3, 3],
			[2, 3],
			[1, 3],
			[0, 3],
			[-1, 3],
			[-1, 2],
			[-1, 1],
			[-1, 0]
		];
		ringOrder.forEach(function (c, k) {
			CELLS.push([c[0], c[1], k % 12, k]);
		});
		const TEAL: Record<string, number> = { '1,-1': 1, '3,1': 1, '1,3': 1, '-1,1': 1 };
		const tiles = CELLS.map(function (c) {
			const i = c[0];
			const j = c[1];
			const ring = Math.max(i < 0 ? -i : i > 2 ? i - 2 : 0, j < 0 ? -j : j > 2 ? j - 2 : 0);
			const x0 = i * CELL + 0.16;
			const y0 = j * CELL + 0.16;
			const s = CELL - 0.32;
			const h = 0.12;
			const front = x0 >= W || y0 >= W;
			const g = mk('g', 'idp-tile' + (TEAL[i + ',' + j] ? ' teal' : ''), front ? boardFront : boardBack);
			g.innerHTML =
				'<polygon class="e f-left" points="' +
				pts([P(x0, y0 + s, 0), P(x0 + s, y0 + s, 0), P(x0 + s, y0 + s, h), P(x0, y0 + s, h)]) +
				'"/>' +
				'<polygon class="e f-right" points="' +
				pts([P(x0 + s, y0, 0), P(x0 + s, y0 + s, 0), P(x0 + s, y0 + s, h), P(x0 + s, y0, h)]) +
				'"/>' +
				'<polygon class="e f-top" points="' +
				pts([P(x0, y0, h), P(x0 + s, y0, h), P(x0 + s, y0 + s, h), P(x0, y0 + s, h)]) +
				'"/>' +
				'<g class="idp-ico" transform="matrix(' +
				[
					((C * U * s * 0.6) / 100).toFixed(4),
					((S * U * s * 0.6) / 100).toFixed(4),
					((-C * U * s * 0.6) / 100).toFixed(4),
					((S * U * s * 0.6) / 100).toFixed(4)
				].join(',') +
				',' +
				P(x0 + s * 0.2, y0 + s * 0.2, h)
					.map(function (v) {
						return v.toFixed(1);
					})
					.join(',') +
				')">' +
				GLY[c[2]] +
				'</g>';
			return { g, ring, k: c[3] * 0.075 };
		});
		tiles.sort(function () {
			return 0;
		});

		// ---- timeline (s)
		const A: Record<string, [number, number]> = {};
		let t0 = 0;
		(
			[
				['board', 0.6],
				['pop', 1.6],
				['show', 2.2],
				['clear', 0.8],
				['rise', 1.6],
				['pause', 0.4],
				['split', 1.3],
				['hold', 4.6],
				['close', 1.0],
				['flat', 1.2],
				['rest', 0.3]
			] as [string, number][]
		).forEach(function (p) {
			A[p[0]] = [t0, t0 + p[1]];
			t0 += p[1];
		});
		const LOOP = t0;
		function ph(name: string, t: number) {
			return seg(t, A[name][0], A[name][1]);
		}

		function render(t: number) {
			let mode: 'col' | 'open' = 'col';
			let H = FLAT;
			let open = 0;
			let cur = 'rest';
			for (const k in A) {
				if (t >= A[k][0] && t < A[k][1]) {
					cur = k;
					break;
				}
			}
			if (cur === 'rise') {
				H = FLAT + (TOP - FLAT) * eout(ph('rise', t));
			} else if (cur === 'pause') {
				H = TOP;
			} else if (cur === 'split') {
				mode = 'open';
				open = ph('split', t);
			} else if (cur === 'hold') {
				mode = 'open';
				open = 1;
			} else if (cur === 'close') {
				mode = 'open';
				open = 1 - ph('close', t);
			} else if (cur === 'flat') {
				H = TOP - (TOP - FLAT) * eio(ph('flat', t));
			}

			if (mode === 'col') {
				(['market', 'brand'] as const).forEach(function (n) {
					L[n].wrap.style.opacity = '0';
				});
				(['launch', 'market', 'brand'] as const).forEach(function (n) {
					L[n].body!.g.style.display = 'none';
				});
				L.launch.wrap.style.opacity = '1';
				L.core.wrap.style.opacity = '1';
				L.core.wrap.style.transform = 'translateY(' + ((Z.core - (H - TH)) * U).toFixed(2) + 'px)';
				setBox(column, TH, H - TH, false);
			} else {
				column.g.style.display = 'none';
				L.core.wrap.style.transform = '';
				LAYERS.forEach(function (n) {
					L[n].wrap.style.opacity = '1';
				});
				(['launch', 'market', 'brand'] as const).forEach(function (n, i) {
					const k = 2 - i;
					const local = eio(clamp(open * 1.4 - k * 0.2));
					setBox(L[n].body!, Z[n] + TH, Z[n] + TH + (GAP - TH) * (1 - local), true);
					// reveal what is on this layer, item by item, once its gap has started to open
					const dur = A.split[1] - A.split[0];
					const start = A.split[0] + dur * (0.2 * k / 1.4 + 0.3);
					const hide = cur === 'close' ? eio(clamp(ph('close', t) * 1.8)) : 0;
					L[n].items.forEach(function (it, j) {
						let p = cur === 'hold' && t > start + 2 ? 1 : eout(seg(t, start + j * 0.08, start + j * 0.08 + 0.55));
						p *= 1 - hide;
						it.style.opacity = p.toFixed(3);
						it.style.transform =
							'translateY(' + ((1 - p) * 10).toFixed(2) + 'px) scale(' + (0.92 + 0.08 * p).toFixed(4) + ')';
					});
				});
			}
			const vis = mode === 'open' ? eio(seg(open, 0.7, 1)) : 0;
			extras.forEach(function (e) {
				e.style.opacity = String(vis);
			});
			svg.classList.toggle('is-open', mode === 'open' && open >= 1);

			// board + tiles
			const onBoard = cur === 'board' || cur === 'pop' || cur === 'show' || cur === 'clear';
			const bOut = cur === 'clear' ? ph('clear', t) : 0;
			const bo = !onBoard ? 0 : cur === 'board' ? eout(ph('board', t)) : 1 - bOut;
			boardBack.style.opacity = '1';
			boardFront.style.opacity = '1';
			board.style.opacity = String(bo);
			boardGrid.style.opacity = String(bo);
			tiles.forEach(function (tl) {
				const s0 = A.pop[0] + tl.k;
				let p = onBoard ? eout(seg(t, s0, s0 + 0.5)) : 0;
				p *= 1 - eio(bOut);
				tl.g.style.opacity = String(p);
				tl.g.style.transform = 'translateY(' + ((1 - p) * -18).toFixed(1) + 'px)';
			});
		}

		const reduce = prefersReducedMotion();
		if (reduce) {
			render(A.hold[0] + 3);
			return;
		}
		let acc = A.hold[0];
		let last: number | null = null;
		let paused = false;
		let loopLocked = false;
		let visible = true;
		svg.addEventListener('pointerenter', function () {
			if (svg.classList.contains('is-open')) paused = true;
		});
		svg.addEventListener('pointerleave', function () {
			paused = false;
		});
		if ('IntersectionObserver' in window) {
			new IntersectionObserver(function (es) {
				visible = es[0].isIntersecting;
			}).observe(svg);
		}
		function frame(now: number) {
			if (last === null) last = now;
			const dt = Math.min(0.05, (now - last) / 1000);
			last = now;
			if (!paused && !loopLocked && visible) acc = (acc + dt) % LOOP;
			render(acc);
			requestAnimationFrame(frame);
		}
		window.__stackSeek = function (t) {
			acc = t;
			render(t);
		};
		window.__stackPause = function (on) {
			loopLocked = on;
		};
		window.__stackPhases = A;
		render(0);
		requestAnimationFrame(frame);
	})();
	(function () {
		const scenes = [...document.querySelectorAll<HTMLElement>('.svc-scene, .ap-min, .ap-ext')];
		if (!scenes.length) return;
		if (!('IntersectionObserver' in window)) {
			scenes.forEach(function (s) {
				s.classList.add('play');
			});
			return;
		}
		const io = new IntersectionObserver(
			function (es) {
				es.forEach(function (e) {
					if (e.isIntersecting) {
						e.target.classList.add('play');
						io.unobserve(e.target);
					}
				});
			},
			{ threshold: 0.35 }
		);
		scenes.forEach(function (s) {
			io.observe(s);
		});
	})();
	(function () {
		const kEl = document.getElementById('zfK');
		const mark = document.querySelector('.zf-mark');
		if (!kEl || !mark) return;
		const k: HTMLElement = kEl;
		const reduce = prefersReducedMotion();
		const FROM = -1.95;
		const TO = -0.55;
		if (reduce || !('IntersectionObserver' in window)) return;
		k.setAttribute('k4', String(FROM));
		const io = new IntersectionObserver(
			function (es) {
				if (!es[0].isIntersecting) return;
				io.disconnect();
				let t0: number | null = null;
				function step(now: number) {
					if (!t0) t0 = now;
					const p = Math.min(1, (now - t0) / 1600);
					const e = 1 - Math.pow(1 - p, 3);
					k.setAttribute('k4', (FROM + (TO - FROM) * e).toFixed(3));
					if (p < 1) requestAnimationFrame(step);
				}
				requestAnimationFrame(step);
			},
			{ threshold: 0.3 }
		);
		io.observe(mark);
	})();
	(function () {
		const panels = [...document.querySelectorAll<HTMLElement>('.wd-panel')];
		const links = [...document.querySelectorAll<HTMLAnchorElement>('.wd-rail a')];
		if (!panels.length || !('IntersectionObserver' in window)) return;
		const io = new IntersectionObserver(
			function (es) {
				es.forEach(function (e) {
					if (e.isIntersecting) {
						const i = +(e.target as HTMLElement).dataset.i!;
						links.forEach(function (a, j) {
							a.classList.toggle('on', j === i);
						});
					}
				});
			},
			{ rootMargin: '-45% 0px -50% 0px' }
		);
		panels.forEach(function (p) {
			io.observe(p);
		});
	})();
	(function () {
		const sec = document.querySelector('.wk2');
		if (!sec) return;
		const pills = [...sec.querySelectorAll<HTMLButtonElement>('.wk2-pill')];
		const cards = [...sec.querySelectorAll<HTMLElement>('.wk2-card')];
		const empty = sec.querySelector<HTMLElement>('.wk2-empty');
		if (!empty) return;
		const stages = [...sec.querySelectorAll<HTMLElement>('.wk2-ph-shot')];
		const reduce = prefersReducedMotion();

		function setPlaying(stage: HTMLElement, on: boolean) {
			const video = stage.querySelector<HTMLVideoElement>('.wk2-vid');
			if (!video) return;
			if (on) {
				stage.classList.add('on');
				void video.play().catch(() => {
					stage.classList.remove('on');
				});
			} else {
				stage.classList.remove('on');
				video.pause();
			}
		}

		pills.forEach(function (p) {
			p.addEventListener('click', function () {
				const f = p.getAttribute('data-f');
				let n = 0;
				pills.forEach(function (q) {
					q.classList.toggle('on', q === p);
					q.setAttribute('aria-pressed', String(q === p));
				});
				cards.forEach(function (c) {
					const show = f === 'all' || c.getAttribute('data-cat') === f;
					c.hidden = !show;
					if (show) n++;
					else {
						const stage = c.querySelector<HTMLElement>('.wk2-ph-shot');
						if (stage) setPlaying(stage, false);
					}
				});
				empty.hidden = n > 0;
				if (!n)
					empty.textContent =
						'No ' + p.textContent?.toLowerCase() + " projects yet. They're added here as they launch.";
			});
		});

		if (reduce) return;
		const io = new IntersectionObserver(
			function (entries) {
				entries.forEach(function (entry) {
					const stage = entry.target as HTMLElement;
					const card = stage.closest<HTMLElement>('.wk2-card');
					setPlaying(stage, entry.isIntersecting && !card?.hidden);
				});
			},
			{ threshold: 0.45 }
		);
		stages.forEach(function (stage) {
			io.observe(stage);
		});
	})();
	(function () {
		const sec = document.querySelector<HTMLElement>('.hero-x');
		if (!sec) return;
		const grid = sec.querySelector<HTMLElement>('.hx-grid');
		const art = sec.querySelector<HTMLElement>('.hx-art');
		const copy = sec.querySelector<HTMLElement>('.hx-copy');
		const nav = document.querySelector<HTMLElement>('.nav');
		if (!grid || !art || !copy) return;
		const kids = [...copy.children] as HTMLElement[];
		const h1b = copy.querySelector<HTMLElement>('h1 .h1-2');
		const reduce = prefersReducedMotion();
		const mq = window.matchMedia('(max-width: 760px)');
		let on = false;
		let hint: HTMLElement | null = null;
		let steps: HTMLElement | null = null;
		let wait = 0;
		const seq = [kids[0], kids[1], h1b, kids[2], kids[3], kids[4]].filter(
			(el): el is HTMLElement => Boolean(el)
		);
		let T_END = 0;
		function phases() {
			const PH = window.__stackPhases;
			if (PH?.hold) T_END = PH.hold[0] + 2.4;
			return !!PH;
		}
		function enable() {
			if (on || !phases()) return;
			on = true;
			sec.classList.add('hx-scroll');
			sec.style.setProperty('--hx-scrim', '0');
			window.__stackPause?.(true);
			hint = document.createElement('div');
			hint.className = 'hx-hint';
			hint.innerHTML = 'Scroll<i></i>';
			grid.appendChild(hint);
			steps = document.createElement('div');
			steps.className = 'hx-steps';
			steps.setAttribute('aria-hidden', 'true');
			steps.innerHTML = '<b></b><b></b><b></b><b></b>';
			grid.appendChild(steps);
			window.__heroGridBuild?.();
			measure();
			update();
			requestAnimationFrame(function () {
				if (!on) return;
				measure();
				update();
			});
			if (document.fonts?.ready) {
				void document.fonts.ready.then(function () {
					if (!on) return;
					window.__heroGridBuild?.();
					measure();
					update();
				});
			}
		}
		function disable() {
			if (!on) return;
			on = false;
			sec.classList.remove('hx-scroll');
			sec.style.removeProperty('--hx-h');
			sec.style.removeProperty('--hx-scrim');
			sec.style.removeProperty('--hx-top');
			art.style.transform = '';
			art.style.opacity = '';
			seq.forEach(function (e) {
				e.classList.remove('on');
			});
			hint?.remove();
			steps?.remove();
			hint = null;
			steps = null;
			window.__stackPause?.(false);
			window.__heroGridBuild?.();
		}
		let H = 0;
		let AH = 0;
		let CH = 0;
		let TOP = 60;
		function measure() {
			TOP = nav ? nav.getBoundingClientRect().height : 60;
			sec.style.setProperty('--hx-top', TOP + 'px');
			H = window.innerHeight - TOP;
			const scale = parseFloat((art.style.transform.match(/scale\(([\d.]+)\)/) || [0, '1'])[1]) || 1;
			AH = art.getBoundingClientRect().height / scale || 1;
			CH = copy.getBoundingClientRect().height;
			sec.style.setProperty('--hx-h', window.innerHeight * 2.6 + 'px');
		}
		function clamp(v: number) {
			return v < 0 ? 0 : v > 1 ? 1 : v;
		}
		function ease(u: number) {
			return u < 0.5 ? 2 * u * u : 1 - Math.pow(-2 * u + 2, 2) / 2;
		}
		function update() {
			if (!on) return;
			const r = sec.getBoundingClientRect();
			const span = r.height - (window.innerHeight - TOP);
			const p = clamp((TOP - r.top) / Math.max(1, span));
			const tp = clamp(p / 0.62);
			window.__stackSeek?.(tp * T_END);
			const m = ease(clamp((p - 0.55) / 0.17));
			const s0 = Math.min(1, (H - 24) / AH);
			const fit = (H - CH - 28) / AH;
			let s1 = Math.min(0.75, fit);
			const hide = fit < 0.38;
			if (hide) s1 = Math.max(0.3, Math.min(0.5, fit + 0.12));
			const s = s0 + (s1 - s0) * m;
			const y0 = Math.max(0, (H - AH * s0) / 2);
			const y = y0 + (4 - y0) * m;
			art.style.transform = 'translateY(' + y.toFixed(1) + 'px) scale(' + s.toFixed(4) + ')';
			art.style.opacity = hide ? (1 - clamp((p - 0.62) / 0.1)).toFixed(3) : '1';
			sec.style.setProperty('--hx-scrim', clamp((p - 0.66) / 0.06).toFixed(3));
			seq.forEach(function (e, i) {
				e.classList.toggle('on', p >= 0.7 + i * 0.045);
			});
			if (hint) hint.style.opacity = p < 0.04 ? '1' : '0';
			if (steps) {
				let k = tp < 0.25 ? 0 : tp < 0.6 ? 1 : tp < 0.85 ? 2 : 3;
				if (p >= 0.7) k = 4;
				[...steps.children].forEach(function (b, i) {
					b.classList.toggle('on', i < k);
				});
				steps.style.opacity = p > 0.97 ? '0' : '1';
			}
		}
		function check() {
			if (mq.matches && !reduce) {
				if (!on && !phases()) {
					if (wait++ < 90) requestAnimationFrame(check);
					return;
				}
				enable();
			} else disable();
		}
		onSmoothScroll(update);
		window.addEventListener('resize', function () {
			check();
			if (on) {
				measure();
				update();
			}
		});
		mq.addEventListener('change', check);
		check();
	})();
	enhanceScrollText();
}

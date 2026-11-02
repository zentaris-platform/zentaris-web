<script lang="ts">
	import { onMount, tick } from 'svelte';
	import { page } from '$app/state';
	import { city, contactEmail, contactPhone, contactPhoneHref } from '#lib/seo.ts';
	import { homeHref, homeRoot } from '#lib/home-href.ts';
	import { getLenis } from '#lib/smooth-scroll.ts';
	import LogoMark from './LogoMark.svelte';
	import ThemeSwitcher from './ThemeSwitcher.svelte';

	const isDev = import.meta.env.DEV;
	const path = $derived(page.url.pathname);
	const items = $derived(
		(
			[
				{ hash: '#services', label: 'Services' },
				{ hash: '#stack', label: 'Stack' },
				{ hash: '#approach', label: 'Approach' },
				{ hash: '#process', label: 'Process' },
				{ hash: '#work', label: 'Work' },
				{ hash: '#about', label: 'About' },
				{ hash: '#faq', label: 'FAQ' }
			] as const
		).map((item) => ({ ...item, href: homeHref(path, item.hash) }))
	);

	let menuOpen = $state(false);
	let panelHidden = $state(true);
	let navEl: HTMLElement | undefined;
	let closeTimer: ReturnType<typeof setTimeout> | undefined;
	let lockY = 0;

	let hbTop = '';
	function setTop() {
		if (!navEl) return;
		// resize fires repeatedly on iOS as the toolbar slides; a root custom-property write
		// restyles the whole page, so only write when the value really changed
		const next = `${navEl.getBoundingClientRect().bottom}px`;
		if (next === hbTop) return;
		hbTop = next;
		document.documentElement.style.setProperty('--hb-top', next);
	}

	function lockPage() {
		lockY = window.scrollY;
		getLenis()?.stop();
		document.body.classList.add('hb-lock');
		document.body.style.position = 'fixed';
		document.body.style.top = `-${lockY}px`;
		document.body.style.left = '0';
		document.body.style.right = '0';
		document.body.style.width = '100%';
	}

	function unlockPage() {
		document.body.classList.remove('hb-lock');
		document.body.style.position = '';
		document.body.style.top = '';
		document.body.style.left = '';
		document.body.style.right = '';
		document.body.style.width = '';
		window.scrollTo(0, lockY);
		getLenis()?.start();
	}

	async function setMenu(next: boolean) {
		if (next === menuOpen) return;
		if (next) {
			lockPage();
			panelHidden = false;
			await tick();
			setTop();
			requestAnimationFrame(() => {
				requestAnimationFrame(() => {
					document.documentElement.classList.add('hb-open');
					setTop();
				});
			});
		} else {
			document.documentElement.classList.remove('hb-open');
			unlockPage();
			clearTimeout(closeTimer);
			closeTimer = setTimeout(() => {
				if (!document.documentElement.classList.contains('hb-open')) panelHidden = true;
			}, 460);
		}
		menuOpen = next;
	}

	onMount(() => {
		function onKey(event: KeyboardEvent) {
			if (event.key === 'Escape' && menuOpen) {
				void setMenu(false);
			}
		}
		function onResize() {
			if (window.innerWidth > 820 && menuOpen) void setMenu(false);
			setTop();
		}
		document.addEventListener('keydown', onKey);
		window.addEventListener('resize', onResize);
		return () => {
			document.removeEventListener('keydown', onKey);
			window.removeEventListener('resize', onResize);
			clearTimeout(closeTimer);
			document.documentElement.classList.remove('hb-open');
			if (menuOpen) unlockPage();
		};
	});
</script>

<header class="nav" bind:this={navEl}>
	<div class="in">
		<a class="logo" href={homeRoot(path)} aria-label="Zentaris home">
			<LogoMark />
			<span>ZENTARIS</span>
		</a>
		<nav class="links" aria-label="Main">
			<a href={homeHref(path, '#services')}>Services</a>
			<a href={homeHref(path, '#approach')}>Approach</a>
			<a href={homeHref(path, '#process')}>Process</a>
			<a href={homeHref(path, '#work')}>Work</a>
			<a href={homeHref(path, '#faq')}>FAQ</a>
			{#if isDev}
				<ThemeSwitcher />
			{/if}
			<a class="btn btn-2" href={homeHref(path, '#contact')}>Book a call</a>
			<button
				class="hb-btn"
				id="hb-btn"
				type="button"
				aria-label={menuOpen ? 'Close menu' : 'Open menu'}
				aria-expanded={menuOpen}
				aria-controls="hb-panel"
				onclick={() => setMenu(!menuOpen)}
			>
				<span></span><span></span><span></span>
			</button>
		</nav>
	</div>
</header>
<div class="hb-panel" id="hb-panel" hidden={panelHidden}>
	<nav aria-label="Mobile">
		<ul class="hb-list">
			{#each items as item, i}
				<li style="--i: {i}">
					<a href={item.href} onclick={() => setMenu(false)}>
						{item.label}
						<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17L17 7M9 7h8v8" /></svg>
					</a>
				</li>
			{/each}
		</ul>
	</nav>
	<div class="hb-foot">
		<a class="btn btn-teal hb-cta" href={homeHref(path, '#contact')} onclick={() => setMenu(false)}>
			Book a free 30-minute call
		</a>
		<p class="mono hb-meta">
			<a href="mailto:{contactEmail}">{contactEmail}</a>
			<a href={contactPhoneHref}>{contactPhone}</a>
			<span>{city}, India</span>
		</p>
	</div>
</div>

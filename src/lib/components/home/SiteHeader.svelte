<script lang="ts">
	import { onMount, tick } from 'svelte';
	import { city, contactEmail, contactPhone, contactPhoneHref } from '#lib/seo.ts';
	import { getLenis } from '#lib/smooth-scroll.ts';
	import LogoMark from './LogoMark.svelte';
	import ThemeSwitcher from './ThemeSwitcher.svelte';

	const isDev = import.meta.env.DEV;
	const items = [
		{ href: '#services', label: 'Services' },
		{ href: '#stack', label: 'Stack' },
		{ href: '#approach', label: 'Approach' },
		{ href: '#process', label: 'Process' },
		{ href: '#work', label: 'Work' },
		{ href: '#about', label: 'About' },
		{ href: '#faq', label: 'FAQ' }
	] as const;

	let menuOpen = $state(false);
	let panelHidden = $state(true);
	let navEl: HTMLElement | undefined;
	let closeTimer: ReturnType<typeof setTimeout> | undefined;
	let lockY = 0;

	function setTop() {
		if (!navEl) return;
		document.documentElement.style.setProperty(
			'--hb-top',
			`${navEl.getBoundingClientRect().bottom}px`
		);
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
		<a class="logo" href="#top" aria-label="Zentaris home">
			<LogoMark />
			<span>ZENTARIS</span>
		</a>
		<nav class="links" aria-label="Main">
			<a href="#services">Services</a>
			<a href="#approach">Approach</a>
			<a href="#process">Process</a>
			<a href="#work">Work</a>
			<a href="#faq">FAQ</a>
			{#if isDev}
				<ThemeSwitcher />
			{/if}
			<a class="btn btn-2" href="#contact">Book a call</a>
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
		<a class="btn btn-teal hb-cta" href="#contact" onclick={() => setMenu(false)}>
			Book a free 30-minute call
		</a>
		<p class="mono hb-meta">
			<a href="mailto:{contactEmail}">{contactEmail}</a>
			<a href={contactPhoneHref}>{contactPhone}</a>
			<span>{city}, India</span>
		</p>
	</div>
</div>

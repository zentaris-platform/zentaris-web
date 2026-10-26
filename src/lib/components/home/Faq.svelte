<script lang="ts">
	function faqAnimate(root: HTMLElement) {
		const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		const running = new WeakMap<HTMLDetailsElement, Animation>();
		const ease = 'cubic-bezier(0.2, 0.8, 0.2, 1)';

		function panelOf(el: HTMLDetailsElement): HTMLElement | null {
			return el.querySelector('.faq-a');
		}

		function setOpen(el: HTMLDetailsElement, open: boolean) {
			const panel = panelOf(el);
			if (!panel) {
				el.open = open;
				return;
			}

			running.get(el)?.cancel();

			if (reduce) {
				el.open = open;
				panel.style.height = '';
				panel.style.opacity = '';
				return;
			}

			if (open) {
				el.open = true;
				const h = panel.scrollHeight;
				const anim = panel.animate(
					[
						{ height: '0px', opacity: 0 },
						{ height: `${h}px`, opacity: 1 }
					],
					{ duration: 420, easing: ease, fill: 'forwards' }
				);
				running.set(el, anim);
				void anim.finished
					.then(() => {
						if (running.get(el) !== anim) return;
						panel.style.height = '';
						panel.style.opacity = '';
						anim.cancel();
					})
					.catch(() => {});
				return;
			}

			const h = panel.scrollHeight;
			const anim = panel.animate(
				[
					{ height: `${h}px`, opacity: 1 },
					{ height: '0px', opacity: 0 }
				],
				{ duration: 320, easing: ease, fill: 'forwards' }
			);
			running.set(el, anim);
			void anim.finished
				.then(() => {
					if (running.get(el) !== anim) return;
					el.open = false;
					panel.style.height = '';
					panel.style.opacity = '';
					anim.cancel();
				})
				.catch(() => {});
		}

		function onClick(event: MouseEvent) {
			const summary = (event.target as Element | null)?.closest('summary');
			if (!summary || !root.contains(summary)) return;
			const el = summary.parentElement;
			if (!(el instanceof HTMLDetailsElement)) return;
			event.preventDefault();
			setOpen(el, !el.open);
		}

		root.addEventListener('click', onClick);
		return {
			destroy() {
				root.removeEventListener('click', onClick);
			}
		};
	}
</script>

<section id="faq" class="ruled">
	<div class="in faq">
		<div>
			<p class="mono label">FAQ</p>
			<h2 style="margin-top:.9rem">Common questions</h2>
		</div>
		<div class="faq-list" use:faqAnimate>
			<details>
				<summary>How much does a website cost?</summary>
				<div class="faq-a">
					<p>
						It depends on the number of pages and features. After a free call we send a fixed quote,
						so there are no surprises later.
					</p>
				</div>
			</details>
			<details>
				<summary>How long does a project take?</summary>
				<div class="faq-a">
					<p>
						A business website usually takes 3–5 weeks from first call to launch. Branding projects
						take 2–3 weeks.
					</p>
				</div>
			</details>
			<details>
				<summary>Can I hire you for just one service?</summary>
				<div class="faq-a">
					<p>
						Yes. Many clients start with a website or a logo and add marketing later. Everything we
						make is designed to connect.
					</p>
				</div>
			</details>
			<details>
				<summary>Do you work with businesses outside my city?</summary>
				<div class="faq-a">
					<p>
						Yes. We work with clients across India and abroad over video calls, WhatsApp and email.
					</p>
				</div>
			</details>
			<details>
				<summary>What happens after launch?</summary>
				<div class="faq-a">
					<p>
						You can manage the site yourself (we show you how), or choose a monthly plan for updates,
						hosting and marketing.
					</p>
				</div>
			</details>
		</div>
	</div>
</section>

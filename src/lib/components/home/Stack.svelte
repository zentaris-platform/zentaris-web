<script lang="ts">
	import { stackIcons, stackPillars } from './stack-data.ts';

	const legend = ['Frontend', 'Mobile', 'Backend', 'Data', 'Cloud & DevOps', 'Marketing'];
</script>

<section class="pl" id="stack" aria-labelledby="pl-h">
	<div class="in pl-grid">
		<div class="pl-copy">
			<p class="mono label">Stack</p>
			<h2 id="pl-h">Built on tools that last.</h2>
			<p class="pl-sub">
				Six pillars hold up everything we build and market. Modern, proven technology that is fast
				to build with, easy to hand over and ready to grow.
			</p>
			<ul class="pl-legend mono" aria-hidden="true">
				{#each legend as item}
					<li>{item}</li>
				{/each}
			</ul>
		</div>
		<div>
			<svg width="0" height="0" style="position:absolute" aria-hidden="true">
				<defs>
					<linearGradient id="plMarble" x1="0" x2="1" y1="0" y2="0">
						<stop offset="0" style="stop-color:var(--bg)"></stop>
						<stop offset=".35" style="stop-color:var(--surface)"></stop>
						<stop offset=".7" style="stop-color:var(--surface)"></stop>
						<stop offset="1" style="stop-color:var(--bg)"></stop>
					</linearGradient>
				</defs>
			</svg>
			<div class="pl-row">
				{#each stackPillars as pillar}
					<div class="pl-pillar {pillar.dir}" style="--k:{pillar.k};--dur:{pillar.dur}s">
						<svg class="pl-capital" viewBox="0 0 100 32" aria-hidden="true">
							<path class="pl-m" d="M1 1h98v8H1z"></path>
							<path class="pl-m" d="M5 9h90c0 6-6 10-11 12H16C11 19 5 15 5 9z"></path>
							<path class="pl-m" d="M15 21h70v4H15z"></path>
							<path class="pl-m" d="M16 25h68v3H16z"></path>
							<path class="pl-hl" d="M2 2.5h96"></path>
						</svg>
						<div class="pl-shaft">
							<ul class="pl-track" aria-label={pillar.aria}>
								{#each [...pillar.tools, ...pillar.tools] as name, i (pillar.k + '-' + name + '-' + i)}
									<li class="pl-tile" style="--brand:{stackIcons[name].brand}">
										<svg viewBox="0 0 24 24" aria-hidden="true">{@html stackIcons[name].svg}</svg>
										<span class="pl-sr">{name}</span>
									</li>
								{/each}
							</ul>
						</div>
						<svg class="pl-plinth" viewBox="0 0 100 30" aria-hidden="true">
							<path class="pl-m" d="M15 0h70v3H15z"></path>
							<path class="pl-m" d="M11 3h78c4 0 4 6 0 6H11c-4 0-4-6 0-6z"></path>
							<path class="pl-m" d="M13 9h74c-2 2-2 4 0 6H13c2-2 2-4 0-6z"></path>
							<path class="pl-m" d="M6 15h88c6 0 6 7 0 7H6c-6 0-6-7 0-7z"></path>
							<path class="pl-m" d="M1 22h98v7H1z"></path>
						</svg>
						<span class="pl-base mono">
							<span class="pl-l">{pillar.label}</span>
							<span class="pl-s">{pillar.short}</span>
						</span>
					</div>
				{/each}
				<span class="pl-beam pl-beam-t" aria-hidden="true"></span>
				<span class="pl-step" aria-hidden="true"></span>
			</div>
		</div>
	</div>
</section>

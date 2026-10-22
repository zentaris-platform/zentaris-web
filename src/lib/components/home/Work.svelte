<script lang="ts">
	import ProjectPhoto from './illustrations/ProjectPhoto.svelte';
</script>

<section id="work" class="ruled wk2">
	<div class="in wk2-top">
		<div>
			<p class="mono label">Work</p>
			<h2>We started with the hardest client. Ourselves.</h2>
		</div>
		<div class="wk2-filter" role="group" aria-label="Filter work">
			<span class="mono">Filter</span>
			<button type="button" class="wk2-pill on" data-f="all">All</button>
			<button type="button" class="wk2-pill" data-f="tech">Tech</button>
			<button type="button" class="wk2-pill" data-f="marketing">Marketing</button>
			<button type="button" class="wk2-pill" data-f="brand">Brand</button>
		</div>
	</div>
	<div class="in wk2-grid">
		<article class="wk2-card wk2-feat" data-cat="tech">
			<a class="wk2-link" href="#contact" aria-label="Ed-tech platform (case study coming soon)">
				<div class="wk2-ph" role="img" aria-label="Project image placeholder">
					<ProjectPhoto />
					<span class="mono">Project image</span>
				</div>
				<div class="wk2-body">
					<p class="mono wk2-client">Client name</p>
					<h3>Ed-tech platform</h3>
					<div class="wk2-foot">
						<span class="mono wk2-tag">Web app · Ed-tech</span>
						<span class="wk2-metric"><b>Result</b><span>metric to add</span></span>
					</div>
				</div>
			</a>
		</article>
		<article class="wk2-card" data-cat="tech">
			<a class="wk2-link" href="#contact" aria-label="Fintech product (case study coming soon)">
				<div class="wk2-ph" role="img" aria-label="Project image placeholder">
					<ProjectPhoto />
					<span class="mono">Project image</span>
				</div>
				<div class="wk2-body">
					<p class="mono wk2-client">Client name</p>
					<h3>Fintech product</h3>
					<div class="wk2-foot">
						<span class="mono wk2-tag">Mobile app · Fintech</span>
						<span class="wk2-metric"><b>Result</b><span>metric to add</span></span>
					</div>
				</div>
			</a>
		</article>
		<article class="wk2-card" data-cat="marketing">
			<a
				class="wk2-link"
				href="#contact"
				aria-label="Website and campaign (case study coming soon)"
			>
				<div class="wk2-ph" role="img" aria-label="Project image placeholder">
					<ProjectPhoto />
					<span class="mono">Project image</span>
				</div>
				<div class="wk2-body">
					<p class="mono wk2-client">Client name</p>
					<h3>Website and campaign</h3>
					<div class="wk2-foot">
						<span class="mono wk2-tag">Website · Marketing</span>
						<span class="wk2-metric"><b>Result</b><span>metric to add</span></span>
					</div>
				</div>
			</a>
		</article>
		<p class="wk2-empty mono" hidden>
			No projects in this category yet. They're added here as they launch.
		</p>
	</div>
	<p class="in next">
		Client case studies are added here as projects launch. <a href="#contact">Start a project</a>
	</p>
</section>

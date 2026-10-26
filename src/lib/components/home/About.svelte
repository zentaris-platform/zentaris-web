<script lang="ts">
	function blockSave(event: MouseEvent) {
		event.preventDefault();
	}
</script>

<section id="about" class="ruled ab2" aria-labelledby="ab-h">
	<div class="in ab2-top">
		<p class="mono label">About</p>
		<h2 id="ab-h" class="ab2-lit" style="--n:13">
			Zentaris started where most good ideas go to wait: inside a corporate office.
		</h2>
	</div>
	<div class="in ab2-note">
		<figure class="ab2-photo" oncontextmenu={blockSave}>
			<div class="ab2-ph">
				<enhanced:img
					src="../../assets/founder/roshini.jpeg"
					alt="Roshini, founder of Zentaris, seated"
					sizes="(max-width: 900px) 320px, 420px"
					draggable="false"
				/>
				<span class="ab2-ph-c ab2-ph-c-tl" aria-hidden="true"></span>
				<span class="ab2-ph-c ab2-ph-c-br" aria-hidden="true"></span>
			</div>
			<figcaption class="mono">
				<b>Roshini</b>
				<span>Founder</span>
			</figcaption>
		</figure>
		<div class="ab2-letter">
			<p class="ab2-k">Our story</p>
			<p class="ab2-lead">
				Our founder, Roshini, spent years in the corporate world. She kept seeing the same thing.
			</p>
			<p>
				Businesses knew what they wanted to achieve, and the market was full of openings, but nobody
				was connecting the two.
			</p>
			<p>So she started Zentaris to close those gaps.</p>
			<div class="ab2-sign">
				<p>
					<b>Roshini, Founder</b><span
						>Former corporate professional who spots the opportunity in the gap, then builds the
						team to go after it.</span
					>
				</p>
			</div>
		</div>
	</div>
	<div class="in ab2-vals-wrap">
		<p class="ab2-k">What we believe</p>
		<ul class="ab2-vals">
			<li style="--s:0">
				<h3>Specific beats big.</h3>
				<p>
					We'd rather be the obvious choice for a few people than a forgettable option for everyone.
				</p>
			</li>
			<li style="--s:1">
				<h3>Look at every side before you build.</h3>
				<p>The cheapest fix is the one you make on paper.</p>
			</li>
			<li style="--s:2">
				<h3>Ship, then improve.</h3>
				<p>A real launch teaches more than a perfect plan.</p>
			</li>
			<li style="--s:3">
				<h3>Say the true thing.</h3>
				<p>Even when it costs us the project.</p>
			</li>
			<li style="--s:4">
				<h3>Leave the client stronger.</h3>
				<p>They should own everything and understand most of it.</p>
			</li>
		</ul>
	</div>
</section>

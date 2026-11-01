<script lang="ts">
	import EnterpriseScene from './illustrations/EnterpriseScene.svelte';
	import MobileScene from './illustrations/MobileScene.svelte';
	import WebsitesScene from './illustrations/WebsitesScene.svelte';
	import MarketingScene from './illustrations/MarketingScene.svelte';
	import BrandingScene from './illustrations/BrandingScene.svelte';
</script>

<section class="wd-svc" id="services" aria-label="Services">
	<nav class="wd-rail" aria-label="Services">
		<ol>
			<li><a href="#enterprise" class="on" data-i="0">Enterprise apps</a></li>
			<li><a href="#mobile" data-i="1">Mobile apps</a></li>
			<li><a href="#websites" data-i="2">Websites</a></li>
			<li><a href="#marketing" data-i="3">Digital marketing</a></li>
			<li><a href="#branding" data-i="4">Branding</a></li>
		</ol>
	</nav>
	<div class="wd-panels">
		<article class="wd-panel" id="enterprise" data-i="0">
			<p class="mono muted">Enterprise applications</p>
			<h3>Your business runs on spreadsheets and WhatsApp forwards. It deserves better.</h3>
			<p class="txt">
				We build the software your team opens every morning: internal tools, platforms, dashboards
				and integrations, engineered to handle real load and real money.
			</p>
			<div class="wd-iso"><EnterpriseScene /></div>
			<ul class="deliv">
				<li>Custom web platforms</li>
				<li>Dashboards and internal tools</li>
				<li>APIs and integrations</li>
				<li>Payments and fintech</li>
				<li>Identity and access</li>
				<li>AWS architecture</li>
			</ul>
			<a class="wd-btn" href="#contact">Build my system</a>
		</article>
		<article class="wd-panel" id="mobile" data-i="1">
			<p class="mono muted">Mobile apps</p>
			<h3>Your customers live on their phones. Your business doesn't, yet.</h3>
			<p class="txt">
				iOS and Android apps designed for the second week, not just the first download. We build the
				backend too, which is where most apps quietly break.
			</p>
			<div class="wd-iso"><MobileScene /></div>
			<ul class="deliv">
				<li>iOS and Android</li>
				<li>App UX and UI</li>
				<li>Backend and APIs</li>
				<li>Payments and wallets</li>
				<li>Push notifications</li>
				<li>Store launch</li>
			</ul>
			<a class="wd-btn" href="#contact">Plan my app</a>
		</article>
		<article class="wd-panel" id="websites" data-i="2">
			<p class="mono muted">Websites</p>
			<h3>People Google you before they call you. What do they find?</h3>
			<p class="txt">
				Your website is the first meeting, before the first meeting. Fast, clear sites that answer
				the visitor's question in five seconds and turn interest into enquiries.
			</p>
			<div class="wd-iso"><WebsitesScene /></div>
			<ul class="deliv">
				<li>Business websites</li>
				<li>Landing pages</li>
				<li>E-commerce</li>
				<li>SEO-ready structure</li>
				<li>Copywriting</li>
				<li>Hosting and care</li>
			</ul>
			<a class="wd-btn" href="#contact">Start a website</a>
		</article>
		<article class="wd-panel" id="marketing" data-i="3">
			<p class="mono muted">Digital marketing</p>
			<h3>Attention is a monkey. It only watches what moves.</h3>
			<p class="txt">
				Your customer isn't ignoring you on purpose. They're holding a screen full of things trying
				to be noticed. We help you be the thing worth noticing, for the right person, and we measure
				it in leads, not likes.
			</p>
			<div class="wd-iso"><MarketingScene /></div>
			<ul class="deliv">
				<li>Social strategy and content</li>
				<li>Google and Meta ads</li>
				<li>SEO and Google Business Profile</li>
				<li>Short video</li>
				<li>Email and WhatsApp</li>
				<li>Tracking and reports</li>
			</ul>
			<a class="wd-btn" href="#contact">Earn attention</a>
		</article>
		<article class="wd-panel" id="branding" data-i="4">
			<p class="mono muted">Branding</p>
			<h3>You look smaller than you are.</h3>
			<p class="txt">
				When two businesses charge the same price, people choose the one they believe. A brand is
				that belief, made visible. We design identity systems, not just logos.
			</p>
			<div class="wd-iso"><BrandingScene /></div>
			<ul class="deliv">
				<li>Brand strategy and naming</li>
				<li>Logo and identity system</li>
				<li>Brand guidelines</li>
				<li>Social templates</li>
				<li>Packaging and print</li>
				<li>Motion and brand video</li>
			</ul>
			<a class="wd-btn wd-btn-teal" href="#contact">Shape my brand</a>
		</article>
	</div>
</section>

export const siteName = 'Zentaris';

export const defaultTitle = 'Zentaris — software, brand and attention';

export const defaultDescription =
	'One team for the software you run on, the brand people remember, and the attention that brings customers in. Websites, apps, marketing and branding, planned together.';

export const linkedInUrl = 'https://www.linkedin.com/company/zentarisin/';

export const contactEmail = 'growth@zentaris.in';

export const city = 'Chennai';

export const faqItems = [
	{
		question: 'How much does a website cost?',
		answer:
			'It depends on the number of pages and features. After a free call we send a fixed quote, so there are no surprises later.'
	},
	{
		question: 'How long does a project take?',
		answer:
			'A business website usually takes 3–5 weeks from first call to launch. Branding projects take 2–3 weeks.'
	},
	{
		question: 'Can I hire you for just one service?',
		answer:
			'Yes. Many clients start with a website or a logo and add marketing later. Everything we make is designed to connect.'
	},
	{
		question: 'Do you work with businesses outside my city?',
		answer: 'Yes. We work with clients across India and abroad over video calls, WhatsApp and email.'
	},
	{
		question: 'What happens after launch?',
		answer:
			'You can manage the site yourself (we show you how), or choose a monthly plan for updates, hosting and marketing.'
	}
] as const;

type OriginSource = { origin: string; pathname?: string };

export function siteOrigin(url: OriginSource): string {
	const fromEnv = import.meta.env.PUBLIC_SITE_URL as string | undefined;
	return (fromEnv ?? url.origin).replace(/\/$/, '');
}

export function canonicalUrl(url: OriginSource): string {
	const path = url.pathname && url.pathname !== '/' ? url.pathname : '/';
	return `${siteOrigin(url)}${path}`;
}

export function absoluteUrl(url: OriginSource, path: string): string {
	return `${siteOrigin(url)}${path.startsWith('/') ? path : `/${path}`}`;
}

export function organizationSchema(url: OriginSource) {
	const origin = siteOrigin(url);
	const logo = absoluteUrl(url, '/logo/zentaris-icon-teal-512.png');
	return {
		'@context': 'https://schema.org',
		'@type': 'ProfessionalService',
		name: siteName,
		url: origin,
		logo,
		image: logo,
		description: defaultDescription,
		email: contactEmail,
		address: {
			'@type': 'PostalAddress',
			addressLocality: city,
			addressRegion: 'Tamil Nadu',
			postalCode: '600011',
			addressCountry: 'IN'
		},
		areaServed: ['IN'],
		sameAs: [linkedInUrl]
	};
}

export function websiteSchema(url: OriginSource) {
	return {
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		name: siteName,
		url: siteOrigin(url),
		description: defaultDescription,
		inLanguage: 'en'
	};
}

export function faqSchema() {
	return {
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: faqItems.map((item) => ({
			'@type': 'Question',
			name: item.question,
			acceptedAnswer: {
				'@type': 'Answer',
				text: item.answer
			}
		}))
	};
}

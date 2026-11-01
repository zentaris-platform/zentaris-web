import { siteOrigin } from '#lib/seo.ts';

export const prerender = true;

export function GET({ url }: { url: URL }) {
	const origin = siteOrigin(url);
	const body = `User-agent: *
Allow: /
Disallow: /demo

Sitemap: ${origin}/sitemap.xml
`;
	return new Response(body, {
		headers: {
			'Content-Type': 'text/plain; charset=utf-8',
			'Cache-Control': 'max-age=3600'
		}
	});
}

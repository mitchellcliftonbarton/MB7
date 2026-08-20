import { client } from '$lib/sanity/client.js';
import { ogImageUrl, firstImage } from '$lib/utils/og.js';

// Cache rendered pages on Vercel for an hour (ISR) so repeat traffic and
// crawlers don't each pay for a fresh render. Client-side "today" logic
// re-runs on hydration, so a cached page self-corrects after midnight.
export const config = {
	isr: { expiration: 3600 }
};

export const load = async () => {
	const [latest, entries, featuredMedia] = await Promise.all([
		client.fetch(
			`*[_type == "calendarEntry"] | order(date desc) [0] { date }`
		),
		client.fetch(
			`*[_type == "calendarEntry"] | order(date desc) { _id, date, category, mediaType, medium[]->{ _id, title }, content[]->{ _id, title }, text, media[0...1]{ mediaType, caption, url, asset->{ _id, url, metadata { dimensions } } } }`
		),
		client.fetch(
			`*[_type == "homePage"][0].featuredWork[0].media[0...1]{ _type, asset->{ _id, url, metadata { dimensions } } }`
		),
	]);

	return {
		latestEntryDate: latest?.date ?? null,
		entries,
		defaultOgImage: ogImageUrl(firstImage(featuredMedia)?.asset),
	};
};

import { client } from '$lib/sanity/client.js';
import { ogImageUrl, firstImage } from '$lib/utils/og.js';

export const load = async () => {
	const [latest, entries, featuredMedia] = await Promise.all([
		client.fetch(
			`*[_type == "calendarEntry"] | order(date desc) [0] { date }`
		),
		client.fetch(
			`*[_type == "calendarEntry"] | order(date desc) { _id, date, category, mediaType, medium[]->{ _id, title }, content[]->{ _id, title }, text, media[0...1]{ mediaType, caption, url, asset->{ ..., metadata } } }`
		),
		client.fetch(
			`*[_type == "homePage"][0].featuredWork[0].media[0...1]{ _type, asset->{ ..., metadata } }`
		),
	]);

	return {
		latestEntryDate: latest?.date ?? null,
		entries,
		defaultOgImage: ogImageUrl(firstImage(featuredMedia)?.asset),
	};
};

import { client } from '$lib/sanity/client.js';

export const load = async () => {
	const [latest, entries] = await Promise.all([
		client.fetch(
			`*[_type == "calendarEntry"] | order(date desc) [0] { date }`
		),
		client.fetch(
			`*[_type == "calendarEntry"] | order(date desc) { _id, date, category, mediaType, medium[]->{ _id, title }, content[]->{ _id, title }, text, media[0...1]{ mediaType, caption, url, asset->{ ..., metadata } } }`
		),
	]);

	return {
		latestEntryDate: latest?.date ?? null,
		entries,
	};
};

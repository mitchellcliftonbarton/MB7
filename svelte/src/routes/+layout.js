import { client } from '$lib/sanity/client.js';

export const load = async () => {
	const [latest, entries] = await Promise.all([
		client.fetch(
			`*[_type == "calendarEntry"] | order(date desc) [0] { date }`
		),
		client.fetch(
			`*[_type == "calendarEntry"] | order(date desc) { _id, date, category, text }`
		),
	]);

	return {
		latestEntryDate: latest?.date ?? null,
		entries,
	};
};

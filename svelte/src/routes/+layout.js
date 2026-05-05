import { client } from '$lib/sanity/client.js';

export const load = async () => {
	const latest = await client.fetch(
		`*[_type == "calendarEntry"] | order(date desc) [0] { date }`
	);

	return {
		latestEntryDate: latest?.date ?? null
	};
};

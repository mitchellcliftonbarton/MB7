import { client } from '$lib/sanity/client.js';

export const load = async ({ params }) => {
	const entries = await client.fetch(
		`*[_type == "calendarEntry" && date == $date] | order(_createdAt asc) {
			_id,
			date,
			category,
			text,
			media[]{
				mediaType,
				caption,
				url,
				asset->{ ..., metadata }
			}
		}`,
		{ date: params.date }
	);

	return { date: params.date, entries };
};

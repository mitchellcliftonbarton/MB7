import { client } from '$lib/sanity/client.js';

export const load = async () => {
	const entries = await client.fetch(
		`*[_type == "calendarEntry"] | order(date desc) {
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
		}`
	);

	return { entries };
};

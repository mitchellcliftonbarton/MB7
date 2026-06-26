import { client } from '$lib/sanity/client.js';

export const load = async () => {
	const [entries, allMediums, allContent] = await Promise.all([
		client.fetch(
			`*[_type == "calendarEntry"] | order(date desc) {
				_id,
				date,
				category,
				mediaType,
				medium[]->{ _id, title },
				content[]->{ _id, title },
				text,
				media[]{
					mediaType,
					caption,
					url,
					asset->{ ..., metadata }
				}
			}`
		),
		client.fetch(`*[_type == "medium"] | order(title asc){ _id, title }`),
		client.fetch(`*[_type == "contentTag"] | order(title asc){ _id, title }`),
	]);

	return { entries, allMediums, allContent };
};

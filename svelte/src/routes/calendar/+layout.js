import { client } from '$lib/sanity/client.js';

// Same daily ISR as the root layout, with `view` (month/list) in the cache
// key since it changes SSR output. Filter params (type, medium, year…) are
// deliberately left out: they're applied client-side from the URL on
// hydration, and caching every combination would multiply ISR writes.
export const config = {
	isr: { expiration: 86400, allowQuery: ['view'] }
};

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
					asset->{ _id, url, metadata { dimensions } }
				}
			}`
		),
		client.fetch(`*[_type == "medium"] | order(title asc){ _id, title }`),
		client.fetch(`*[_type == "contentTag"] | order(title asc){ _id, title }`),
	]);

	return { entries, allMediums, allContent };
};

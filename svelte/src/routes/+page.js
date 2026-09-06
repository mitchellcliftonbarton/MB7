import { client } from '$lib/sanity/client.js';

// Same daily ISR as the root layout, but `view` must be part of the cache
// key — it changes the SSR output (month/list/grid). `work` (lightbox) is
// excluded on purpose: it's a client-side overlay, SSR output is identical.
export const config = {
	isr: { expiration: 86400, allowQuery: ['view'] }
};

export const load = async () => {
	const sixMonthsAgo = new Date();
	sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
	const cutoff = sixMonthsAgo.toISOString().slice(0, 10);

	const [homeData, featuredWork] = await Promise.all([
		client.fetch(
			`*[_type == "calendarEntry" && date >= $cutoff] | order(date desc) {
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
			}`,
			{ cutoff }
		),
		client.fetch(
			`*[_type == "homePage"][0].featuredWork[]{
				caption,
				"slug": slug.current,
				media[]{
					_type,
					asset->{ _id, url, metadata { dimensions } },
					"url": asset->url
				}
			}`
		)
	]);

	if (!homeData) {
		return { error: 'Home data not found' };
	}

	return {
		homeData,
		featuredWork: featuredWork ?? []
	};
};

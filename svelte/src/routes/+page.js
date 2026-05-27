import { client } from '$lib/sanity/client.js';

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
				text,
				media[]{
					mediaType,
					caption,
					url,
					asset->{ ..., metadata }
				}
			}`,
			{ cutoff }
		),
		client.fetch(
			`*[_type == "homePage"][0].featuredWork[]{
				caption,
				media[]{
					_type,
					asset->{ ..., metadata },
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

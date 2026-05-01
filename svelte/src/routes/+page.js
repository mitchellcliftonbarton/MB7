import { client } from '$lib/sanity/client.js';

export const load = async () => {
	const sixMonthsAgo = new Date();
	sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
	const cutoff = sixMonthsAgo.toISOString().slice(0, 10);

	const homeData = await client.fetch(
		`*[_type == "calendarEntry" && date >= $cutoff] | order(date desc)`,
		{ cutoff }
	);

	// check if homeData was successfully fetched
	if (!homeData) {
		return {
			error: 'Home data not found'
		};
	}

	return {
		homeData
	};
};

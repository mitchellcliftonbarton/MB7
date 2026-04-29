import { client } from '$lib/sanity/client.js';

export const load = async () => {
	const homeData = await client.fetch(`*[_type == "calendarEntry"]`);

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

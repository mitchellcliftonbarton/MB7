import { client } from '$lib/sanity/client.js';
import { ogImageUrl, firstImage } from '$lib/utils/og.js';

export const load = async ({ params }) => {
	const [entries, prevEntry, nextEntry] = await Promise.all([
		client.fetch(
			`*[_type == "calendarEntry" && date == $date] | order(_createdAt asc) {
				_id,
				date,
				category,
				mediaType,
				medium[]->{ _id, title },
				content[]->{ _id, title },
				text,
				media[]{
					_type,
					mediaType,
					caption,
					url,
					asset->{ _id, url, metadata { dimensions } }
				}
			}`,
			{ date: params.date }
		),
		// nearest entry date strictly before this date
		client.fetch(
			`*[_type == "calendarEntry" && date < $date] | order(date desc) [0] { date }`,
			{ date: params.date }
		),
		// nearest entry date strictly after this date
		client.fetch(
			`*[_type == "calendarEntry" && date > $date] | order(date asc) [0] { date }`,
			{ date: params.date }
		),
	]);

	const entryImage = entries?.reduce((found, entry) => found ?? firstImage(entry.media), null);

	return {
		date: params.date,
		entries,
		prevDate: prevEntry?.date ?? null,
		nextDate: nextEntry?.date ?? null,
		entryOgImage: ogImageUrl(entryImage?.asset),
	};
};

import { urlFor } from '$lib/sanity/client.js';

export const OG_IMAGE_WIDTH = 1200;
export const OG_IMAGE_HEIGHT = 630;

// standard 1.91:1 OG crop
export function ogImageUrl(asset) {
	if (!asset) return null;
	return urlFor(asset).width(OG_IMAGE_WIDTH).height(OG_IMAGE_HEIGHT).fit('crop').url();
}

// first non-video item in a media[] array (videos are always _type: 'file')
export function firstImage(media) {
	return media?.find((m) => m?._type !== 'file' && m?.asset) ?? null;
}

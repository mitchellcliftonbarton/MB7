import { goto } from '$app/navigation';

// The lightbox open state lives entirely in the `?work=` URL param, resolved
// synchronously on the home page so it renders correctly during SSR (no flash on
// refresh). These helpers just drive the URL with `goto`; this page's `load`
// doesn't read `url`, so no data is refetched.

export const LIGHTBOX_WORK_PARAM = 'work';

// The slide the inline carousel was on, handed to the lightbox in-memory (not via
// the URL) so it opens on the same image without needing a param for it.
let pendingStartIndex = 0;

function navigate(mutate) {
	const url = new URL(window.location.href);
	mutate(url.searchParams);
	goto(url.pathname + url.search + url.hash, { noScroll: true, keepFocus: true });
}

// Open the lightbox for featured item `work`, starting on slide `startIndex`.
export function openLightboxUrl(work, startIndex = 0) {
	pendingStartIndex = startIndex;
	navigate((params) => params.set(LIGHTBOX_WORK_PARAM, String(work)));
}

export function closeLightboxUrl() {
	navigate((params) => params.delete(LIGHTBOX_WORK_PARAM));
}

// Consumed once when the lightbox opens; resets so deep-links default to 0.
export function takeStartIndex() {
	const i = pendingStartIndex;
	pendingStartIndex = 0;
	return i;
}

// Ref-counted body scroll lock so multiple overlays (detail panel, command
// palette, etc.) can each request a lock independently. The body stays locked
// until every requester has released.
let count = 0;

export function lockScroll() {
	count += 1;
	document.body.style.overflow = 'hidden';
}

export function unlockScroll() {
	count = Math.max(0, count - 1);
	if (count === 0) {
		document.body.style.overflow = '';
	}
}

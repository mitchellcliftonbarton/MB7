// Google Analytics 4 (gtag) helpers.
//
// Auto pageview tracking is disabled (send_page_view: false) because this is a
// SvelteKit SPA — pageviews are sent manually on each navigation (see the
// afterNavigate hook in routes/+layout.svelte).

export function loadGoogleAnalytics(measurementId) {
	if (typeof window === 'undefined') return; // client-side only

	window.dataLayer = window.dataLayer || [];
	function gtag() {
		window.dataLayer.push(arguments);
	}
	window.gtag = gtag;

	gtag('js', new Date());
	gtag('config', measurementId, { send_page_view: false });

	const script = document.createElement('script');
	script.async = true;
	script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
	document.head.appendChild(script);
}

// Guarded event helper so callers don't repeat the window/gtag checks.
export function trackEvent(name, params = {}) {
	if (typeof window !== 'undefined' && window.gtag) {
		window.gtag('event', name, params);
	}
}

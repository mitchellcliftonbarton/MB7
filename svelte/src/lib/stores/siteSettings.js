import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const STORAGE_KEY = 'siteSettings';

const defaults = {
	hideGrid: false,
	hideCurrentDate: false,
	hideAnnouncements: false,
	difficulty: 'easy',
};

function load() {
	if (!browser) return { ...defaults };
	try {
		const stored = localStorage.getItem(STORAGE_KEY);
		return stored ? { ...defaults, ...JSON.parse(stored) } : { ...defaults };
	} catch {
		return { ...defaults };
	}
}

export const siteSettings = writable(load());

// persist on every change (browser only)
if (browser) {
	siteSettings.subscribe((value) => {
		try {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
		} catch {
			// ignore (e.g. storage full or unavailable)
		}
	});
}

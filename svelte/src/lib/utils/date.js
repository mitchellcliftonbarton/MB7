// "Today" anchored to the studio's timezone (America/Denver), regardless of
// the machine clock. SSR hosts run on UTC, so from ~6pm Mountain onward the
// server's calendar date is already tomorrow — computing today from
// `new Date()` made SSR highlight the wrong day and hydration visibly snap it
// back. Entry dates are plain YYYY-MM-DD strings in studio time, so this is
// also the timezone that matches the data.

const TZ = 'America/Denver';

// { year, month, day } for the current date in studio time.
// `month` is 0-indexed to match Date#getMonth().
export function todayParts() {
	// en-CA formats as YYYY-MM-DD
	const [year, month, day] = new Intl.DateTimeFormat('en-CA', { timeZone: TZ })
		.format(new Date())
		.split('-')
		.map(Number);
	return { year, month: month - 1, day };
}

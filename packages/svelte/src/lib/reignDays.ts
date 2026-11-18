const MS_PER_DAY = 86_400_000;

/**
 * Whole days a reign lasted. A reign with no end date is still running, so it ends `now`.
 * (Pages are prerendered, so a running reign is counted up to the last build.)
 */
const reignDays = (start: string, end?: string | null, now: Date = new Date()): number => {
	const endMs = end ? new Date(end).getTime() : now.getTime();
	return Math.max(0, Math.floor((endMs - new Date(start).getTime()) / MS_PER_DAY));
};

export default reignDays;

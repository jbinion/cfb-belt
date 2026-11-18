// Games are dated in Eastern time, the de facto standard for US college football.
// Formatting in a fixed zone keeps prerendered output independent of the build machine's zone.
export const GAME_TIME_ZONE = 'America/New_York';

const formatDate = (date: string, options?: Intl.DateTimeFormatOptions) => {
	const defaultOptions: Intl.DateTimeFormatOptions = {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
		timeZone: GAME_TIME_ZONE,
	};
	const currentOptions = { ...defaultOptions, ...options };
	return new Date(date).toLocaleDateString('en-US', currentOptions);
};

// Kickoffs without an announced time are stored as midnight Eastern.
export const isKickoffTba = (date: string) =>
	new Date(date).toLocaleString('en-US', {
		timeZone: GAME_TIME_ZONE,
		hour: '2-digit',
		minute: '2-digit',
		hourCycle: 'h23',
	}) === '00:00';

export default formatDate;

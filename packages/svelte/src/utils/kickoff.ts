// Games are dated in Eastern time, the de facto standard for US college football.
// Formatting in a fixed zone keeps prerendered output independent of the build machine's zone.
export const GAME_TIME_ZONE = 'America/New_York';

// Kickoffs without an announced time are stored as midnight Eastern.
export const isKickoffTba = (date: string) =>
	new Date(date).toLocaleString('en-US', {
		timeZone: GAME_TIME_ZONE,
		hour: '2-digit',
		minute: '2-digit',
		hourCycle: 'h23',
	}) === '00:00';

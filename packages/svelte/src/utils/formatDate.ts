// Stored dates are UTC (historic games are date-only, at midnight UTC), so format in UTC.
// Without a fixed zone the output would depend on the machine doing the build.
const formatDate = (date: string, options?: Intl.DateTimeFormatOptions) => {
	const defaultOptions: Intl.DateTimeFormatOptions = {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
		timeZone: 'UTC',
	};
	const currentOptions = { ...defaultOptions, ...options };
	return new Date(date).toLocaleDateString('en-US', currentOptions);
};

export default formatDate;

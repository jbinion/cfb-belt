const formatDate = (date: string, options?: Intl.DateTimeFormatOptions) => {
	const defaultOptions: Intl.DateTimeFormatOptions = {
		year: 'numeric',
		month: 'short',
		day: 'numeric'
	};
	const currentOptions = { ...defaultOptions, ...options };
	return new Date(date).toLocaleDateString('en-US', currentOptions);
};

export default formatDate;

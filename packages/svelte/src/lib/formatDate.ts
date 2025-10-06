const formatDate = (date: string, options) => {
	const defaultOptions = { year: 'numeric', month: 'short', day: 'numeric' };
	const currentOptions = { ...defaultOptions, ...options };
	return new Date(date).toLocaleDateString('en-US', currentOptions);
};
export default formatDate;

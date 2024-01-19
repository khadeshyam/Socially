export const removeLogsInProduction = () => {
	if (process.env.NODE_ENV !== "development") {
		console.log = () => { };
		console.debug = () => { };
		console.info = () => { };
		console.warn = () => { };
	}
};
export const jwtExp = (jwt) => {
	const date = new Date(0);
	date.setUTCSeconds(jwt.exp);
	return date;
};

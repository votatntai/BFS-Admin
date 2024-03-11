/**
 * Configuration object containing the authentication service API endpoints
 */
const jwtServiceConfig = {
	signIn: 'https://bfs.monoinfinity.net/api/auth/managers',
	signUp: 'https://bfs.monoinfinity.net/api/managers/registrations',
	accessToken: 'api/auth/access-token',
	updateUser: 'api/auth/user/update'
};

export default jwtServiceConfig;

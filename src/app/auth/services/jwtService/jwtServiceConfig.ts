/**
 * Configuration object containing the authentication service API endpoints
 */
const jwtServiceConfig = {
	signIn: 'https://bfs.monoinfinity.net/api/auth/admins',
	signUp: 'https://bfs.monoinfinity.net/api/managers/registrations',
	accessToken: 'https://bfs.monoinfinity.net/api/admins/informations',
	updateUser: 'api/auth/user/update'
};

export default jwtServiceConfig;

import lazyWithReducer from 'app/store/lazyWithReducer';
import reducer from './store/rootReducer'
const Account = lazyWithReducer('accountReducer', () => import('./Account'), reducer);

/**
 * The Account page config.
 */
const AccountConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'account',
			element: <Account />
		}
	]
};

export default AccountConfig;

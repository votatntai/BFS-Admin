import lazyWithReducer from 'app/store/lazyWithReducer';
import reducer from '../store/rootReducer'
const Farm = lazyWithReducer('farmReducer', () => import('./Farm'), reducer);

/**
 * The Account page config.
 */
const FarmConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'master-data/farm',
			element: <Farm />
		}
	]
};

export default FarmConfig;

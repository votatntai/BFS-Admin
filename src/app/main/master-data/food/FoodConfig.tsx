import lazyWithReducer from 'app/store/lazyWithReducer';
import reducer from '../store/rootReducer'
const Food = lazyWithReducer('foodReducer', () => import('./Food'), reducer);

/**
 * The Account page config.
 */
const FoodConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'master-data/food',
			element: <Food />
		}
	]
};

export default FoodConfig;

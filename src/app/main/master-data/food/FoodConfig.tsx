import lazyWithReducer from 'app/store/lazyWithReducer';
import reducer from '../store/rootReducer'
const Food = lazyWithReducer('foodReducer', () => import('./Food'), reducer);
import FarmSelect from './Farm/FarmSelect';

/**
 * The Account page config.
 */
const FoodConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'master-data/food/select-farm/foods/:id',
			element: <Food />
		},
		{
			path: 'master-data/food/select-farm',
			element: <FarmSelect />
		},
	]
};

export default FoodConfig;

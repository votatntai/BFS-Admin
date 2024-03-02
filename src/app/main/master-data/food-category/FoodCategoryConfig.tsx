import lazyWithReducer from 'app/store/lazyWithReducer';
import reducer from '../store/rootReducer'
const FoodCategory = lazyWithReducer('foodCategoryReducer', () => import('./FoodCategory'), reducer);

/**
 * The Account page config.
 */
const FoodCategoryConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'master-data/food-category',
			element: <FoodCategory />
		}
	]
};

export default FoodCategoryConfig;

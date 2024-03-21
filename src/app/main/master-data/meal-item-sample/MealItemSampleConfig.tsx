import lazyWithReducer from 'app/store/lazyWithReducer';
import reducer from '../store/rootReducer';
import { lazy } from 'react';
const MealItemSample = lazyWithReducer('mealItemSampleReducer', () => import('./MealItemSample'), reducer);
const MealItemSampleDetail = lazy(() => import('../meal-item-sample/detail-page/MealItemSampleDetail'));

/**
 * The Account page config.
 */
const MealItemSampleConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'master-data/meal-item-sample',
			element: <MealItemSample />
		},
		{
			path: 'master-data/meal-item-sample/:id/',
			element: <MealItemSampleDetail />
		}
	]
};

export default MealItemSampleConfig;

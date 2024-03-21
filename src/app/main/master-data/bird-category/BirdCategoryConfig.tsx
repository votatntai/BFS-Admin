import lazyWithReducer from 'app/store/lazyWithReducer';
import reducer from '../store/rootReducer';
import { lazy } from 'react';
const BirdCategory = lazyWithReducer('birdCategoryReducer', () => import('./BirdCategory'), reducer);
const BirdCategoryDetail = lazy(() => import('./detail-page/BirdCategoryDetail'));

/**
 * The Account page config.
 */
const BirdCategoryConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'master-data/bird-category',
			element: <BirdCategory />
		},
		{
			path: 'master-data/bird-category/:id/',
			element: <BirdCategoryDetail />
		}
	]
};

export default BirdCategoryConfig;

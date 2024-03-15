import lazyWithReducer from 'app/store/lazyWithReducer';
import reducer from '../store/rootReducer';
import { lazy } from 'react';
const Bird = lazyWithReducer('birdReducer', () => import('./Bird'), reducer);
const BirdDetail = lazy(() => import('./detail-page/BirdDetail'));

/**
 * The Account page config.
 */
const BirdConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'master-data/bird',
			element: <Bird />
		},
		{
			path: 'master-data/bird/:id/',
			element: <BirdDetail />
		}
	]
};

export default BirdConfig;

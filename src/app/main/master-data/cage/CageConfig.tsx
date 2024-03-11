import lazyWithReducer from 'app/store/lazyWithReducer';
import reducer from '../store/rootReducer';
import { lazy } from 'react';
const Cage = lazyWithReducer('cageReducer', () => import('./Cage'), reducer);
const CageDetail = lazy(() => import('./detail-page/CageDetail'));

/**
 * The Account page config.
 */
const CageConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'master-data/cage',
			element: <Cage />
		},
		{
			path: 'master-data/cage/:id/',
			element: <CageDetail />
		}
	]
};

export default CageConfig;

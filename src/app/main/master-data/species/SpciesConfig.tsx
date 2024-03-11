import lazyWithReducer from 'app/store/lazyWithReducer';
import reducer from '../store/rootReducer';
import { lazy } from 'react';
const Species = lazyWithReducer('speciesReducer', () => import('./Species'), reducer);
const SpeciesDetail = lazy(() => import('./detail-page/SpeciesDetail'));

/**
 * The Account page config.
 */
const SpciesConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'master-data/species',
			element: <Species />
		},
		{
			path: 'master-data/species/:id/',
			element: <SpeciesDetail />
		}
	]
};

export default SpciesConfig;

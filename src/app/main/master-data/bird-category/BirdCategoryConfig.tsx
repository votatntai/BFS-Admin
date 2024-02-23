import lazyWithReducer from 'app/store/lazyWithReducer';
import reducer from '../store/rootReducer'
const BirdCategory = lazyWithReducer('birdCategoryReducer', () => import('./BirdCategory'), reducer);

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
		}
	]
};

export default BirdCategoryConfig;

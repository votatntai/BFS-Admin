import lazyWithReducer from 'app/store/lazyWithReducer';
import reducer from '../store/rootReducer'
const Bird = lazyWithReducer('birdReducer', () => import('./Bird'), reducer);

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
		}
	]
};

export default BirdConfig;

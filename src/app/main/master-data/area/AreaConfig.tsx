import lazyWithReducer from 'app/store/lazyWithReducer';
import reducer from '../store/rootReducer'
const Area = lazyWithReducer('areaReducer', () => import('./Area'), reducer);

/**
 * The Account page config.
 */
const AreaConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'master-data/area',
			element: <Area />
		}
	]
};

export default AreaConfig;

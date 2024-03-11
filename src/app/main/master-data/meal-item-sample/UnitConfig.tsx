import lazyWithReducer from 'app/store/lazyWithReducer';
import reducer from '../store/rootReducer'
const Unit = lazyWithReducer('unitReducer', () => import('./Unit'), reducer);

/**
 * The Account page config.
 */
const UnitConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'master-data/unit',
			element: <Unit />
		}
	]
};

export default UnitConfig;

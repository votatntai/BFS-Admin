import lazyWithReducer from 'app/store/lazyWithReducer';
import reducer from '../store/rootReducer'
const Caremode = lazyWithReducer('caremodeReducer', () => import('./Caremode'), reducer);

/**
 * The Account page config.
 */
const CaremodeConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'master-data/care-mode',
			element: <Caremode />
		}
	]
};

export default CaremodeConfig;

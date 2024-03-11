import lazyWithReducer from 'app/store/lazyWithReducer';
import reducer from '../store/rootReducer'
const MenuSample = lazyWithReducer('menuSampleReducer', () => import('./MenuSample'), reducer);

/**
 * The Account page config.
 */
const MenuSampleConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'master-data/menu-sample',
			element: <MenuSample />
		}
	]
};

export default MenuSampleConfig;

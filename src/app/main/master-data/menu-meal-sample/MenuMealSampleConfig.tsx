import lazyWithReducer from 'app/store/lazyWithReducer';
import reducer from '../store/rootReducer'
const MenuMealSample = lazyWithReducer('menuMealSampleReducer', () => import('./MenuMealSample'), reducer);

const MenuMealSampleConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'master-data/menu-meal-sample',
			element: <MenuMealSample />
		}
	]
};

export default MenuMealSampleConfig;

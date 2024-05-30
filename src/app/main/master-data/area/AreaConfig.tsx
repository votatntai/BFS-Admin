import lazyWithReducer from 'app/store/lazyWithReducer';
import reducer from '../store/rootReducer'
const Area = lazyWithReducer('areaReducer', () => import('./Area'), reducer);
import FarmSelect from './Farm/FarmSelect';
const AreaConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'master-data/select-farm/area/:id',
			element: <Area />
		},
		{
			path: 'master-data/select-farm',
			element: <FarmSelect />
		},
	]
};

export default AreaConfig;

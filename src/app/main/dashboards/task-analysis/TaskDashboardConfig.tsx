import lazyWithReducer from 'app/store/lazyWithReducer';
import reducer from './store';

const TaskDashBoard = lazyWithReducer('dashboards', () => import('./TaskDashBoard'), reducer);


const TaskDashboardConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: 'dashboard',
			element: <TaskDashBoard />
		}
	]
};

export default TaskDashboardConfig;

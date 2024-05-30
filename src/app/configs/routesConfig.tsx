import FuseLoading from '@fuse/core/FuseLoading';
import FuseUtils from '@fuse/utils';
import { FuseRouteConfigsType, FuseRoutesType } from '@fuse/utils/FuseUtils';
import settingsConfig from 'app/configs/settingsConfig';
import { Navigate } from 'react-router-dom';
import Error404Config from '../main/404/Error404Config';
import Error404Page from '../main/404/Error404Page';
import AccountConfig from '../main/account/AccountConfig';
import AreaConfig from '../main/master-data/area/AreaConfig';
import BirdCategoryConfig from '../main/master-data/bird-category/BirdCategoryConfig';
import BirdConfig from '../main/master-data/bird/BirdConfig';
import CageConfig from '../main/master-data/cage/CageConfig';
import CaremodeConfig from '../main/master-data/care-mode/CaremodeConfig';
import FarmConfig from '../main/master-data/farm/FarmConfig';
import FoodCategoryConfig from '../main/master-data/food-category/FoodCategoryConfig';
import FoodConfig from '../main/master-data/food/FoodConfig';
import MenuSampleConfig from '../main/master-data/menu-sample/MenuSampleConfig';
import SpciesConfig from '../main/master-data/species/SpciesConfig';
import UnitConfig from '../main/master-data/unit/UnitConfig';
import SignInConfig from '../main/sign-in/SignInConfig';
import SignOutConfig from '../main/sign-out/SignOutConfig';
import SignUpConfig from '../main/sign-up/SignUpConfig';
import DashboardsConfigs from '../main/dashboards/dashboardsConfig';
const routeConfigs: FuseRouteConfigsType = [
	...DashboardsConfigs,
	MenuSampleConfig, UnitConfig,
	SpciesConfig, AccountConfig, FoodCategoryConfig, FoodConfig, CaremodeConfig, AreaConfig, FarmConfig, BirdConfig, BirdCategoryConfig, CageConfig, 
	SignOutConfig, SignInConfig, SignUpConfig, Error404Config ];

/**
 * The routes of the application.
 */
const routes: FuseRoutesType = [
	...FuseUtils.generateRoutesFromConfigs(routeConfigs, settingsConfig.defaultAuth),
	{
		path: '/',
		element: <Navigate to="/account" />,
		auth: settingsConfig.defaultAuth
	},
	{
		path: 'loading',
		element: <FuseLoading />
	},
	{
		path: '404',
		element: <Error404Page />
	},
	{
		path: '*',
		element: <Navigate to="404" />
	}
];

export default routes;

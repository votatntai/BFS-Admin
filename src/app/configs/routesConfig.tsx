import FuseUtils from '@fuse/utils';
import FuseLoading from '@fuse/core/FuseLoading';
import { Navigate } from 'react-router-dom';
import settingsConfig from 'app/configs/settingsConfig';
import { FuseRouteConfigsType, FuseRoutesType } from '@fuse/utils/FuseUtils';
import SignInConfig from '../main/sign-in/SignInConfig';
import SignUpConfig from '../main/sign-up/SignUpConfig';
import SignOutConfig from '../main/sign-out/SignOutConfig';
import Error404Page from '../main/404/Error404Page';
import Error404Config from '../main/404/Error404Config';
import AccountConfig from '../main/account/AccountConfig';
import BirdConfig from '../main/master-data/bird/BirdConfig';
import BirdCategoryConfig from '../main/master-data/bird-category/BirdCategoryConfig';
import FarmConfig from '../main/master-data/farm/FarmConfig';
import AreaConfig from '../main/master-data/area/AreaConfig';
import CaremodeConfig from '../main/master-data/care-mode/CaremodeConfig';
import FoodCategoryConfig from '../main/master-data/food-category/FoodCategoryConfig';
import FoodConfig from '../main/master-data/food/FoodConfig';
import UnitConfig from '../main/master-data/unit/UnitConfig';
import MenuSampleConfig from '../main/master-data/menu-sample/MenuSampleConfig';
import SpciesConfig from '../main/master-data/species/SpciesConfig';
import CageConfig from '../main/master-data/cage/CageConfig';
const routeConfigs: FuseRouteConfigsType = [MenuSampleConfig,UnitConfig,
	SpciesConfig,AccountConfig, FoodCategoryConfig,FoodConfig,
	CaremodeConfig,AreaConfig, FarmConfig, BirdConfig, BirdCategoryConfig,CageConfig,
	SignOutConfig, SignInConfig, SignUpConfig, Error404Config];[]

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

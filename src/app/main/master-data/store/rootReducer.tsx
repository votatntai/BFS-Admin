import { combineReducers } from '@reduxjs/toolkit';
import areaSlice from '../area/slice/areaSlice';
import birdCategory from '../bird-category/store/birdCategoryDetailSlice';
import birdCategories from '../bird-category/store/birdCategorySlice';
import bird from '../bird/store/birdDetailSlice';
import birds from '../bird/store/birdSlice';
import cage from '../cage/store/cageDetailSlice';
import cages from '../cage/store/cageSlice';
import caremodeSlice from '../care-mode/slice/caremodeSlice';
import farmSlice from '../farm/slice/farmSlice';
import foodCategorySlice from '../food-category/slice/foodCategorySlice';
import foodSlice from '../food/slice/foodSlice';
import species from '../species/store/SpeciesDetailSlice';
import speciesList from '../species/store/SpecisesSlice';
import unitSlice from '../unit/slice/unitSlice';
import menuSamples from '../menu-sample/store/menuSamplesSlice';
import menus from '../menu-sample/store/menusSlice'

const reducer = combineReducers({
    bird,
    birds,
    cage,
    cages,
    species,
    speciesList,
    birdCategory,
    birdCategories,
    farmSlice,
    areaSlice,
    caremodeSlice,
    foodCategorySlice,
    foodSlice,
    unitSlice,
    menuSamples,
    menus
})

export default reducer
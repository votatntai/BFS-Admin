import { combineReducers } from '@reduxjs/toolkit';
import speciesList from '../species/store/SpecisesSlice'
import species from   '../species/store/SpeciesDetailSlice'
import cage from   '../cage/store/cageDetailSlice'
import cages from   '../cage/store/cageSlice'
import birdCategories from '../bird-category/store/birdCategorySlice'
import birdCategory from '../bird-category/store/birdCategoryDetailSlice'
import birdSlice from '../bird/slice/birdSlice';
import farmSlice from '../farm/slice/farmSlice';
import areaSlice from '../area/slice/areaSlice';
import caremodeSlice from '../care-mode/slice/caremodeSlice'
import foodCategorySlice from '../food-category/slice/foodCategorySlice'
import foodSlice from '../food/slice/foodSlice'
import unitSlice from '../unit/slice/unitSlice'
import menuSampleSlice from '../menu-sample/slice/menuSampleSlice'
import menuMealSampleSlice from '../menu-meal-sample/slice/menuMealSampleSlice';
const reducer = combineReducers({
    cage,
    cages,
    species,
    speciesList,
    birdCategory,
    birdCategories,
    birdSlice,
    farmSlice,
    areaSlice,
    caremodeSlice,
    foodCategorySlice,
    foodSlice,
    unitSlice,
    menuSampleSlice,
    menuMealSampleSlice
})

export default reducer
import { combineReducers } from '@reduxjs/toolkit';

import birdSlice from '../bird/slice/birdSlice';
import farmSlice from '../farm/slice/farmSlice';
import areaSlice from '../area/slice/areaSlice';
import caremodeSlice from '../care-mode/slice/caremodeSlice'
import foodCategorySlice from '../food-category/slice/foodCategorySlice'
import foodSlice from '../food/slice/foodSlice'
import unitSlice from '../unit/slice/unitSlice'
const reducer = combineReducers({
    birdSlice,
    farmSlice,
    areaSlice,
    caremodeSlice,
    foodCategorySlice,
    foodSlice,
    unitSlice
})

export default reducer
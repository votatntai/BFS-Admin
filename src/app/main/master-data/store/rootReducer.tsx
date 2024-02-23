import { combineReducers } from '@reduxjs/toolkit';

import birdSlice from '../bird/slice/birdSlice';
import farmSlice from '../farm/slice/farmSlice';
import areaSlice from '../area/slice/areaSlice';
const reducer = combineReducers({
    birdSlice,
    farmSlice,
    areaSlice
})

export default reducer
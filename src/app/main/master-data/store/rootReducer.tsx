import { combineReducers } from '@reduxjs/toolkit';

import birdSlice from '../bird/slice/birdSlice';
import farmSlice from '../farm/slice/farmSlice';
import areaSlice from '../area/slice/areaSlice';
import caremodeSlice from '../care-mode/slice/caremodeSlice'
const reducer = combineReducers({
    birdSlice,
    farmSlice,
    areaSlice,
    caremodeSlice
})

export default reducer
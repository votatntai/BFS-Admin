import { combineReducers } from '@reduxjs/toolkit';
import tasks from './widgetsSlice';

/**
 * The Dashboard analytics store reducer
 */
const reducer = combineReducers({
	tasks
});

export default reducer;

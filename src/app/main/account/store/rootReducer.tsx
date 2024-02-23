import accountsSlice from "./accountSlice";
import { combineReducers } from '@reduxjs/toolkit';
const reducer = combineReducers({
    accountsSlice,
})
export default reducer
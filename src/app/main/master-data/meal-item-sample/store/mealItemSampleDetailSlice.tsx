import { createSlice } from '@reduxjs/toolkit';
import createAppAsyncThunk from 'app/store/createAppAsyncThunk';
import { RootStateType } from 'app/store/types';
import axios from 'axios';
import { MealItemSampleType } from '../type/MealItemSampleType';


export type AppRootStateType = RootStateType<MealItemSampleDetailSliceType>;

/**
 * Get MealItemSample from server by id
 */
export const getMealItemSample = createAppAsyncThunk<MealItemSampleType, string>(
    'mealItemSampleReducer/MealItemSample/getMealItemSample',
    async (Id) => {
        
        const response = await axios.get(`/MealItemSamples/${Id}`);

        const data = (await response.data) as MealItemSampleType;

        return data;
    }
);
// post MealItemSample Caategory
export const createMealItemSample = createAppAsyncThunk<any, any>(
    'mealItemSampleReducer/MealItemSample/createMealItemSample',
    async (dataItem) => {
        const response = await axios.post(`/MealItemSamples/`, dataItem);

        const data = (await response.data);

        return data;
    }
);

/**
 * Save saveMealItemSampleCategory
 */
export const saveMealItemSample = createAppAsyncThunk<MealItemSampleType, MealItemSampleType>(
    'mealItemSampleReducer/MealItemSample/saveMealItemSample',
    async (form, { getState }) => {
        const AppState = getState() as AppRootStateType;

        const { id } = AppState.mealItemSampleReducer.MealItemSample.data as MealItemSampleType;

        const response = await axios.put(`/MealItemSamples/${id}`, form);

        const data = (await response.data) as MealItemSampleType;

        return data;
    }
);

const initialState: any = {
    data: null,
    status: 'idle'
};

/**
 * The MealItemSampleCategory Detail Slice 
 */
export const MealItemSampleDetailSlice = createSlice({
    name: 'mealItemSampleReducer/MealItemSample',
    initialState,
    reducers: {
        reaset: () => initialState,
        newItem: (state) => {
			state.data ={name:''};
            
		}
    },
    extraReducers: (builder) => {
        builder
            .addCase(getMealItemSample.fulfilled, (state, action) => {
                state.data = action.payload;
                state.status = 'succeeded';
            })

            .addCase(createMealItemSample.fulfilled, (state, action) => {
              state.status = 'succeeded';
            })

    }
});

export const selectDetail = (state: AppRootStateType) => state.mealItemSampleReducer.MealItemSample.data;

export const {newItem,  reaset } = MealItemSampleDetailSlice.actions;

export type MealItemSampleDetailSliceType = typeof MealItemSampleDetailSlice;
export default MealItemSampleDetailSlice.reducer;

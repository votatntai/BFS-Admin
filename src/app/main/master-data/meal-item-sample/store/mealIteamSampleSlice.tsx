import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import createAppAsyncThunk from 'app/store/createAppAsyncThunk';
import { RootStateType } from 'app/store/types';
import axios from 'axios';
import { MealItemSampleType, MealItemSamplesType } from '../type/MealItemSampleType';

export type AppRootStateType = RootStateType<MealItemSamplesSliceType>;


export const getMealItemSamples= createAppAsyncThunk<MealItemSamplesType>('mealItemSampleReducer/MealItemSamples/getMealItemSamples', async () => {
	const response = await axios.get('/meal-item-samples');
	const data = (await response.data) ;
	return data;
});

const mealItemSamplesAdapter = createEntityAdapter<MealItemSampleType>({});

export const { selectAll: selectMealItemSamplesList,selectById:selcetSpeciesById } = mealItemSamplesAdapter.getSelectors(
	(state: AppRootStateType) => state.mealItemSampleReducer.MealItemSamples
);

const initialState = mealItemSamplesAdapter.getInitialState({
	searchText: '',
	pagination :{},
});


export const MealItemSamplesSlice = createSlice({
	name: 'mealItemSampleReducer/MealItemSamples',
	initialState,
	reducers:  {
		setSearchText: (state, action) => {
			state.searchText = action.payload as string;
		}
		
	},
	extraReducers: (builder) => {
		builder
            .addCase(getMealItemSamples.fulfilled, (state, action) => {
				mealItemSamplesAdapter.setAll(state, action.payload.data);
				state.pagination=action.payload.pagination;
				state.searchText = '';
            })
		
	
		
	}
});

export const { setSearchText } = MealItemSamplesSlice.actions;

export const selectSearchText = (state: AppRootStateType) => state.mealItemSampleReducer?.MealItemSamples.searchText;

export const selectMealItemSamples = (state)=>state.mealItemSampleReducer?.MealItemSamples;
export type MealItemSamplesSliceType = typeof MealItemSamplesSlice;
export default MealItemSamplesSlice.reducer;

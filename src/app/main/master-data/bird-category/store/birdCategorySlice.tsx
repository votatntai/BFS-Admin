import axios from 'axios';
import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import createAppAsyncThunk from 'app/store/createAppAsyncThunk';
import { RootStateType } from 'app/store/types';
import { BirdCategoriesType, BirdCategoryType } from '../type/BirdCategoryType';
import { data } from 'autoprefixer';

export type AppRootStateType = RootStateType<birdCategorySliceType>;


export const getBirdCategories = createAppAsyncThunk<BirdCategoriesType>('birdCategoryReducer/getBirdCategories', async () => {
	const response = await axios.get('/bird-categories');
	const data = (await response.data) ;
	return data;
});

const birdCatehoryAdapter = createEntityAdapter<BirdCategoryType>({});

export const { selectAll: selectBirdCategories,selectById:selectBirdCategoryById } = birdCatehoryAdapter.getSelectors(
	(state: AppRootStateType) => state.birdCategoryReducer.birdCategories
);

const initialState = birdCatehoryAdapter.getInitialState({
	searchText: '',
	pagination :{},
	

});


export const birdCategorySlice = createSlice({
	name: 'birdCategoryReducer/birdCategories',
	initialState,
	reducers:  {
		setBirdCategorySearchText: (state, action) => {
			state.searchText = action.payload as string;
		}
	},
	extraReducers: (builder) => {
		builder
            .addCase(getBirdCategories.fulfilled, (state, action) => {
				birdCatehoryAdapter.setAll(state, action.payload.data);
				state.pagination=action.payload.pagination;
				state.searchText = '';
            })
		
	
		
	}
});

export const { setBirdCategorySearchText } = birdCategorySlice.actions;

export const selectBirdCategorySearchText = (state: AppRootStateType) => state.birdCategoryReducer?.birdCategories.searchText;

export const selectBirdCategory = (state)=>state.birdCategoryReducer.birdCategories
export type birdCategorySliceType = typeof birdCategorySlice;
export default birdCategorySlice.reducer;

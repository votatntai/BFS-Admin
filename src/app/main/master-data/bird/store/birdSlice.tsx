import axios from 'axios';
import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import createAppAsyncThunk from 'app/store/createAppAsyncThunk';
import { RootStateType } from 'app/store/types';
import { BirdType, BirdsType } from '../type/BirdType';

export type AppRootStateType = RootStateType<BirdsSliceType>;


export const getBirds = createAppAsyncThunk<any, any>('birdReducer/Birds/getBirds', async (farmId) => {
	if (farmId) {
		const response = await axios.get(`/birds?pageSize=9999&farmId=${farmId}`);
		const data = (await response.data);
		return data;
	}else{
		const response = await axios.get(`/birds?pageSize=9999`);
		const data = (await response.data);
		return data;
	}
});

const birdAdapter = createEntityAdapter<BirdType>({});

export const { selectAll: selectBirds, selectById: selcetSpeciesById } = birdAdapter.getSelectors(
	(state: AppRootStateType) => state.birdReducer.birds
);

const initialState = birdAdapter.getInitialState({
	searchText: '',
	pagination: {},
});


export const BirdsSlice = createSlice({
	name: 'birdReducer/birds',
	initialState,
	reducers: {
		setSearchText: (state, action) => {
			state.searchText = action.payload as string;
		}

	},
	extraReducers: (builder) => {
		builder
			.addCase(getBirds.fulfilled, (state, action) => {
				birdAdapter.setAll(state, action.payload.data);
				state.pagination = action.payload.pagination;
				state.searchText = '';
			})



	}
});

export const { setSearchText } = BirdsSlice.actions;

export const selectSearchText = (state: AppRootStateType) => state.birdReducer?.birds.searchText;

export type BirdsSliceType = typeof BirdsSlice;
export default BirdsSlice.reducer;

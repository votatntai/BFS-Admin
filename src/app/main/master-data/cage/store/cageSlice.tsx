import axios from 'axios';
import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import createAppAsyncThunk from 'app/store/createAppAsyncThunk';
import { RootStateType } from 'app/store/types';
import { CageType, CagesType } from '../type/CageType';

export type AppRootStateType = RootStateType<cagesSliceType>;


export const getCages= createAppAsyncThunk<CagesType>('cageReducer/cages/getCages', async () => {
	const response = await axios.get('/cages');
	const data = (await response.data) ;
	return data;
});

const cagesAdapter = createEntityAdapter<CageType>({});

export const { selectAll: selectCages,selectById:selcetSpeciesById } = cagesAdapter.getSelectors(
	(state: AppRootStateType) => state.cageReducer.cages
);

const initialState = cagesAdapter.getInitialState({
	searchText: '',
	pagination :{},
});


export const cagesSlice = createSlice({
	name: 'cageReducer/cages',
	initialState,
	reducers:  {
		setSearchText: (state, action) => {
			state.searchText = action.payload as string;
		}
		
	},
	extraReducers: (builder) => {
		builder
            .addCase(getCages.fulfilled, (state, action) => {
				cagesAdapter.setAll(state, action.payload.data);
				state.pagination=action.payload.pagination;
				state.searchText = '';
            })
		
	
		
	}
});

export const { setSearchText } = cagesSlice.actions;

export const selectCageSearchText = (state: AppRootStateType) => state.cageReducer?.cages.searchText;

export const selectCage = (state)=>state.cageReducer?.cages;
export type cagesSliceType = typeof cagesSlice;
export default cagesSlice.reducer;

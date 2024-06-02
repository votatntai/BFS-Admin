import axios from 'axios';
import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import createAppAsyncThunk from 'app/store/createAppAsyncThunk';
import { RootStateType } from 'app/store/types';
import { data } from 'autoprefixer';
import { SpeicesListType, SpeicesType } from '../type/SpeciesType';

export type AppRootStateType = RootStateType<speciesListSliceType>;

// get List
export const getSpeciesList= createAppAsyncThunk<SpeicesListType>('speciesReducer/getSpecies', async () => {
	const response = await axios.get('/species');
	const data = (await response.data) ;
	return data;
});
// create adapter
const speciesAdapter = createEntityAdapter<SpeicesType>({});
// select
export const { selectAll: selectSpecieslist,selectById:selcetSpeciesById } = speciesAdapter.getSelectors(
	(state: AppRootStateType) => state.speciesReducer.speciesList
);

const initialState = speciesAdapter.getInitialState({
	searchText: '',
	pagination :{},

});

//List slice
export const speciesListSlice = createSlice({
	name: 'speciesReducer/speciesList',
	initialState,
	reducers:  {
		setSpeciesSearchText: (state, action) => {
			state.searchText = action.payload as string;
		}
	},
	extraReducers: (builder) => {
		builder
            .addCase(getSpeciesList.fulfilled, (state, action) => {
				speciesAdapter.setAll(state, action.payload.data);
				state.pagination=action.payload.pagination;
				state.searchText = '';
            })
		
	
		
	}
});

export const { setSpeciesSearchText } = speciesListSlice.actions;

export const selectSpeciesSearchText = (state: AppRootStateType) => state.speciesReducer?.speciesList.searchText;

export const selectSpecies = (state)=>state.speciesReducer?.speciesList;
export type speciesListSliceType = typeof speciesListSlice;
export default speciesListSlice.reducer;

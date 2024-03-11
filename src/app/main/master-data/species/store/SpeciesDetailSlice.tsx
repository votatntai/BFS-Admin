import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import createAppAsyncThunk from 'app/store/createAppAsyncThunk';
import { AsyncStateType, RootStateType } from 'app/store/types';
import { SpeicesType } from '../type/SpeciesType';


export type AppRootStateType = RootStateType<birdCategoryDetailSliceType>;

/**
 * Get birdCategory from server by id
 */
export const getSpecies = createAppAsyncThunk<SpeicesType, string>(
    'speciesReducer/species/getSpecies',
    async (Id) => {
        
        const response = await axios.get(`/species/${Id}`);

        const data = (await response.data) as SpeicesType;

        return data;
    }
);
// post bird Caategory
export const createSpecies = createAppAsyncThunk<any, any>(
    'speciesReducer/species/createSpecies',
    async (dataItem) => {
        const response = await axios.post(`/species/`, dataItem);

        const data = (await response.data);

        return data;
    }
);

/**
 * Save saveBirdCategory
 */
export const saveSpecies = createAppAsyncThunk<SpeicesType, SpeicesType>(
    'speciesReducer/species/saveSpecies',
    async (form, { getState }) => {
        const AppState = getState() as AppRootStateType;

        const { id } = AppState.speciesReducer.species.data as SpeicesType;

        const response = await axios.put(`/api/ecommerce/products/${id}`, form);

        const data = (await response.data) as SpeicesType;

        return data;
    }
);

const initialState: AsyncStateType<SpeicesType> = {
    data: null,
    status: 'idle'
};

/**
 * The birdCategory Detail Slice 
 */
export const speciesDetailSlice = createSlice({
    name: 'speciesReducer/species',
    initialState,
    reducers: {
        reaset: () => initialState,
      
    },
    extraReducers: (builder) => {
        builder
            .addCase(getSpecies.fulfilled, (state, action) => {
                state.data = action.payload;
                state.status = 'succeeded';
            })

            .addCase(createSpecies.fulfilled, (state, action) => {
              state.status = 'succeeded';
            })

    }
});

export const selectDetail = (state: AppRootStateType) => state.speciesReducer.species.data;

export const {  reaset } = speciesDetailSlice.actions;

export type birdCategoryDetailSliceType = typeof speciesDetailSlice;
export default speciesDetailSlice.reducer;

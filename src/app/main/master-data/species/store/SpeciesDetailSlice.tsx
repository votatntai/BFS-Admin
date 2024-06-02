import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import createAppAsyncThunk from 'app/store/createAppAsyncThunk';
import { AsyncStateType, RootStateType } from 'app/store/types';
import { SpeicesType } from '../type/SpeciesType';

// Nha Kho
export type AppRootStateType = RootStateType<speciesDetailSliceType>;

/**
 * Get item by Id
 */
export const getSpecies = createAppAsyncThunk<SpeicesType, string>(
    'speciesReducer/species/getSpecies',
    async (Id) => {

        const response = await axios.get(`/species/${Id}`);

        const data = (await response.data) as SpeicesType;

        return data;
    }
);
// post
export const createSpecies = createAppAsyncThunk<any, any>(
    'speciesReducer/species/createSpecies',
    async (dataItem) => {
        const response = await axios.post(`/species/`, dataItem);

        const data = (await response.data);

        return data;
    }
);

/**
 * Save 
 */
export const saveSpecies = createAppAsyncThunk<SpeicesType, any>(
    'speciesReducer/species/saveSpecies',
    async ({ id, formSave }) => {
 
        const response = await axios.put(`/species/${id}`, formSave);

        const data = (await response.data) as SpeicesType;

        return data;
    }
);

const initialState: AsyncStateType<SpeicesType> = {
    data: null,
    status: 'idle'
}

/**
 * The Detail Slice 
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

export const selectDetail = (state: AppRootStateType) => state.speciesReducer.species.data

export const { reaset } = speciesDetailSlice.actions;

export type speciesDetailSliceType = typeof speciesDetailSlice;
export default speciesDetailSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import createAppAsyncThunk from 'app/store/createAppAsyncThunk';
import { AsyncStateType, RootStateType } from 'app/store/types';
import { CageType } from '../type/CageType';
import CageModels from '../Model/CageModel';


export type AppRootStateType = RootStateType<cageDetailSliceType>;

// Gert
export const getCage = createAppAsyncThunk<CageType, string>(
    'cageReducer/cage/getCage',
    async (Id) => {

        const response = await axios.get(`/cages/${Id}`);

        const data = (await response.data) as CageType;

        return data;
    }
);
// post 
export const createCage = createAppAsyncThunk<any, any>(
    'cageReducer/cage/createCage',
    async (dataItem) => {
        const response = await axios.post(`/cages/`, dataItem);

        const data = (await response.data);

        return data;
    }
);

/**
 * Save
 */
export const saveCage = createAppAsyncThunk<any, any>(
    'cageReducer/cage/saveCage',
    async ({ id, formSave }) => {
        const response = await axios.put(`/cages/${id}`, formSave);

        const data = (await response.data);

        return data;
    }
);

const initialState: AsyncStateType<CageType> = {
    data: null,
    status: 'idle'
};

/**
 * The birdCategory Detail Slice 
 */
export const cageDetailSlice = createSlice({
    name: 'cageReducer/cage',
    initialState,
    reducers: {
        reaset: () => initialState,
        newProduct: (state) => {
            //	state.data = CageModels({});
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCage.fulfilled, (state, action) => {
                state.data = action.payload;
                state.status = 'succeeded';
            })

            .addCase(createCage.fulfilled, (state, action) => {
                state.status = 'succeeded';
            })

    }
});

export const selectDetail = (state: AppRootStateType) => state.cageReducer.cage.data;

export const { newProduct, reaset } = cageDetailSlice.actions;

export type cageDetailSliceType = typeof cageDetailSlice;
export default cageDetailSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import createAppAsyncThunk from 'app/store/createAppAsyncThunk';
import { AsyncStateType, RootStateType } from 'app/store/types';
import { BirdType } from '../type/BirdType';
import BirdModels from '../Model/BirdModel';


export type AppRootStateType = RootStateType<birdDetailSliceType>;

/**
 * Get birdCategory from server by id
 */
export const getBird = createAppAsyncThunk<BirdType, string>(
    'birdReducer/bird/getBird',
    async (Id) => {

        const response = await axios.get(`/birds/${Id}`);

        const data = (await response.data) as BirdType;

        return data;
    }
);
// post bird Caategory
export const createBird = createAppAsyncThunk<any, any>(
    'birdReducer/bird/createBird',
    async (dataItem) => {
        console.log("dataItem", dataItem)
        const response = await axios.post(`/birds/`, dataItem);

        const data = (await response.data);

        return data;
    }
);

/**
 * Save saveBirdCategory
 */
export const saveBird = createAppAsyncThunk<BirdType, any>(
    'birdReducer/bird/saveBird',
    async ({ id, formSave }) => {


        const response = await axios.put(`/birds/${id}`, formSave);

        const data = (await response.data) as BirdType;

        return data;
    }
);

const initialState: any = {
    data: null,
    status: 'idle'
};

/**
 * The birdCategory Detail Slice 
 */
export const birdDetailSlice = createSlice({
    name: 'birdReducer/bird',
    initialState,
    reducers: {
        reaset: () => initialState,
        newItem: (state) => {
            state.data = { name: '' };

        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getBird.fulfilled, (state, action) => {
                state.data = action.payload;
                state.status = 'succeeded';
            })

            .addCase(createBird.fulfilled, (state, action) => {
                state.status = 'succeeded';
            })

    }
});

export const selectDetail = (state: AppRootStateType) => state.birdReducer.bird.data;

export const { newItem, reaset } = birdDetailSlice.actions;

export type birdDetailSliceType = typeof birdDetailSlice;
export default birdDetailSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import createAppAsyncThunk from 'app/store/createAppAsyncThunk';
import { AsyncStateType, RootStateType } from 'app/store/types';
import { BirdCategoryType } from '../type/BirdCategoryType';
import BirdCategory from '../BirdCategory';
import BirdCategoryModel from '../model/BirdCategoryModel';

export type AppRootStateType = RootStateType<birdCategoryDetailSliceType>;

/**
 * Get birdCategory from server by id
 */
export const getBirdCategory = createAppAsyncThunk<BirdCategoryType, string>(
    'birdCategoryReducer/birdCategory/getBirdCategory',
    async (Id) => {
        const response = await axios.get(`/bird-categories/${Id}`);

        const data = (await response.data) as BirdCategoryType;

        return data;
    }
);
// post bird Caategory
export const createBirdCategory = createAppAsyncThunk<any, any>(
    'birdCategoryReducer/birdCategory/createBirdCategory',
    async (dataItem) => {
        const response = await axios.post(`/bird-categories/`, dataItem);

        const data = (await response.data);

        return data;
    }
);

/**
 * Save saveBirdCategory
 */
export const saveBirdCategory = createAppAsyncThunk<BirdCategoryType, BirdCategoryType>(
    'birdCategoryReducer/birdCategory/saveBirdCategory',
    async (form, { getState }) => {
        const AppState = getState() as AppRootStateType;

        const { id } = AppState.birdCategoryReducer.birdCategory.data as BirdCategoryType;

        const response = await axios.put(`/api/ecommerce/products/${id}`, form);

        const data = (await response.data) as BirdCategoryType;

        return data;
    }
);

const initialState: AsyncStateType<BirdCategoryType> = {
    data: null,
    status: 'idle'
};

/**
 * The birdCategory Detail Slice 
 */
export const birdCategoryDetailSlice = createSlice({
    name: 'birdCategoryReducer/birdCategory',
    initialState,
    reducers: {
        reaset: () => initialState,
        newItem: (state) => {
            state.data = BirdCategoryModel({});
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getBirdCategory.fulfilled, (state, action) => {
                state.data = action.payload;
                state.status = 'succeeded';
            })

            .addCase(createBirdCategory.fulfilled, (state, action) => {
              state.status = 'succeeded';
            })

    }
});

export const selectBirdCategoryDetail = (state: AppRootStateType) => state.birdCategoryReducer.birdCategory.data;

export const { newItem, reaset } = birdCategoryDetailSlice.actions;

export type birdCategoryDetailSliceType = typeof birdCategoryDetailSlice;

export default birdCategoryDetailSlice.reducer;

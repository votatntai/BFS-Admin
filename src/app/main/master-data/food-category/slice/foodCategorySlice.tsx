import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getFoodCategories, createFoodCategory, updateFoodCategory } from "src/app/auth/services/api/callAPI";
import { FoodCategory } from "src/app/main/type/food-category.type";

export interface foodCategoryReducerState {
	foodCategoryReducer: {
		foodCategorySlice: {
			foodCategories: {
				pagination: {
					pageNumber: number
					pageSize: number
					totalRow: number
				},
				data: FoodCategory[]
			},
			searchText: string
		}
	}
}
export const getFoodCategoryData = createAsyncThunk('foodCategoryReducer/getFoodCategories', async (object: Object) => {
	try {
		const response = await getFoodCategories(object);
		return response;
	} catch (error) {
		console.error(error);
	}
});

export const addFoodCategory = createAsyncThunk<any, any>('foodCategoryReducer/addFoodCategory',
	async (data) => {
		try {
			await createFoodCategory(data);
		} catch (error) {
			console.error(error);
		}
	});
export const editFoodCategory = createAsyncThunk<any, any>('foodCategoryReducer/editFoodCategory', async ({ id, data }: { id: string, data }) => {
	try {
		await updateFoodCategory(id, data);
	} catch (error) {
		console.error(error);
	}
});

const foodCategorySlice = createSlice({
	name: 'foodCategoryReducer',
	initialState: {
		status: 'pending',
		searchText: '',
		foodCategories: {
			pagination: {
				"pageNumber": 0,
				"pageSize": 8,
				"totalRow": 0
			},
			data: []
		},
	},
	reducers: {
		setSearchText: (state, action) => {
			state.searchText = action.payload as string
		},
		setPaginPageNumber: (state, action) => {
			state.foodCategories.pagination.pageNumber = action.payload as number
		},
		setPaginPageSize: (state, action) => {
			state.foodCategories.pagination.pageSize = action.payload as number
		},
		setPaginTotalRow: (state, action) => {
			state.foodCategories.pagination.totalRow = action.payload as number
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getFoodCategoryData.fulfilled, (state, action: any) => {
				state.status = 'succeeded';
				state.foodCategories = action.payload;
			})
			.addCase(getFoodCategoryData.pending, (state) => {
				state.status = 'inprogress';
			})
			.addCase(getFoodCategoryData.rejected, (state) => {
				state.status = 'error';
			})
			.addCase(addFoodCategory.fulfilled, (state) => {
				state.status = 'create success'
			})
			.addCase(editFoodCategory.fulfilled, (state) => {
				state.status = 'update success'
			})
	}
});

export const { setSearchText, setPaginPageNumber, setPaginPageSize, setPaginTotalRow } = foodCategorySlice.actions
const foodCategoryReducer = foodCategorySlice.reducer;
export default foodCategoryReducer

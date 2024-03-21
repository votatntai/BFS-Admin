import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getFoods,createFood, updateFood } from "src/app/auth/services/api/callAPI";
import {Food} from "src/app/main/type/food.type";

export interface foodReducerState{
	foodReducer:{
		foodSlice:{
			foods: {
				pagination:{
					pageNumber: number
					pageSize: number
					totalRow: number
				  },
				data: Food[]	
			},
			searchText: string
		}
	}
}
export const getFoodData = createAsyncThunk('foodReducer/getFoods', async (object: Object) => {
	try {
	  const response = await getFoods(object);
	  return response;
	} catch (error) {
	  console.log(error);
	}
  });

export const addFood = createAsyncThunk('foodReducer/addFood', async (formData: FormData) => {
	try {
	  await createFood(formData);
	} catch (error) {
	  console.log(error);
	}
  });
export const editFood = createAsyncThunk('foodReducer/editFood', async ({id, formData}: {id: string, formData: FormData}) => {
	try {
	  await updateFood(id, formData);
	} catch (error) {
	  console.log(error);
	}
  });

const foodSlice = createSlice({
	name: 'foodReducer',
	initialState: {
        status: 'pending',
		searchText:'',
        foods: {
			pagination:{
				"pageNumber": 0,
				"pageSize": 8,
				"totalRow": 0
			},
			data: []
		},
    },
	reducers: {
		setSearchText: (state,action)=>{
            state.searchText = action.payload as string
        },
		setPaginPageNumber: (state, action) => {
			state.foods.pagination.pageNumber = action.payload as number
		},
		setPaginPageSize: (state, action) => {
			state.foods.pagination.pageSize = action.payload as number
		},
		setPaginTotalRow: (state, action) => {
			state.foods.pagination.totalRow = action.payload as number
		},
	},
	extraReducers: (builder) => {
		builder
            .addCase(getFoodData.fulfilled, (state, action: any) => {
                state.status = 'succeeded';
                state.foods = action.payload;
            })
			.addCase(getFoodData.pending, (state) => {
                state.status = 'inprogress';
			})
			.addCase(getFoodData.rejected, (state) => {
				state.status = 'error';
			})
			.addCase(addFood.fulfilled, (state) => {
				state.status = 'create success'
			})
			.addCase(editFood.fulfilled, (state) => {
				state.status = 'update success'
			})
	}
});

export const {setSearchText,setPaginPageNumber,setPaginPageSize,setPaginTotalRow} = foodSlice.actions
const foodReducer = foodSlice.reducer;
export default foodReducer

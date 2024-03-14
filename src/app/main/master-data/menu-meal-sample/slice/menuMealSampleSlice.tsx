import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getMenuMealSample,createMenuMealSample, updateMenuMealSample } from "src/app/auth/services/api/callAPI";
import { MenuMealSample } from "src/app/main/type/menu-meal-sample.type";

export interface menuMealSampleReducerState{
	menuMealSampleReducer:{
		menuMealSampleSlice:{
			menuMealSamples: {
				pagination:{
					pageNumber: number
					pageSize: number
					totalRow: number
				  },
				data: MenuMealSample[]	
			},
			searchText: string
		}
	}
}
export const getMenuMealSampleData = createAsyncThunk('menuMealSampleReducer/getMenuMealSamples', async (object: Object) => {
	try {
	  const response = await getMenuMealSample(object);
	  return response;
	} catch (error) {
	  console.log(error);
	}
  });

export const addMenuMealSample = createAsyncThunk('menuMealSampleReducer/addMenuMealSample', async (formData: FormData) => {
	try {
	  await createMenuMealSample(formData);
	} catch (error) {
	  console.log(error);
	}
  });
export const editMenuMealSample = createAsyncThunk('menuMealSampleReducer/editMenuMealSample', async ({id, formData}: {id: string, formData: FormData}) => {
	try {
	  await updateMenuMealSample(id, formData);
	} catch (error) {
	  console.log(error);
	}
  });

const menuMealSampleSlice = createSlice({
	name: 'menuMealSampleReducer',
	initialState: {
        status: 'pending',
		searchText:'',
        menuMealSamples: {
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
			state.menuMealSamples.pagination.pageNumber = action.payload as number
		},
		setPaginPageSize: (state, action) => {
			state.menuMealSamples.pagination.pageSize = action.payload as number
		},
		setPaginTotalRow: (state, action) => {
			state.menuMealSamples.pagination.totalRow = action.payload as number
		},
	},
	extraReducers: (builder) => {
		builder
            .addCase(getMenuMealSampleData.fulfilled, (state, action: any) => {
                state.status = 'succeeded';
                state.menuMealSamples = action.payload;
            })
			.addCase(addMenuMealSample.fulfilled, (state) => {
				state.status = 'create success'
			})
			.addCase(editMenuMealSample.fulfilled, (state) => {
				state.status = 'update success'
			})
	}
});

export const {setSearchText,setPaginPageNumber,setPaginPageSize,setPaginTotalRow} = menuMealSampleSlice.actions
const menuMealSampleReducer = menuMealSampleSlice.reducer;
export default menuMealSampleReducer

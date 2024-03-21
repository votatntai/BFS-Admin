import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getMenuSample,createMenuSample, updateMenuSample } from "src/app/auth/services/api/callAPI";
import { menuSample } from "src/app/main/type/menu-sample.type";
export interface menuSampleReducerState{
	menuSampleReducer:{
		menuSampleSlice:{
			menuSamples: {
				pagination:{
					pageNumber: number
					pageSize: number
					totalRow: number
				  },
				data: menuSample[]	
			},
			searchText: string
		}
	}
}
export const getMenuSampleData = createAsyncThunk('menuSampleReducer/getMenuSamples', async (object: Object) => {
	try {
	  const response = await getMenuSample(object);
	  return response;
	} catch (error) {
	  console.log(error);
	}
  });

export const addMenuSample = createAsyncThunk('menuSampleReducer/addMenuSample', async (formData: FormData) => {
	try {
	  await createMenuSample(formData);
	} catch (error) {
	  console.log(error);
	}
  });
export const editMenuSample = createAsyncThunk('menuSampleReducer/editMenuSample', async ({id, formData}: {id: string, formData: FormData}) => {
	try {
	  await updateMenuSample(id, formData);
	} catch (error) {
	  console.log(error);
	}
  });

const menuSampleSlice = createSlice({
	name: 'menuSampleReducer',
	initialState: {
        status: 'pending',
		searchText:'',
        menuSamples: {
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
			state.menuSamples.pagination.pageNumber = action.payload as number
		},
		setPaginPageSize: (state, action) => {
			state.menuSamples.pagination.pageSize = action.payload as number
		},
		setPaginTotalRow: (state, action) => {
			state.menuSamples.pagination.totalRow = action.payload as number
		},
	},
	extraReducers: (builder) => {
		builder
            .addCase(getMenuSampleData.fulfilled, (state, action: any) => {
                state.status = 'succeeded';
                state.menuSamples = action.payload;
            })
			.addCase(getMenuSampleData.pending, (state) => {
                state.status = 'inprogress';
			})
			.addCase(getMenuSampleData.rejected, (state) => {
				state.status = 'error';
			})
			.addCase(addMenuSample.fulfilled, (state) => {
				state.status = 'create success'
			})
			.addCase(editMenuSample.fulfilled, (state) => {
				state.status = 'update success'
			})
	}
});

export const {setSearchText,setPaginPageNumber,setPaginPageSize,setPaginTotalRow} = menuSampleSlice.actions
const menuSampleReducer = menuSampleSlice.reducer;
export default menuSampleReducer

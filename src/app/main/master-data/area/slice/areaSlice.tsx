import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAreas,createArea, updateArea } from "src/app/auth/services/api/callAPI";
import Area from "src/app/main/type/area.type";

export interface areaReducerState{
	areaReducer:{
		areaSlice:{
			areas: {
				pagination:{
					pageNumber: number
					pageSize: number
					totalRow: number
				  },
				data: Area[]	
			},
			searchText: string
		}
	}
}
export const getAreaData = createAsyncThunk('areaReducer/getAreas', async (object: Object) => {
	try {
	  const response = await getAreas(object);
	  return response;
	} catch (error) {
	  console.error(error);
	}
  });

export const addArea = createAsyncThunk('areaReducer/addArea', async (formData: FormData) => {
	try {
	  await createArea(formData);
	} catch (error) {
	  console.error(error);
	}
  });
export const editArea = createAsyncThunk('areaReducer/editArea', async ({id, formData}: {id: string, formData: FormData}) => {
	try {
	  await updateArea(id, formData);
	} catch (error) {
	  console.error(error);
	}
  });

const areaSlice = createSlice({
	name: 'areaReducer',
	initialState: {
        status: 'pending',
		searchText:'',
        areas: {
			pagination:{
				"pageNumber": 0,
				"pageSize": 5,
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
			state.areas.pagination.pageNumber = action.payload as number
		},
		setPaginPageSize: (state, action) => {
			state.areas.pagination.pageSize = action.payload as number
		},
		setPaginTotalRow: (state, action) => {
			state.areas.pagination.totalRow = action.payload as number
		},
	},
	extraReducers: (builder) => {
		builder
            .addCase(getAreaData.fulfilled, (state, action: any) => {
                state.status = 'succeeded';
                state.areas = action.payload;
            })
			.addCase(getAreaData.pending, (state) => {
                state.status = 'inprogress';
			})
			.addCase(getAreaData.rejected, (state) => {
				state.status = 'error';
			})
			.addCase(addArea.fulfilled, (state) => {
				state.status = 'create success'
			})
			.addCase(editArea.fulfilled, (state) => {
				state.status = 'update success'
			})
	}
});

export const {setSearchText,setPaginPageNumber,setPaginPageSize,setPaginTotalRow} = areaSlice.actions
const areaReducer = areaSlice.reducer;
export default areaReducer

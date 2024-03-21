import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getFarms,createFarm, updateFarm } from "src/app/auth/services/api/callAPI";
import Farm from "src/app/main/type/farm.type";

export interface farmReducerState{
	farmReducer:{
		farmSlice:{
			farms: {
				pagination:{
					pageNumber: number
					pageSize: number
					totalRow: number
				  },
				data: Farm[]	
			},
			searchText: string
		}
	}
}
export const getFarmData = createAsyncThunk('farmReducer/getFarms', async (object: Object) => {
	try {
	  const response = await getFarms(object);
	  return response;
	} catch (error) {
	  console.log(error);
	}
  });
export const addFarm = createAsyncThunk('farmReducer/addFarm', async (formData: FormData) => {
	try {
	  await createFarm(formData);
	} catch (error) {
	  console.log(error);
	}
  });
export const editFarm = createAsyncThunk('farmReducer/editFarm', async ({id, formData}: {id: string, formData: FormData}) => {
	try {
	  await updateFarm(id, formData);
	} catch (error) {
	  console.log(error);
	}
  });

const farmSlice = createSlice({
	name: 'farmReducer',
	initialState: {
        status: 'pending',
		searchText:'',
        farms: {
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
			state.farms.pagination.pageNumber = action.payload as number
		},
		setPaginPageSize: (state, action) => {
			state.farms.pagination.pageSize = action.payload as number
		},
		setPaginTotalRow: (state, action) => {
			state.farms.pagination.totalRow = action.payload as number
		},
	},
	extraReducers: (builder) => {
		builder
            .addCase(getFarmData.fulfilled, (state, action: any) => {
                state.status = 'succeeded';
                state.farms = action.payload;
            })
			.addCase(getFarmData.pending, (state) => {
                state.status = 'inprogress';
			})
			.addCase(getFarmData.rejected, (state) => {
				state.status = 'error';
			})
			.addCase(addFarm.fulfilled, (state) => {
				state.status = 'create success'
			})
			.addCase(editFarm.fulfilled, (state) => {
				state.status = 'update success'
			})
	}
});

export const {setSearchText,setPaginPageNumber,setPaginPageSize,setPaginTotalRow} = farmSlice.actions
const farmReducer = farmSlice.reducer;
export default farmReducer

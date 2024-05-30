import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUnit,createUnit, updateUnit } from "src/app/auth/services/api/callAPI";
import { UnitOfMeasurement } from "src/app/main/type/unit-of-measurement.type";
export interface unitReducerState{
	unitReducer:{
		unitSlice:{
			units: {
				pagination:{
					pageNumber: number
					pageSize: number
					totalRow: number
				  },
				data: UnitOfMeasurement[]	
			},
			searchText: string
		}
	}
}
export const getUnitData = createAsyncThunk('unitReducer/getUnits', async (object: Object) => {
	try {
	  const response = await getUnit(object);
	  return response;
	} catch (error) {
	  console.error(error);
	}
  });

export const addUnit = createAsyncThunk('unitReducer/addUnit', async (formData: any) => {
	try {
	  await createUnit(formData);
	} catch (error) {
	  console.error(error);
	}
  });
export const editUnit = createAsyncThunk('unitReducer/editUnit', async (object: any) => {
	try {
	  await updateUnit(object.id, object.formData);
	} catch (error) {
	  console.error(error);
	}
  });

const unitSlice = createSlice({
	name: 'areaReducer',
	initialState: {
        status: 'pending',
		searchText:'',
        units: {
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
			state.units.pagination.pageNumber = action.payload as number
		},
		setPaginPageSize: (state, action) => {
			state.units.pagination.pageSize = action.payload as number
		},
		setPaginTotalRow: (state, action) => {
			state.units.pagination.totalRow = action.payload as number
		},
	},
	extraReducers: (builder) => {
		builder
            .addCase(getUnitData.fulfilled, (state, action: any) => {
                state.status = 'succeeded';
                state.units = action.payload;
            })
			.addCase(getUnitData.pending, (state) => {
                state.status = 'inprogress';
			})
			.addCase(getUnitData.rejected, (state) => {
				state.status = 'error';
			})
			.addCase(addUnit.fulfilled, (state) => {
				state.status = 'create success'
			})
			.addCase(editUnit.fulfilled, (state) => {
				state.status = 'update success'
			})
	}
});

export const {setSearchText,setPaginPageNumber,setPaginPageSize,setPaginTotalRow} = unitSlice.actions
const unitReducer = unitSlice.reducer;
export default unitReducer

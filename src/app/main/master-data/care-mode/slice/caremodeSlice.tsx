import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCaremodes, createCaremode, updateCaremode } from "src/app/auth/services/api/callAPI";
import { CareMode } from "src/app/main/type/care-mode.type";
import { CareModeType } from "../../menu-sample/type/MenuType";

export interface caremodeReducerState {
	caremodeReducer: {
		caremodeSlice: {
			caremodes: {
				pagination: {
					pageNumber: number
					pageSize: number
					totalRow: number
				},
				data: CareMode[]
			},
			searchText: string
		}
	}
}
export const getCaremodeData = createAsyncThunk('caremodeReducer/getCaremodes', async (object: Object) => {
	try {
		const response = await getCaremodes(object);
		return response;
	} catch (error) {
	  console.log(error);
	}
});

export const addCaremode = createAsyncThunk('caremodeReducer/addCaremode', async (formData) => {
	try {
		await createCaremode(formData);
	} catch (error) {
	  console.log(error);
	}
  });
export const editCaremode = createAsyncThunk('caremodeReducer/editCaremode', async (object: any) => {
	try {
	  await updateCaremode(object.id, object.formData);
	} catch (error) {
	  console.log(error);
	}
});

const caremodeSlice = createSlice({
	name: 'caremodeReducer',
	initialState: {
		status: 'pending',
		searchText: '',
		caremodes: {
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
			state.caremodes.pagination.pageNumber = action.payload as number
		},
		setPaginPageSize: (state, action) => {
			state.caremodes.pagination.pageSize = action.payload as number
		},
		setPaginTotalRow: (state, action) => {
			state.caremodes.pagination.totalRow = action.payload as number
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getCaremodeData.fulfilled, (state, action: any) => {
				state.status = 'succeeded';
				state.caremodes = action.payload;
			})
			.addCase(getCaremodeData.pending, (state) => {
				state.status = 'inprogress';
			})
			.addCase(getCaremodeData.rejected, (state) => {
				state.status = 'error';
			})
			.addCase(addCaremode.fulfilled, (state) => {
				state.status = 'create success'
			})
			.addCase(editCaremode.fulfilled, (state) => {
				state.status = 'update success'
			})
	}
});

export const { setSearchText, setPaginPageNumber, setPaginPageSize, setPaginTotalRow } = caremodeSlice.actions
const caremodeReducer = caremodeSlice.reducer;
export default caremodeReducer

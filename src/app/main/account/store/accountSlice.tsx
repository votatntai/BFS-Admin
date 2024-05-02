import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUsers } from "src/app/auth/services/api/callAPI";

interface ApiResponse{
    data:[]
  }
export const getUser = createAsyncThunk('accountReducer/getUser',
	async(object: any) => {
        try{
			//const response = await getUsers(object.role, object.params);
			//return response;
			console.log(object)
		}catch(error){
			console.log(error)
		}
	}
);

export const accountsSlice = createSlice({
	name: 'accountReducer',
	initialState: {
		searchText: '',
		role: 'Staff',
        accounts:{
			pagination:{
				"pageNumber": 0,
				"pageSize": 8,
				"totalRow": 0
			},
			data: []
		},
    },
	reducers: {  //reducer này dùng để xử lý các state ko relate to api
		setSearchText: (state,action)=>{
            state.searchText = action.payload
        },
		setRole: (state,action)=>{
			state.role = action.payload
		},
		setPaginPageNumber: (state, action) => {
			state.accounts.pagination.pageNumber = action.payload
		},
		setPaginPageSize: (state, action) => {
			state.accounts.pagination.pageSize = action.payload
		},
		setPaginTotalRow: (state, action) => {
			state.accounts.pagination.totalRow = action.payload
		},
	},
	extraReducers: (builder) => {
		builder
            .addCase(getUser.fulfilled, (state, action) => {
                // state.accounts.data = action.payload;
                state.accounts.data = [];
            })
	}
});
export interface accountReducerState{
	accountReducer:{
		accountsSlice:{
			accounts: [],
			searchText: string
		}
	}
}
export const {setSearchText,setRole} = accountsSlice.actions
export default accountsSlice.reducer;

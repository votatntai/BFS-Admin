import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUsers } from "src/app/auth/services/api/callAPI";

interface ApiResponse{
    data:[]
  }
export const getUser = createAsyncThunk('accountReducer/getUser',
	async(object: Object) => {
        const response: ApiResponse = await getUsers(object);
		const data = response.data
        // console.log(data)
		return data;
	}
);

export const accountsSlice = createSlice({
	name: 'accountReducer',
	initialState: {
        status: 'pending',
		searchText: '',
        accounts: []
    },
	reducers: {  //reducer này dùng để xử lý các state ko relate to api
		setSearchText: (state,action)=>{
            state.searchText = action.payload as string
        }
	},
	extraReducers: (builder) => {
		builder
            .addCase(getUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.accounts = action.payload;
            })
			.addCase(getUser.pending, (state) => {
                state.status = 'inprogress';
			})
			.addCase(getUser.rejected, (state) => {
				state.status = 'error';
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
export const {setSearchText} = accountsSlice.actions
export default accountsSlice.reducer;

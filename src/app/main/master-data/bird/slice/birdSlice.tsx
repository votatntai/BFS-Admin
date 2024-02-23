import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getPosts } from "src/app/auth/services/api/callAPI";

interface ApiResponse{
    data:[]
  }

interface birdState{
	birds: [],
	
}

export const getPost = createAsyncThunk('birdReducer/getPost',
	async(object: Object) => {
        const response: ApiResponse = await getPosts(object);
		const data = response.data
        // console.log(data)
		return data;
	}
);

export const birdSlice = createSlice({
	name: 'birdReducer',
	initialState: {
        status: 'pending',
        birds: []
    },
	reducers: {  //reducer này dùng để xử lý các state ko relate to api
	},
	extraReducers: (builder) => {
		builder
            .addCase(getPost.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.birds = action.payload;
            })
			.addCase(getPost.pending, (state) => {
                state.status = 'inprogress';
			})
			.addCase(getPost.rejected, (state) => {
				state.status = 'error';
			})
	}
});

const birdReducer = birdSlice.reducer;
export default birdReducer

import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import createAppAsyncThunk from 'app/store/createAppAsyncThunk';
import { RootStateType } from 'app/store/types';

type AppRootStateType = RootStateType<taskAnalyticsSliceType>;

export type WidgetsType = {
	[key: string]: unknown;
};

/**
 * Get the widgets data.
 */	
export const getWidgets = createAppAsyncThunk<any,any>('dashboards/tasks/getWidgets', async (farmId) => {
	const response = await axios.get(`/tasks?pageSize=99999&farmId=${farmId}`);

	const data = (await response.data);

	return data;
});
export const getTicket = createAppAsyncThunk('dashboards/tasks/getTicket', async () => {
	const response = await axios.get('/tickets?pageSize=99999');

	const data = (await response.data);

	return data;
});
export const getBirds = createAppAsyncThunk<any, any>('dashboards/tasks/getWidgets', async () => {
	const response = await axios.get('/birds?pageSize=99999');

	const data = (await response.data);

	return data;
})

const initialState = {
	tickets: null
};

/**
 * The analytics dashboard widgets slice.
 */
export const taskAnalyticsSlice = createSlice({
	name: 'dashboards/tasks',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getWidgets.fulfilled, (state, action) => action.payload.data)
			.addCase(getTicket.fulfilled, (state, action) => state.tickets = action.payload.data);
	}
});

export const selectWidgets = (state: AppRootStateType) => state.dashboards.tasks;

export type taskAnalyticsSliceType = typeof taskAnalyticsSlice;

export default taskAnalyticsSlice.reducer;

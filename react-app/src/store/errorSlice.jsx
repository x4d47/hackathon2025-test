import { createSlice } from "@reduxjs/toolkit";

const errorSlice = createSlice({
	name: "error",
	initialState: {
		status: { type: null, text: null },
		// {type: "error", text: "some text"}
	},
	reducers: {
		setStatus(state, action) {
			state.status = { type: action.payload.type, text: action.payload.text };
		},
		clearStatus(state) {
			state.status = null;
		},
	},
});

export const errorActions = errorSlice.actions;

export default errorSlice;

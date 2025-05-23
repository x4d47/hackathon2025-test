import { createSlice } from "@reduxjs/toolkit";
import useAxios from "../hooks/useAxios";
import { jwtDecode } from "jwt-decode";

const authSlice = createSlice({
	name: "auth",
	initialState: {
		isAuthorizated: false,
		user: {
			id: null,
			name: "",
			email: "",
			isShelter: true,
		},
		token: null,
	},
	reducers: {
		loginUser(state, action) {
			const { token, userName, email } = action.payload;

			if (!state.isAuthorizated) {
				state.isAuthorizated = true;
				state.token = token;
				state.user.id = jwtDecode(token).userId;
				state.user.name = userName;
				state.user.email = email;
			}
		},
		logoutUser(state) {
			if (state.isAuthorizated) {
				state.isAuthorizated = false;
				state.user = { name: "", email: "" };
				state.token = null;
			}
		},
	},
});

export const authActions = authSlice.actions;

export default authSlice;

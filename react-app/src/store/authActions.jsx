import axios from "axios";
import { authActions } from "./authSlice";
import { errorActions } from "./errorSlice";
import { jwtDecode } from "jwt-decode";

export const loginAction = (data) => {
	return async (dispatch, getState) => {
		try {
			const { isAuthorizated } = getState().auth;
			if (!isAuthorizated) {
				const response = await axios.post(
					"http://localhost:8080/auth/login",
					data
				);

				const { token, userName, email, account_type } = response.data;

				dispatch(
					authActions.loginUser({ token, userName, email, type: account_type })
				);
				dispatch(
					errorActions.setStatus({
						type: "success",
						text: "Authorization successful",
					})
				);
			} else {
				throw new Error("You are already logged in.");
			}
		} catch (error) {
			dispatch(
				errorActions.setStatus({
					type: "error",
					text: error.response?.data?.error || error.message,
				})
			);
		}
	};
};

export const registrationAction = (data) => {
	return async (dispatch, getState) => {
		try {
			const { isAuthorizated } = getState().auth;
			if (!isAuthorizated) {
				const response = await axios.post(
					"http://localhost:8080/auth/register",
					data
				);

				const { token, userName, email, account_type } = response.data;

				dispatch(
					authActions.loginUser({ token, userName, email, type: account_type })
				);
				dispatch(
					errorActions.setStatus({
						type: "success",
						text: "Registration successful",
					})
				);
			} else {
				throw new Error("You are already logged in.");
			}
		} catch (error) {
			dispatch(
				errorActions.setStatus({
					type: "error",
					text: error.response?.data?.error || error.message,
				})
			);
		}
	};
};

export const logoutAction = () => (dispatch, getState) => {
	const { isAuthorizated } = getState().auth;

	if (isAuthorizated) {
		dispatch(authActions.logoutUser());
		dispatch(
			errorActions.setStatus({
				type: "success",
				text: "Log out successful",
			})
		);
	} else {
		dispatch(
			errorActions.setStatus({
				type: "error",
				text: "User is not loggined. Please log in first.",
			})
		);
	}
};

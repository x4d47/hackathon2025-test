import { cartActions } from "./cartSlice";
import { errorActions } from "./errorSlice";

export const resetStoreAction = (data) => {
	return async (dispatch, getState) => {
		try {
			const { totalQuantity } = getState().cart;
			if (totalQuantity !== 0) {
				dispatch(cartActions.resetStore());

				dispatch(
					errorActions.setStatus({
						type: "success",
						text: "Thank you for order!",
					})
				);
			} else {
				throw new Error(
					"You are have 0 items in cart. Please add items to create new order!"
				);
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

export const addItemToCartAction = (item) => {
	return async (dispatch, getState) => {
		try {
			const { id } = getState().auth.user;
			const { title, quantity, bondPercent } = item;

			if (!id) {
				throw new Error("User not authenticated");
			}

			if (quantity && bondPercent) {
				dispatch(cartActions.addItemToCart({ userId: id, item }));
				dispatch(
					errorActions.setStatus({
						type: "success",
						text: `Added to favorite ${title} peace`,
					})
				);
			}
		} catch (error) {
			// Обробка помилок
			dispatch(
				errorActions.setStatus({
					type: "error",
					text: error.message || "An error occurred.",
				})
			);
		}
	};
};

export const removeItemFromCartAction = (item) => {
	return async (dispatch, getState) => {
		try {
			const { id } = getState().auth.user;

			if (!id) {
				throw new Error("User not authenticated");
			}

			dispatch(cartActions.removeItemFromCart({ userId: id, item }));
		} catch (error) {
			// Обробка помилок
			dispatch(
				errorActions.setStatus({
					type: "error",
					text: error.message || "An error occurred.",
				})
			);
		}
	};
};
export const removeCardFromCartAction = (item) => {
	return async (dispatch, getState) => {
		try {
			const { id } = getState().auth.user;

			if (!id) {
				throw new Error("User not authenticated");
			}

			dispatch(cartActions.removeCardFromCart({ userId: id, item }));
		} catch (error) {
			// Обробка помилок
			dispatch(
				errorActions.setStatus({
					type: "error",
					text: error.message || "An error occurred.",
				})
			);
		}
	};
};

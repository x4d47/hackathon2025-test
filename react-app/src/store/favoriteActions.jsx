import { favoriteActions } from "./favoriteSlice";
import { errorActions } from "./errorSlice";

export const resetFavoritesAction = () => {
	return async (dispatch, getState) => {
		try {
			const { id } = getState().auth.user;
			const favorites = getState().favorite[id];

			if (!id) {
				throw new Error("User not authenticated");
			}

			if (favorites && favorites.items.length > 0) {
				dispatch(favoriteActions.resetFavorites({ userId: id }));

				dispatch(
					errorActions.setStatus({
						type: "success",
						text: "Favorites have been cleared.",
					})
				);
			} else {
				throw new Error("Favorites list is already empty.");
			}
		} catch (error) {
			dispatch(
				errorActions.setStatus({
					type: "error",
					text: error.message || "An error occurred.",
				})
			);
		}
	};
};

export const addItemToFavoritesAction = (item) => {
	return async (dispatch, getState) => {
		try {
			const { id } = getState().auth.user;
			const { title } = item;

			if (!id) {
				throw new Error("User not authenticated");
			}

			dispatch(favoriteActions.addItemToFavorites({ userId: id, item }));
			dispatch(
				errorActions.setStatus({
					type: "success",
					text: `Added to favorites: ${title}`,
				})
			);
		} catch (error) {
			dispatch(
				errorActions.setStatus({
					type: "error",
					text: error.message || "An error occurred.",
				})
			);
		}
	};
};

export const removeItemFromFavoritesAction = (item) => {
	return async (dispatch, getState) => {
		try {
			const { id } = getState().auth.user;

			if (!id) {
				throw new Error("User not authenticated");
			}

			dispatch(favoriteActions.removeItemFromFavorites({ userId: id, item }));
		} catch (error) {
			dispatch(
				errorActions.setStatus({
					type: "error",
					text: error.message || "An error occurred.",
				})
			);
		}
	};
};

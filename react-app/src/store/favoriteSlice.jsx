import { createSlice } from "@reduxjs/toolkit";

const favoriteSlice = createSlice({
	name: "favorite",
	initialState: {},
	reducers: {
		replaceFavorites(state, action) {
			const { userId, favorites } = action.payload;
			state[userId] = {
				items: favorites.items || [],
			};
		},
		addItemToFavorites(state, action) {
			const { userId, item } = action.payload;
			const { id, title, imgSrc } = item;

			if (!state[userId]) {
				state[userId] = {
					items: [],
				};
			}

			const userFavorites = state[userId];
			const existingItem = userFavorites.items.find(
				(favItem) => favItem.id === id
			);

			if (!existingItem) {
				userFavorites.items.push({
					id,
					title,
					imgSrc,
				});
			}
		},
		removeItemFromFavorites(state, action) {
			const { userId, item } = action.payload;
			const { id } = item;

			if (!state[userId]) return;

			const userFavorites = state[userId];

			userFavorites.items = userFavorites.items.filter(
				(favItem) => favItem.id !== id
			);
		},
		resetFavorites(state, action) {
			const { userId } = action.payload;
			if (state[userId]) {
				state[userId] = {
					items: [],
				};
			}
		},
	},
});

export const favoriteActions = favoriteSlice.actions;

export default favoriteSlice;

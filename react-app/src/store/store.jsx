// store.jsx

import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import cartSlice from "./cartSlice";
import authSlice from "./authSlice";
import errorSlice from "./errorSlice";

const cartPersistConfig = {
	key: "cart",
	storage,
};

const favoritePersistConfig = {
	key: "cart",
	storage,
};

const authPersistConfig = {
	key: "auth",
	storage,
};
const persistedCartReducer = persistReducer(
	cartPersistConfig,
	cartSlice.reducer
);
const persistedFavoriteReducer = persistReducer(
	favoritePersistConfig,
	cartSlice.reducer
);

const persistedAuthReducer = persistReducer(
	authPersistConfig,
	authSlice.reducer
);

const store = configureStore({
	reducer: {
		cart: persistedCartReducer,
		favorite: persistedFavoriteReducer,
		auth: persistedAuthReducer,
		error: errorSlice.reducer,
	},
});

export const persistor = persistStore(store);
export default store;

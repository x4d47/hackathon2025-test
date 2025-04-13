// cartSlice.jsx

import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
	name: "cart",
	initialState: {}, // Кожен ключ буде userId з відповідним кошиком
	reducers: {
		replaceCart(state, action) {
			const { userId, cart } = action.payload;
			state[userId] = {
				items: cart.items || [],
				totalQuantity: cart.totalQuantity || 0,
				totalPrice: cart.totalPrice || 0,
				changed: cart.changed || false,
			};
		},
		addItemToCart(state, action) {
			const { userId, item } = action.payload;
			const { id, title, imgSrc, bondPrice, bondPercent, quantity } = item;

			if (!state[userId]) {
				// Якщо кошик для користувача ще не створено
				state[userId] = {
					items: [],
					totalQuantity: 0,
					totalPrice: 0,
					changed: false,
				};
			}

			const userCart = state[userId];
			const existingItem = userCart.items.find(
				(cartItem) => cartItem.id === id && cartItem.percentage === bondPercent
			);

			const itemTotalPrice = bondPrice * quantity;
			userCart.totalPrice += itemTotalPrice;
			userCart.changed = true;

			if (!existingItem) {
				// Якщо такого товару в кошику немає, додаємо новий
				userCart.items.push({
					id,
					title,
					imgSrc,
					price: bondPrice,
					percentage: bondPercent,
					quantity,
					totalPrice: itemTotalPrice,
				});
			} else {
				// Якщо товар вже є в кошику, збільшуємо його кількість
				existingItem.quantity += quantity;
				existingItem.totalPrice = existingItem.price * existingItem.quantity;
			}

			userCart.totalQuantity = userCart.items.reduce(
				(sum, cartItem) => sum + cartItem.quantity,
				0
			);
		},
		removeItemFromCart(state, action) {
			const { userId, item } = action.payload;
			const { id, bondPercent } = item;

			if (!state[userId]) return; // Якщо кошик для користувача не існує

			const userCart = state[userId];
			const existingItem = userCart.items.find(
				(cartItem) => cartItem.id === id && cartItem.percentage === bondPercent
			);

			if (!existingItem) return;

			userCart.totalPrice -= existingItem.price;
			userCart.changed = true;

			if (existingItem.quantity === 1) {
				// Якщо кількість товару одна, видаляємо його
				userCart.items = userCart.items.filter(
					(cartItem) =>
						!(cartItem.id === id && cartItem.percentage === bondPercent)
				);
			} else {
				// Якщо більше одного, зменшуємо кількість
				existingItem.quantity -= 1;
				existingItem.totalPrice = existingItem.price * existingItem.quantity;
			}

			userCart.totalQuantity = userCart.items.reduce(
				(sum, cartItem) => sum + cartItem.quantity,
				0
			);
		},
		removeCardFromCart(state, action) {
			const { userId, item } = action.payload;
			const { id, bondPercent } = item;

			if (!state[userId]) return; // Якщо кошик для користувача не існує

			const userCart = state[userId];
			const existingItem = userCart.items.find(
				(cartItem) => cartItem.id === id && cartItem.percentage === bondPercent
			);

			if (!existingItem) return;

			userCart.totalPrice -= existingItem.price * existingItem.quantity;
			userCart.changed = true;

			// Видаляємо товар з кошика
			userCart.items = userCart.items.filter(
				(cartItem) =>
					!(cartItem.id === id && cartItem.percentage === bondPercent)
			);

			userCart.totalQuantity = userCart.items.reduce(
				(sum, cartItem) => sum + cartItem.quantity,
				0
			);
		},
		resetStore(state, action) {
			const { userId } = action.payload;
			if (state[userId]) {
				state[userId] = {
					items: [],
					totalQuantity: 0,
					totalPrice: 0,
					changed: false,
				};
			}
		},
	},
});

export const cartActions = cartSlice.actions;

export default cartSlice;

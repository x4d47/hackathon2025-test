import PRODUCTS from "../../../data/data";
import ItemBar from "../ItemBar/ItemBar";
import Button from "../Button/Button";
import "./Cart.css";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function Cart() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	// Отримуємо userId з Redux
	const userId = useSelector((state) => state.auth.user.id);

	// Отримуємо items і totalPrice для цього користувача з cart
	const items = useSelector((state) => state.cart[userId]?.items);
	const totalAmounts = useSelector((state) => state.cart[userId]?.totalPrice);

	const isAuthorizated = useSelector((state) => state.auth.isAuthorizated);

	useEffect(() => {
		setCartItems(items);
	}, [items]);

	const [cartItems, setCartItems] = useState([]);

	// Якщо користувач не авторизований, відображаємо сторінку з повідомленням
	if (!isAuthorizated) {
		return (
			<main className="container">
				<div style={{ textAlign: "center" }}>
					<h2 className="heading-secondary margin-top-md margin-btm-md">
						Please login to account
					</h2>
					<Button type="solid" onClick={() => navigate("/")}>
						Back to login page
					</Button>
				</div>
			</main>
		);
	}

	// Якщо в кошику немає елементів
	if (!cartItems || cartItems.length === 0) {
		return (
			<main>
				<div className="container">
					<span id="shoping-cart_empty">Shopping cart is empty!</span>
				</div>
			</main>
		);
	}

	return (
		<main>
			<div className="container">
				<h2
					className="heading-secondary margin-top-md margin-btm-md"
					id="cart__heading">
					Shopping Cart
				</h2>
				<div id="cart__item-wrapper">
					{cartItems.length > 0 ? (
						cartItems.map((item) => (
							<ItemBar key={item.id} className="margin-btm-sm" {...item} />
						))
					) : (
						<span>No items in cart</span>
					)}
				</div>
				<div id="cart__total-amout" className="margin-btm-bg">
					<span id="cart__text">Total amount:</span>
					<span id="cart__total-price">
						${totalAmounts.toLocaleString("de-DE")}
					</span>
				</div>
				<div id="cart__button-wrapper" className="margin-btm-md">
					<Button type="outline" onClick={() => navigate(-1)}>
						Back to catalog
					</Button>
					<Button type="solid" tag="link" to="/cart/checkout">
						Continue
					</Button>
				</div>
			</div>
		</main>
	);
}

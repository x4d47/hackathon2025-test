// ItemBar.jsx

import Button from "../Button/Button";
import "./ItemBar.css";
import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cartSlice";
import { addListener } from "@reduxjs/toolkit";
import { addItemToCartAction } from "../../store/cartActions";
import { removeItemFromCartAction } from "../../store/cartActions";
import { removeCardFromCartAction } from "../../store/cartActions";

export default function ItemBar({
	id,
	title,
	imgSrc,
	price,
	percentage,
	quantity,
	totalPrice,
	...props
}) {
	const dispatch = useDispatch();

	const handleClickIncrease = () => {
		dispatch(
			addItemToCartAction({
				id,
				title,
				imgSrc,
				bondPrice: price,
				bondPercent: percentage,
				quantity: 1,
			})
		);
	};

	const handleClickDecrease = () => {
		dispatch(
			removeItemFromCartAction({
				id,
				bondPercent: percentage,
			})
		);
	};

	const handleClickRemoveCard = () => {
		dispatch(
			removeCardFromCartAction({
				id,
				bondPercent: percentage,
			})
		);
	};

	return (
		<div id="item-bar" {...props}>
			<Link to={`/item/${id}`}>
				<img src={imgSrc} id="item-bar__img" />
			</Link>
			<h3 className="heading-tertiary" id="item-bar__heading">
				{title}
			</h3>
			<div id="item-bar__wrapper">
				<Button type="outline" onClick={handleClickDecrease} isSmall="true">
					-
				</Button>
				<span id="item-bar__count-peace">{quantity}</span>
				<Button type="outline" onClick={handleClickIncrease} isSmall="true">
					+
				</Button>
			</div>
			<span id="item-bar__percentage">%{percentage}</span>
			<span id="item-bar__price">${totalPrice.toLocaleString("de-DE")}</span>
			<button id="item-bar__btn-close" onClick={handleClickRemoveCard}>
				x
			</button>
		</div>
	);
}

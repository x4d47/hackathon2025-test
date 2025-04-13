import React from "react";
import "./Button.css";

import { Link } from "react-router-dom";

export default function Button({
	children,
	tag = "button",
	type = "solid",
	isBig = false,
	isSmall = false,
	...props
}) {
	let style;
	let component;

	switch (type) {
		case "solid":
			style = `button button-solid ${isBig && "button-big"} ${
				isSmall && "button-small"
			}`;
			break;
		case "outline":
			style = `button button-outline ${isBig && "button-big"} ${
				isSmall && "button-small"
			}`;
			break;
	}

	switch (tag) {
		case "button":
			component = (
				<button className={style} {...props}>
					{children}
				</button>
			);
			break;
		case "link":
			component = (
				<Link className={style} {...props}>
					{children}
				</Link>
			);
			break;
	}

	return component;
}

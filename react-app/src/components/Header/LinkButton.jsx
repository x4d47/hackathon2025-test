import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";

export default function LinkButton({ children, cartCount, ...props }) {
	return (
		<>
			<li className="links_item">
				<Link
					className={
						props.isActive === children.toLowerCase()
							? "links_item_button active"
							: "links_item_button"
					}
					{...props}
					onClick={props.onClick}>
					{children}
					{cartCount && (
						<span
							className={
								props.isActive === children.toLowerCase()
									? "cart-item cart-item_active"
									: "cart-item "
							}>
							{cartCount}
						</span>
					)}
				</Link>
			</li>
		</>
	);
}

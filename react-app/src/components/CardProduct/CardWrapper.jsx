import React from "react";
import "./CardProduct.css";

export default function CardWrapper({ children, ...props }) {
	return (
		<>
			<div {...props}>{children}</div>
		</>
	);
}

import React from "react";
import "./Filter.css";

const Filter = React.forwardRef(({ title, children, ...props }, ref) => {
	return (
		<div>
			{title && (
				<h4 className="heading-quaternary margin-btm-smaller">{title}</h4>
			)}
			<select id="filter" {...props} ref={ref}>
				{children}
			</select>
		</div>
	);
});

export default Filter;

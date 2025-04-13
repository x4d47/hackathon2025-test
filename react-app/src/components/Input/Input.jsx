import React from "react";
import "./Input.css";

const Input = React.forwardRef(
	(
		{
			title = null,
			type = "simple",
			tag = null,
			img = null,
			typeValue,
			...props
		},
		ref
	) => {
		let style;

		switch (type) {
			case "simple":
				style = "input-element__input input-element__input-simple";
				break;
			case "image":
				style = "input-element__input input-element__input-image";
				break;
			default:
				style = "input-element__input";
		}

		if (tag === "formik") {
			return;
		}

		return (
			<div id="input-element">
				{title && (
					<h4 className="heading-quaternary margin-btm-smaller">{title}</h4>
				)}
				{img && (
					<img src={img} id="input-element__img" alt="Input illustration" />
				)}
				<input {...props} type={typeValue} ref={ref} className={style} />
			</div>
		);
	}
);

export default Input;

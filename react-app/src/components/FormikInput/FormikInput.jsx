// FormikInputs.jsx

import { Field, ErrorMessage } from "formik";
import "./FormikInput.css";

export default function FormikInput({
	id,
	label,
	name,
	placeholder,
	type = "text",
	includeEye = false,
	isHideEye = false,
	eyeOnClick,
	...props
}) {
	return (
		<div className="formik_input__container">
			<label htmlFor={id}>{label}</label>
			<Field
				name={name}
				id={id}
				placeholder={placeholder}
				type={type}
				{...props}
			/>
			{includeEye && (
				<img
					onClick={eyeOnClick}
					className="formik__icon "
					src={isHideEye ? "eyeOffOutline.svg" : "eyeOutline.svg"}
					width="20px"
					alt="eye icon"
				/>
			)}
			<ErrorMessage name={name} component="span" className="formik-error" />
		</div>
	);
}

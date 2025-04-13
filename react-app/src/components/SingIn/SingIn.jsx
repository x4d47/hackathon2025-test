import "./SingIn.css";
import { Formik, Form } from "formik";
import FormikInput from "../FormikInput/FormikInput";
import * as Yup from "yup";
import Button from "../Button/Button";
import { useState } from "react";
import { loginAction } from "../../store/authActions";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { errorActions } from "../../store/errorSlice";

import Notifications from "../Notifications/Notifications";

import { useNavigate } from "react-router-dom";

export default function SingIn({ singInOnClick }) {
	const [hidePassword, setHidePassword] = useState(true);

	const dispatch = useDispatch();

	const { status } = useSelector((state) => state.error);
	const isAuthorizated = useSelector((state) => state.auth.isAuthorizated);

	const navigate = useNavigate();

	const regEx = {
		email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
		password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
	};

	const validationSchema = Yup.object({
		email: Yup.string()
			.matches(regEx.email, "Invalid email format")
			.required("Email is required"),
		password: Yup.string()
			.matches(regEx.password, "8+ chars, upper, lower, & a digit.")
			.required("Password is required"),
	});

	const handleHidePassword = () => {
		setHidePassword((oldState) => !oldState);
	};

	const handleSubmit = (value) => {
		dispatch(loginAction({ email: value.email, password: value.password }));
		navigate("/search");
	};

	return (
		<div className="signup__container">
			<Notifications
				type={status?.type}
				action={status?.text}
				handleCloseAction={() => dispatch(errorActions.clearStatus())} // Виправлено на clearStatus
			/>
			<Formik
				initialValues={{
					email: "",
					password: "",
				}}
				validationSchema={validationSchema}
				onSubmit={handleSubmit}>
				<Form>
					<h2 className="heading-secondary margin-btm-md">
						Submit the form to sign in
					</h2>

					<FormikInput
						label="Email"
						name="email"
						id="email"
						placeholder="exaple@adress.com"
					/>
					<FormikInput
						type={hidePassword && "password"}
						includeEye="true"
						isHideEye={!hidePassword}
						eyeOnClick={handleHidePassword}
						label="Password"
						name="password"
						id="password"
						autocomplete="off"
						placeholder="Some password"
					/>

					<div className="singup_action_container margin-btm-md">
						<span className="signup_text">Not a member?</span>
						<a href="#" className="signup_link" onClick={singInOnClick}>
							Sing up
						</a>
					</div>
					<div className="signup__button_wrapper">
						<Button type="solid" isBig="true">
							Login me
						</Button>
					</div>
				</Form>
			</Formik>
		</div>
	);
}

// Singup.jsx

import "./SingUp.css";
import { Formik, Form } from "formik";
import FormikInput from "../FormikInput/FormikInput";
import * as Yup from "yup";
import Button from "../Button/Button";
import Switch from "../Switch/Switch";
import { Link } from "react-router-dom";
import { useState } from "react";

import { registrationAction } from "../../store/authActions";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { errorActions } from "../../store/errorSlice";

import { useNavigate } from "react-router-dom";

import Notifications from "../Notifications/Notifications";

export default function SingUp({ singUpOnClick }) {
	const [hidePassword, setHidePassword] = useState(true);

	const [isVolunteer, setIsVolunteer] = useState(true);

	const dispatch = useDispatch();

	const { status } = useSelector((state) => state.error);

	const navigate = useNavigate();

	const regEx = {
		name: /^[a-zA-Zа-яА-Я]{2,20}$/,
		email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
		password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
	};

	const validationSchema = Yup.object({
		name: Yup.string()
			.matches(regEx.name, "Cyrillic or Latin letters from 2 to 20 symbols")
			.required("Name is required"),

		email: Yup.string()
			.matches(regEx.email, "Invalid email format")
			.required("Email is required"),
		password: Yup.string()
			.matches(regEx.password, "8+ chars, upper, lower, & a digit.")
			.required("Password is required"),

		retypePassword: Yup.string()
			.oneOf([Yup.ref("password"), null], "Passwords must match")
			.required("Confirm Password is required"),
	});

	const handleHidePassword = () => {
		setHidePassword((oldState) => !oldState);
	};

	const handleSubmit = (value) => {
		dispatch(
			registrationAction({
				userName: value.name,
				email: value.email,
				password: value.password,
			})
		);
		navigate("/catalog");
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
					userName: "",
					email: "",
					password: "",
				}}
				validationSchema={validationSchema}
				onSubmit={handleSubmit}>
				<Form>
					<h2 className="heading-secondary margin-btm-md">
						Register the new account
					</h2>

					<Switch className="smargin-btm-md" isFirst={isVolunteer} onClick />

					<FormikInput
						label="User name"
						name="name"
						id="name"
						placeholder="Andriy"
					/>
					<FormikInput
						label="Email"
						name="email"
						id="email"
						placeholder="exaple@adress.com"
					/>
					<FormikInput
						type={!hidePassword && "password"}
						includeEye="true"
						isHideEye={hidePassword}
						eyeOnClick={handleHidePassword}
						label="Password"
						name="password"
						id="password"
						autocomplete="off"
						placeholder="Some password"
					/>
					<FormikInput
						type={!hidePassword && "password"}
						includeEye="true"
						isHideEye={hidePassword}
						eyeOnClick={handleHidePassword}
						label="Retype password"
						name="retypePassword"
						id="retypePassword"
						autocomplete="off"
						placeholder="Some password"
					/>

					<div className="singup_action_container margin-btm-md">
						<span className="signup_text">Already a member?</span>
						<a href="#" className="signup_link" onClick={singUpOnClick}>
							Sing in
						</a>
					</div>
					<div className="signup__button_wrapper">
						<Button type="solid" isBig="true">
							Sing up me
						</Button>
					</div>
				</Form>
			</Formik>
		</div>
	);
}

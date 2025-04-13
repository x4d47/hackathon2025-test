// Checkout.jsx

import "./Checkout.css";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import FormikInput from "../FormikInput/FormikInput";
import * as Yup from "yup";

import { cartActions } from "../../store/cartSlice";
import { useDispatch } from "react-redux";

import { useSelector } from "react-redux";
import { errorActions } from "../../store/errorSlice";
import Notifications from "../Notifications/Notifications";
import { resetStoreAction } from "../../store/cartActions";

export default function Checkout() {
	const navigate = useNavigate();

	const dispatch = useDispatch();

	const { status } = useSelector((state) => state.error);
	const { totalQuantity } = useSelector((state) => state.cart);

	const regEx = {
		name: /^[a-zA-Zа-яА-Я]{2,20}$/,
		email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
		phone: /^\+([1-9]{1}[0-9]{1,3}) \d{3} \(\d{3}\) \(\d{4}\)$/,
		address:
			/^[A-Za-zА-Яа-яієєґ'’`\s]+ \d{1,5}(\/\d{1,5})?, [A-Za-zА-Яа-яієєґ'’`\s]+, [A-Za-zА-Яа-яієєґ'’`\s]+, [A-Za-zА-Яа-яієєґ'’`\s]+$/,
	};

	const validationSchema = Yup.object({
		firstName: Yup.string()
			.matches(regEx.name, "Cyrillic or Latin letters from 2 to 20 symbols")
			.required("First name is required"),

		lastName: Yup.string()
			.matches(regEx.name, "Cyrillic or Latin letters from 2 to 20 symbols")
			.required("Last name is required"),

		email: Yup.string()
			.matches(regEx.email, "Invalid email format")
			.required("Email is required"),

		phone: Yup.string()
			.matches(regEx.phone, "Invalid phone number format")
			.required("Phone number is required"),

		address: Yup.string()
			.matches(regEx.address, "Invalid address format")
			.required("Address is required"),
	});

	const handleSubmit = () => {
		dispatch(resetStoreAction());
		if (totalQuantity !== 0) navigate("/cart/success");
	};

	return (
		<main className="container margin-top-md">
			<Notifications
				type={status?.type}
				action={status?.text}
				handleCloseAction={() => dispatch(errorActions.clearStatus())} // Виправлено на clearStatus
			/>
			<h2
				className="heading-secondary margin-btm-md"
				style={{ textAlign: "center" }}>
				Checkout
			</h2>
			<Formik
				initialValues={{
					firstName: "",
					lastName: "",
					email: "",
					phone: "",
					address: "",
				}}
				validationSchema={validationSchema}
				onSubmit={handleSubmit}>
				<Form>
					<div className="checkout__wrapper  margin-btm-bg">
						<div className="checkout__inputs">
							<div className="checkout__grid">
								<FormikInput
									label="First name"
									name="firstName"
									id="firstName"
									placeholder="Andriy"
								/>
								<FormikInput
									label="Last name"
									name="lastName"
									id="lastName"
									placeholder="Gonchar"
								/>
								<FormikInput
									label="Email"
									name="email"
									id="email"
									placeholder="example@adress.com"
								/>
								<FormikInput
									label="Phone"
									name="phone"
									id="phone"
									placeholder="+38 067 (123) (4567)"
								/>
							</div>
							<FormikInput
								label="Address"
								name="address"
								id="address"
								placeholder="Poshtova 39, Lviv, Lvivska` oblast, Ukraine"
							/>
						</div>
					</div>
					<div id="checkout__btn_container" className=" margin-btm-bg">
						<Button tag="link" type="outline" onClick={() => navigate(-1)}>
							Go back
						</Button>
						<Button type="solid">Continue</Button>
					</div>
				</Form>
			</Formik>
		</main>
	);
}

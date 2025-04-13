import "./Checkout.css";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import FormikInput from "../../components/FormikInput/FormikInput";

export default function Checkout() {
	const navigate = useNavigate();
	return (
		<main className="container">
			<Formik
				initialValues={{
					firstName: "",
					lastName: "",
					email: "",
					phone: "",
					adress: "",
				}}
				onSubmit={() => alert("successful")}>
				<Form>
					<FormikInput
						label="first name"
						name="firstName"
						id="firstName"
						placeholder="Andriy"
					/>
				</Form>
			</Formik>
			<div id="checkout__btn_container" className=" margin-btm-bg">
				<Button tag="link" type="outline" onClick={() => navigate(-1)}>
					Go back
				</Button>
				<Button type="solid">Continue</Button>
			</div>
		</main>
	);
}

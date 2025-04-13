import "./Auth.css";
import SingUp from "../SingUp/SingUp";
import SingIn from "../SingIn/SingIn";
import { useState } from "react";

export default function Auth() {
	const [isLogin, setIsLogin] = useState(true);

	const handleIsLogin = () => {
		setIsLogin((oldValue) => !oldValue);
	};
	return (
		<main className="container margin-top-md">
			<div className="auth__wrapper margin-btm-md">
				{isLogin ? (
					<SingIn singInOnClick={handleIsLogin} />
				) : (
					<SingUp singUpOnClick={handleIsLogin} />
				)}
			</div>
		</main>
	);
}

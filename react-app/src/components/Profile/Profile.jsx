import "./Profile.css";
import { useSelector } from "react-redux";
import Button from "../Button/Button";
import { useDispatch } from "react-redux";
import { logoutAction } from "../../store/authActions";
import Notifications from "../Notifications/Notifications";
import { errorActions } from "../../store/errorSlice";

export default function Profile() {
	const userName = useSelector((state) => state.auth.user.name);
	const email = useSelector((state) => state.auth.user.email);

	const dispatch = useDispatch();

	const { status } = useSelector((state) => state.error);

	const handleLogOut = () => {
		dispatch(logoutAction());
	};

	return (
		<main className="container margin-top-md">
			<Notifications
				type={status?.type}
				action={status?.text}
				handleCloseAction={() => dispatch(errorActions.clearStatus())} // Виправлено на clearStatus
			/>
			<div className="proifile__text_wrapper">
				<h2 className="heading-secondary margin-btm-md">Profile</h2>
				<p className="proifile__text-info margin-btm-sm">{userName}</p>
				<p className="proifile__text-info margin-btm-bg">{email}</p>
				<Button type="solid" onClick={handleLogOut}>
					Log out
				</Button>
			</div>
		</main>
	);
}

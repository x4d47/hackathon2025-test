import "./Profile.css";
import { useSelector } from "react-redux";
import Button from "../Button/Button";
import { useDispatch } from "react-redux";
import { logoutAction } from "../../store/authActions";
import Notifications from "../Notifications/Notifications";
import { errorActions } from "../../store/errorSlice";
import { useState } from "react";

export default function Profile() {
	const userName = useSelector((state) => state.auth.user.name);
	const email = useSelector((state) => state.auth.user.email);
	const isShelter = useSelector((state) => state.auth.isShelter);

	const Volunter = (
		<>
			<p className="proifile__text-info margin-btm-sm">{email}</p>
			<p className="proifile__text-info margin-btm-sm">{userName}</p>
			<p className="proifile__text-info margin-btm-bg">Volonteer</p>
		</>
	);
	const Shelter = (
		<>
			<p className="proifile__text-info margin-btm-sm">{email}</p>
			<p className="proifile__text-info margin-btm-sm">{userName}</p>
			<p className="proifile__text-info margin-btm-sm">Shelter</p>
			<p className="proifile__text-info margin-btm-sm">Type</p>
			<p className="proifile__text-info margin-btm-bg">Description</p>
		</>
	);

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
				handleCloseAction={() => dispatch(errorActions.clearStatus())}
			/>
			<div className="proifile__text_wrapper">
				<h2 className="heading-secondary margin-btm-md">Profile</h2>
				{isShelter ? Shelter : Volunter}
				<Button type="solid" onClick={handleLogOut}>
					Log out
				</Button>
			</div>
		</main>
	);
}

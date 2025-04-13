import React from "react";
import ReactDOM from "react-dom";
import "./Notifications.css";

export default function Notifications({ type, action, handleCloseAction }) {
	let colorStyle;
	let backgroundStyle;
	let closeStyle;

	// Тут ми передаємо dispatch(cleanError()), після того відбудеться ререндеринг
	const handleClose = () => {
		handleCloseAction();
	};

	switch (type) {
		case "error":
			colorStyle = "color__red";
			backgroundStyle = "bg__red";
			closeStyle = "close__red";
			break;
		case "success":
			colorStyle = "color__green";
			backgroundStyle = "bg__green";
			closeStyle = "close__green";
			break;
	}

	const errorIcon = (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			x="0px"
			y="0px"
			width="24"
			height="24"
			id="notification__icon"
			className={colorStyle}
			viewBox="0 0 30 30">
			<path d="M15,3C8.373,3,3,8.373,3,15c0,6.627,5.373,12,12,12s12-5.373,12-12C27,8.373,21.627,3,15,3z M16.212,8l-0.2,9h-2.024l-0.2-9 H16.212z M15.003,22.189c-0.828,0-1.323-0.441-1.323-1.182c0-0.755,0.494-1.196,1.323-1.196c0.822,0,1.316,0.441,1.316,1.196 C16.319,21.748,15.825,22.189,15.003,22.189z"></path>
		</svg>
	);

	const successIcon = (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			x="0px"
			y="0px"
			width="24"
			height="24"
			className={colorStyle}
			viewBox="0 0 24 24">
			<path d="M 12 0 C 5.371094 0 0 5.371094 0 12 C 0 18.628906 5.371094 24 12 24 C 18.628906 24 24 18.628906 24 12 C 24 5.371094 18.628906 0 12 0 Z M 11 17.414063 L 6.292969 12.707031 L 7.707031 11.292969 L 11 14.585938 L 18.292969 7.292969 L 19.707031 8.707031 Z"></path>
		</svg>
	);

	if (!action) return null;

	return ReactDOM.createPortal(
		<div className={`notification__container ${backgroundStyle}`}>
			<div className="notification__wrapper">
				<div className="notification__icon_container">
					{type === "error" ? errorIcon : successIcon}
				</div>
				<span className={`notification__text ${colorStyle}`}>{action}</span>
			</div>
			<button
				className={`notification__close ${closeStyle}`}
				onClick={handleClose}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					x="0px"
					y="0px"
					width="24"
					height="24"
					viewBox="0 0 24 24">
					<path d="M 4.9902344 3.9902344 A 1.0001 1.0001 0 0 0 4.2929688 5.7070312 L 10.585938 12 L 4.2929688 18.292969 A 1.0001 1.0001 0 1 0 5.7070312 19.707031 L 12 13.414062 L 18.292969 19.707031 A 1.0001 1.0001 0 1 0 19.707031 18.292969 L 13.414062 12 L 19.707031 5.7070312 A 1.0001 1.0001 0 0 0 18.980469 3.9902344 A 1.0001 1.0001 0 0 0 18.292969 4.2929688 L 12 10.585938 L 5.7070312 4.2929688 A 1.0001 1.0001 0 0 0 4.9902344 3.9902344 z"></path>
				</svg>
			</button>
		</div>,
		document.getElementById("notification-root")
	);
}

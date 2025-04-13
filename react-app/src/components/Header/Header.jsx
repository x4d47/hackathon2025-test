import { useContext } from "react";
import { SearchContext } from "../../context/Context.jsx";
import "./Header.css";

import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Logo from "../Logo/Logo.jsx";

export default function Header({ children, ...props }) {
	const userName = useSelector((state) => state.auth.user.name);

	return (
		<header className="header" {...props}>
			<div className="header-wrapper container">
				<Logo />
				<ul className="links">{children}</ul>
				<Link to="/profile" className="header__profile_link">
					{userName || "Login or Register"} &#8599;
				</Link>
			</div>
		</header>
	);
}

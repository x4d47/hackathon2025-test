import { useContext } from "react";
import { SearchContext } from "../../context/Context.jsx";
import "./Header.css";

import React from "react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header({ children, ...props }) {
	const location = useLocation();
	const currentPath = location.pathname.slice(1);
	const [isSearch, setIsSearch] = useState(false);
	const [isProfile, setIsProfile] = useState(false);

	const userName = useSelector((state) => state.auth.user.name);
	const isAuth = useSelector((state) => state.isAuthorizated);


	useEffect(() => {
		setIsSearch(() => {
			if (currentPath === "catalog") {
				return true;
			} else {
				return false;
			}
		});
		setIsProfile(() => {
			if (currentPath === "home") {
				return true;
			} else {
				return false;
			}
		});
	}, [currentPath]);

	return (
		<header className="header" {...props}>
			<div className="header-wrapper">
				<Link to="/home">
					<img src="../public/bank.svg" alt="logo" width="36px" />
				</Link>
				<ul className="links">{children}</ul>
				{isProfile && (
					<Link to="/profile" className="header__profile_link">
						{userName || "Login or Register"} &#8599;
					</Link>
				)}
			</div>
		</header>
	);
}

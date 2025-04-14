import "./Header.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Logo from "../Logo/Logo.jsx";
import useDevice from "../../hooks/useDevice.jsx";
import BurgerMenu from "../BurgerMenu/BurgerMenu.jsx";
import { useState } from "react";
import LinkButton from "./LinkButton.jsx";

export default function Header({ children, ...props }) {
	const userName = useSelector((state) => state.auth.user.name);
	const { isDesktop } = useDevice();
	const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);

	const handleBurgerMenuToggle = () => {
		setIsBurgerMenuOpen((prev) => !prev);
	};

	const desktopHeader = (
		<>
			<ul className="links">{children}</ul>
			<Link to="/profile" className="header__profile_link">
				{userName || "Login or Register"} &#8599;
			</Link>
		</>
	);

	return (
		<header className="header" {...props}>
			<div className="header-wrapper container">
				<Logo className="header__logo" />
				{isDesktop && desktopHeader}
				{!isDesktop && (
					<button className="header__burger" onClick={handleBurgerMenuToggle}>
						<img src="menu-outline.svg" height={24} width={24} />
					</button>
				)}
			</div>
			{!isDesktop && (
				<BurgerMenu isOpen={isBurgerMenuOpen}>{children}</BurgerMenu>
			)}
		</header>
	);
}

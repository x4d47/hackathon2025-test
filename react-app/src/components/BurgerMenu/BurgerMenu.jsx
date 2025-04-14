import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import useScrollBehavior from "../../hooks/useScrollBehavior";
import "./BurgerMenu.css";

export default function BurgerMenu({ isOpen, children }) {
	const userName = useSelector((state) => state.auth.user.name);

	// Використовуємо хук для блокування прокрутки
	useScrollBehavior(isOpen);

	if (!isOpen) return null;

	return (
		<div className="burger-menu__overlay">
			<div className="burger-menu__link">
				<ul>{children}</ul>
				<Link to="/profile" className="header__profile_link">
					{userName || "Login or Register"} &#8599;
				</Link>
			</div>
		</div>
	);
}

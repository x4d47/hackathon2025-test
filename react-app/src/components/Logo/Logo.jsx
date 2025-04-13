import { Link } from "react-router-dom";
import "./Logo.css";

export default function Logo({ className }) {
	return (
		<div className={`logo__wrapper ${className}`}>
			<Link to="/home">
				<div className="logo__container">
					<img src="../public/paws.svg" alt="logo" width="36px" />
					<span className="logo__text">House For Paws</span>
				</div>
			</Link>
		</div>
	);
}

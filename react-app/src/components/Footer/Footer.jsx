import React from "react";
import "./Footer.css";
import Logo from "../Logo/Logo";

export default function Footer() {
	return (
		<>
			<footer className="footer">
				<div className="footer-wrapper">
					<div className="main">
						<div className="main_logo margin-btm-sm">
							<Logo />
						</div>
					</div>
					<div className="copyright">
						<p className="paragraph">
							2025 Hackathon | Test Assigment | DEADBEEF &copy; Copyright all
							right reserved
						</p>
					</div>
				</div>
			</footer>
		</>
	);
}

import React from "react";
import "./Footer.css";

export default function Footer() {
	return (
		<>
			<footer className="footer">
				<div className="footer-wrapper">
					<div className="main">
						<div className="main_logo">
							<img src="../public/bank.svg" alt="logo" width="54px" />
						</div>
					</div>
					<div className="copyright">
						<p className="paragraph">
							2025 IoT &copy; Copyright all right reserved
						</p>
					</div>
				</div>
			</footer>
		</>
	);
}

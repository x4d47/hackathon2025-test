import React from "react";
import "./Footer.css";

export default function Footer() {
	return (
		<>
			<footer className="footer">
				<div className="footer-wrapper container">
					<div className=" grid grid--3-col main margin-btm-sm">
						<div className="main_descrition">
							<h3 className="heading-tertiary margin-btm-sm">Branding stuff</h3>
							<p className="paragraph">
								Lorem ipsum dolor sit amet, consectetur adipisicing elit.
								Praesentium illum et asperiores minima tenetur sapiente
								exercitationem labore ipsa
							</p>
						</div>
						<div className="main_logo">
							<img src="../public/bank.svg" alt="logo" width="64px" />
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

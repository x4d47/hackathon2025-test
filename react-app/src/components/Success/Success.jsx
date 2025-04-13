// Success.css

import "./Success.css";
import Button from "../Button/Button";

export default function Success() {
	return (
		<main className="container ">
			<div className="success__container">
				<div class="success-animation margin-btm-md">
					<svg
						class="checkmark"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 52 52">
						<circle
							class="checkmark__circle"
							cx="26"
							cy="26"
							r="25"
							fill="none"
						/>
						<path
							class="checkmark__check"
							fill="none"
							d="M14.1 27.2l7.1 7.2 16.7-16.8"
						/>
					</svg>
				</div>
				<h2 className="heading-secondary margin-btm-sm">Successfully</h2>
				<p className="paragraph margin-btm-md">
					Your order was sent to processing! <br /> Check your email box for
					further information.
				</p>
				<Button type="solid" tag="link" to="/catalog">
					Back to catalog
				</Button>
			</div>
		</main>
	);
}

import "./BarProduct.css";
import Characteristic from "../Characteristic/Characteristic";
import Wrapper from "../Wrapper/Wrapper";

export default function BarProduct({
	type = "simple",
	children,
	name,
	description,
	imgSrc,
	charArray = [],
}) {
	let currentBar;
	switch (type) {
		case "simple":
			currentBar = (
				<div className="bar-product-info container margin-btm-bg">
					<div className="bar-product-info_image">
						<img
							src={imgSrc ? `/${imgSrc}` : "/default-image.jpg"}
							alt="Product"
						/>
					</div>
					<div className="bar-product-info_description">
						<h1 className="heading-primary margin-btm-sm">{name}</h1>
						<p className="paragraph">{description}</p>
					</div>
				</div>
			);
			break;
		case "full":
			currentBar = (
				<div className="bar-product-info bar-product-info_same-height container">
					<div className="bar-product-info_image">
						<img
							src={imgSrc ? `/${imgSrc}` : "/default-image.jpg"}
							alt="Product"
						/>
					</div>
					<div className="bar-product-info_description bar-product-info_description__full">
						<Wrapper>
							{charArray && charArray.length > 0 ? (
								charArray.map((item, id) => (
									<Characteristic key={id}>{item}</Characteristic>
								))
							) : (
								<p>No characteristics available</p>
							)}
						</Wrapper>
						<div>
							<h1 className="heading-primary">{title}</h1>
							<p className="paragraph">{description}</p>
						</div>
						<div className="bar__support">{children}</div>
					</div>
				</div>
			);
			break;
		default:
			currentBar = null;
	}
	return currentBar;
}

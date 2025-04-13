import "./CardProduct.css";
import Button from "../Button/Button";

export default function CardProduct({
	id,
	title,
	description,
	imgSrc,
	bondPrice,
	bondPercent,
	type = "simple",
}) {
	let currentCard;

	switch (type) {
		case "simple":
			currentCard = (
				<div className="card card_simple">
					<img src={imgSrc} alt={title} className="card_img margin-btm-sm" />
					<h2 className="heading-secondary margin-btm-sm">{title}</h2>
					<p className="paragraph">{description}</p>
				</div>
			);
			break;
		case "full":
			currentCard = (
				<div className="card card_full">
					<div id="card__top">
						<p id="card__top__id">{id}</p>
					</div>
					<div id="card__wrapper">
						<img src={imgSrc} alt={title} className="card_img margin-btm-sm" />
						<h2 className="heading-secondary margin-btm-sm">{title}</h2>
						<p className="paragraph margin-btm-sm">{description}</p>
						<div className="card__value margin-btm-md">
							<h3 className="heading-tertiary">Price:</h3>
							<span className="card__value__price">{bondPrice}</span>
						</div>

						<Button tag="link" to={`/item/${id}`} isBig="true">
							View more
						</Button>
					</div>
				</div>
			);
			break;
	}
	return currentCard;
}

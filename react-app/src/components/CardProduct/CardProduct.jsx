import "./CardProduct.css";
import Button from "../Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCartAction } from "../../store/cartActions";
import { Link } from "react-router-dom";

export default function CardProduct({
	id,
	name,
	direction = "animal",
	imgSrc,
	type = "simple",
}) {
	let currentCard;

	const dispatch = useDispatch();
	const user = useSelector((state) => state.auth.user);

	const handleAddToCart = () => {
		if (!user) return;

		dispatch(
			addItemToCartAction({
				id,
				name,
				imgSrc,
				quantity: 1,
				bondPercent: 1,
			})
		);
	};

	switch (type) {
		case "simple":
			currentCard = (
				<div className="card card_simple">
					<Link to={`/${direction}/${id}`}>
						<img src={`/${imgSrc}`} className="card_img margin-btm-sm" />
					</Link>
					<h2 className="heading-secondary margin-btm-sm">{name}</h2>
				</div>
			);
			break;
		case "full":
			console.log("Rendering full card", id); // Додано для дебагу
			currentCard = (
				<div className="card card_full">
					<div id="card__top">
						<p id="card__top__id">{id}</p>

						<button onClick={handleAddToCart} className="card__favorite">
							<img src="heart.svg" width={32} height={32} alt="heart" />
						</button>
					</div>
					<div id="card__wrapper">
						<img
							src={`/${imgSrc}`}
							alt={name}
							className="card_img margin-btm-sm"
						/>
						<h2 className="heading-secondary margin-btm-sm">{name}</h2>
						<Button tag="link" to={`/${direction}/${id}`} isBig="true">
							View more
						</Button>
					</div>
				</div>
			);
			break;
		case "edit":
			currentCard = (
				<div className="card card_full">
					<div id="card__top">
						<p id="card__top__id">{id}</p>
					</div>
					<div id="card__wrapper">
						<img
							src={`/${imgSrc}`}
							alt={name}
							className="card_img margin-btm-sm"
						/>
						<h2 className="heading-secondary margin-btm-sm">{name}</h2>
						<div className="card__button_wrapper">
							<Button
								tag="link"
								to={`/edit/${id}`}
								isBig="true"
								className="card__button-edit">
								edit
							</Button>
							<Button
								type="outline"
								isBig="true"
								className="card__button-delete">
								Delete
							</Button>
						</div>
					</div>
				</div>
			);
			break;
	}

	return currentCard;
}

import "./CardProduct.css";
import Button from "../Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { addItemToFavoritesAction } from "../../store/favoriteActions";

export default function CardProduct({
	id,
	title,
	description,
	imgSrc,
	type = "simple",
}) {
	let currentCard;

	const dispatch = useDispatch();
	const user = useSelector((state) => state.auth.user);

	const handleAddToFavorites = () => {
		if (!user) return;

		dispatch(
			addItemToFavoritesAction({
				id,
				title,
				imgSrc,
			})
		);
	};

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

						<button onClick={handleAddToFavorites} className="card__favorite">
							<img src="heart.svg" width={32} height={32}></img>
						</button>
					</div>
					<div id="card__wrapper">
						<img src={imgSrc} alt={title} className="card_img margin-btm-sm" />
						<h2 className="heading-secondary margin-btm-sm">{title}</h2>
						<p className="paragraph margin-btm-md">{description}</p>
						<Button tag="link" to={`/item/${id}`} isBig="true">
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
						<img src={imgSrc} alt={title} className="card_img margin-btm-sm" />
						<h2 className="heading-secondary margin-btm-sm">{title}</h2>
						<p className="paragraph margin-btm-md">{description}</p>
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

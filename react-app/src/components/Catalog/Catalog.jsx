import { useContext } from "react";
import "./Catalog.css"
import FilterBar from "../FilterBar/FilterBar";
import CardWrapper from "../CardProduct/CardWrapper";
import CardProduct from "../CardProduct/CardProduct";
import Loading from "../Loading/Loading.jsx";

import { SearchContext } from "../../context/Context.jsx";

export default function Catalog() {
	const { cards, currentLoading } = useContext(SearchContext);

	if (currentLoading) {
		return (
			<main>
				<FilterBar className="margin-btm-md" />
				<Loading />;
			</main>
		);
	}

	return (
		<main>
			<FilterBar className="margin-btm-md" />
			<CardWrapper className="grid grid--3-col gap--96 CatCardsWrapper container" >
				{cards.map((item) => (
					<CardProduct key={item.title.toLowerCase()} {...item} type="full" />
				))}
			</CardWrapper>
		</main>
	);
}

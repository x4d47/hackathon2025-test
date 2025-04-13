import { useContext } from "react";
import CardWrapper from "../CardProduct/CardWrapper.jsx";
import CardProduct from "../CardProduct/CardProduct";
import Button from "../Button/Button.jsx";
import Wrapper from "../Wrapper/Wrapper.jsx";
import Loading from "../Loading/Loading.jsx";
import "./Home.css";

import { ProductContext } from "../../context/Context.jsx";

export default function Home() {
	const { currentCards, lazyLoading, currentLoading, currentNextQuery } =
		useContext(ProductContext);

	if (currentLoading) {
		return <Loading />;
	}

	return (
		<main className="CardsContainer">
			<div className="margin-btm-bg">
				<h2
					className="heading-secondary margin-top-md margin-btm-md"
					id="cart__heading">
					Animals
				</h2>
				<CardWrapper className="grid grid--3-col gap--96 container CardsWrapper">
					{currentCards.map((item) => (
						<CardProduct key={item.title.toLowerCase()} {...item} />
					))}
				</CardWrapper>
				<Wrapper className="Wrapper">
					<Button
						style={currentNextQuery ? null : { display: "none" }}
						onClick={lazyLoading}>
						View more
					</Button>
				</Wrapper>
			</div>
			<div className="margin-btm-md">
				<h2
					className="heading-secondary margin-top-md margin-btm-bg"
					id="cart__heading">
					Shelters
				</h2>
				<CardWrapper className="grid grid--3-col gap--96 container CardsWrapper">
					{currentCards.map((item) => (
						<CardProduct key={item.title.toLowerCase()} {...item} />
					))}
				</CardWrapper>
				<Wrapper className="Wrapper margin">
					<Button
						style={currentNextQuery ? null : { display: "none" }}
						onClick={lazyLoading}>
						View more
					</Button>
				</Wrapper>
			</div>
		</main>
	);
}

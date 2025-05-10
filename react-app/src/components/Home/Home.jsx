import { useContext } from "react";
import CardWrapper from "../CardProduct/CardWrapper.jsx";
import CardProduct from "../CardProduct/CardProduct";
import Wrapper from "../Wrapper/Wrapper.jsx";
import Loading from "../Loading/Loading.jsx";
import "./Home.css";

import { ProductContext } from "../../context/Context.jsx";
import Button from "../Button/Button.jsx";

export default function Home() {
	const { currentCards, currentLoading } = useContext(ProductContext);

	if (currentLoading) {
		return <Loading />;
	}

	// Якщо currentCards містить об'єкт, отримуємо масив з нього
	const animals = currentCards?.animals || [];

	// Фільтрація карток за видом тварин
	const dogs = animals.filter((card) => card.specie === "Dog");
	const cats = animals.filter((card) => card.specie === "Cat");

	return (
		<main className="CardsContainer">
			{/* Виведення карток для собак */}
			<div className="margin-btm-bg">
				<h2
					className="heading-secondary margin-top-md margin-btm-md"
					id="cart__heading">
					Dogs
				</h2>
				<CardWrapper className="grid grid--3-col gap--96 container CardsWrapper">
					{dogs.map((item) => (
						<CardProduct key={item.id} {...item} />
					))}
				</CardWrapper>
				<Wrapper className="Wrapper margin">
					<Button>View more</Button>
				</Wrapper>
			</div>

			{/* Виведення карток для котів */}
			<div className="margin-btm-md">
				<h2
					className="heading-secondary margin-top-md margin-btm-bg"
					id="cart__heading">
					Cats
				</h2>
				<CardWrapper className="grid grid--3-col gap--96 container CardsWrapper">
					{cats.map((item) => (
						<CardProduct key={item.id} {...item} />
					))}
				</CardWrapper>
				<Wrapper className="Wrapper margin">
					<Button>View more</Button>
				</Wrapper>
			</div>
		</main>
	);
}

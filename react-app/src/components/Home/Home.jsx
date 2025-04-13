// import { useContext, useEffect } from "react";
// import BarProduct from "../ BarProduct/BarProduct.jsx";
// import CardWrapper from "../CardProduct/CardWrapper.jsx";
// import CardProduct from "../CardProduct/CardProduct";
// import Button from "../Button/Button.jsx";
// import Wrapper from "../Wrapper/Wrapper.jsx";

// import Loading from "../Loading/Loading.jsx";

// import { ProductContext, SearchContext } from "../../context/Context.jsx";
// import { useState } from "react";

// export default function Home() {
// 	const { currentCards, lazyLoading, loading } = useContext(ProductContext);
// 	const [isLoading, SetIsLoading] = useState(loading);

// 	useEffect(() => {
// 		SetIsLoading((oldLoading) => !oldLoading);
// 	}, [loading]);

// 	const randomBankObj = Math.floor(Math.random() * currentCards.length);

// 	const homePage = (
// 		<main className="margin-top-md margin-btm-md">
// 			<BarProduct type="simple" {...currentCards[randomBankObj]} />
// 			<CardWrapper className="grid grid--3-col gap--96 container margin-btm-md">
// 				{currentCards.map((item) => (
// 					<CardProduct key={item.title.toLowerCase()} {...item} />
// 				))}
// 			</CardWrapper>
// 			<Wrapper style={{ textAlign: "center" }}>
// 				<Button onClick={() => lazyLoading()}>View more</Button>
// 			</Wrapper>
// 		</main>
// 	);

// 	const LoadingPage = (
// 		<Load></Load>
// 	);

// 	return {isLoading ?  : homePage};
// }

import { useContext, useEffect } from "react";
import BarProduct from "../BarProduct/BarProduct.jsx";
import CardWrapper from "../CardProduct/CardWrapper.jsx";
import CardProduct from "../CardProduct/CardProduct";
import Button from "../Button/Button.jsx";
import Wrapper from "../Wrapper/Wrapper.jsx";
import Loading from "../Loading/Loading.jsx";

import { ProductContext } from "../../context/Context.jsx";

export default function Home() {
	const { currentCards, lazyLoading, currentLoading, currentNextQuery } =
		useContext(ProductContext);

	const randomBankObj = Math.floor(Math.random() * currentCards.length);

	if (currentLoading) {
		return <Loading />;
	}

	return (
		<main className="margin-top-md margin-btm-md">
			<BarProduct type="simple" {...currentCards[randomBankObj]} />
			<CardWrapper className="grid grid--3-col gap--96 container margin-btm-md">
				{currentCards.map((item) => (
					<CardProduct key={item.title.toLowerCase()} {...item} />
				))}
			</CardWrapper>
			<Wrapper style={{ textAlign: "center" }}>
				<Button
					style={currentNextQuery ? null : { display: "none" }}
					onClick={lazyLoading}>
					View more
				</Button>
			</Wrapper>
		</main>
	);
}

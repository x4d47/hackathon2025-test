import { useContext } from "react";
import FilterBar from "../FilterBar/FilterBar";
import CardWrapper from "../CardProduct/CardWrapper";
import CardProduct from "../CardProduct/CardProduct";
import Loading from "../Loading/Loading.jsx";
import Notifications from "../Notifications/Notifications.jsx";

import { SearchContext } from "../../context/Context.jsx";
import { useSelector, useDispatch } from "react-redux";
import { errorActions } from "../../store/errorSlice.jsx";

export default function Edit() {
	const { cards, currentLoading } = useContext(SearchContext);
	const { status } = useSelector((state) => state.error);
	const dispatch = useDispatch();

	if (currentLoading) {
		return (
			<main>
				<Loading />;
			</main>
		);
	}

	return (
		<main>
			<Notifications
				type={status?.type}
				action={status?.text}
				handleCloseAction={() => dispatch(errorActions.clearStatus())}
			/>
			<h2
				className="heading-secondary margin-top-md margin-btm-md"
				id="cart__heading">
				Edit your animals
			</h2>
			<CardWrapper className="grid grid--3-col gap--96 CatCardsWrapper container">
				{cards.map((item) => (
					<CardProduct key={item.title.toLowerCase()} {...item} type="edit" />
				))}
			</CardWrapper>
		</main>
	);
}

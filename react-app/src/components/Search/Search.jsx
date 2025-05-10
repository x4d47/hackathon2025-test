import { useContext } from "react";
import "./Search.css";
import FilterBar from "../FilterBar/FilterBar";
import CardWrapper from "../CardProduct/CardWrapper";
import CardProduct from "../CardProduct/CardProduct";
import Loading from "../Loading/Loading.jsx";
import Notifications from "../Notifications/Notifications.jsx";

import { SearchContext } from "../../context/Context.jsx";
import { useSelector, useDispatch } from "react-redux";
import { errorActions } from "../../store/errorSlice.jsx";
export default function Search() {
	const { cards, currentLoading } = useContext(SearchContext);
	const { status } = useSelector((state) => state.error);
	const dispatch = useDispatch();

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
			<Notifications
				type={status?.type}
				action={status?.text}
				handleCloseAction={() => dispatch(errorActions.clearStatus())}
			/>
			<FilterBar className="margin-btm-md" />
			<CardWrapper className="grid grid--3-col gap--96 CatCardsWrapper container">
				{cards.map((item) => (
					<CardProduct key={item.title.toLowerCase()} {...item} type="full" />
				))}
			</CardWrapper>
		</main>
	);
}

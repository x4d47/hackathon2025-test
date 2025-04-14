import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import BarProduct from "../BarProduct/BarProduct";
import Button from "../Button/Button";
import "./Item.css";
import useAxios from "../../hooks/useAxios";
import Loading from "../Loading/Loading";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addItemToCartAction } from "../../store/cartActions";
import Notifications from "../Notifications/Notifications";
import { errorActions } from "../../store/errorSlice";

// const CHARACTERISTICS = ["Lviv", "Dog"];

// const DUMMY_DATA = {
// 	id: 2231,
// 	title: "Dog",
// 	description: "Dog description",
// 	imgSrc: "https://images.unsplash.com/photo-1560807707-8cc77767d783",
// 	charArray: CHARACTERISTICS,
// };

export default function Item() {
	const { getDataById } = useAxios();
	const { id } = useParams();
	const [loading, setLoading] = useState(true);
	const [cardData, setCardData] = useState(true);

	const dispatch = useDispatch();

	const { status } = useSelector((state) => state.error);

	const navigate = useNavigate();

	const fetchCard = async () => {
		try {
			const response = await getDataById(
				"http://127.0.0.1:8080/bank",
				parseInt(id)
			);
			setCardData(response);
		} catch (error) {
			console.error("Error fetching data:", error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchCard();
	}, [id]);

	if (loading) {
		return <Loading />;
	}

	return (
		<main id="wrapper">
			<Notifications
				type={status?.type}
				action={status?.text}
				handleCloseAction={() => dispatch(errorActions.clearStatus())}
			/>
			<div className="margin-btm-md">
				<BarProduct type="full" {...cardData}>
					<div>
						<p className="profile__text-info margin-btm-sm">
							Lviv Shelther for homeless pets
						</p>
						<p className="profile__text-info margin-btm-sm">
							Lviv, st. Stepana Bandery 10
						</p>
						<p className="profile__text-info margin-btm-bg">063-792-2868</p>
					</div>
				</BarProduct>
			</div>
			<div className="container" id="action-bar">
				<div>
					<Button tag="link" type="outline" onClick={() => navigate(-1)}>
						Go back
					</Button>
				</div>
				<div id="button-wrapper">
					<Button tag="link" type="outline" onClick={() => navigate(-1)}>
						Donate me!
					</Button>
					<Button type="solid">Go to the shelter</Button>
				</div>
			</div>
		</main>
	);
}

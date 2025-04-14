import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import BarProduct from "../BarProduct/BarProduct";
import Button from "../Button/Button";
import "./Item.css";
import useAxios from "../../hooks/useAxios";
import Loading from "../Loading/Loading";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Notifications from "../Notifications/Notifications";
import { errorActions } from "../../store/errorSlice";

export default function Item() {
	const { getDataById } = useAxios();
	const { id } = useParams();
	const [loading, setLoading] = useState(true);
	const [cardData, setCardData] = useState(null);

	const dispatch = useDispatch();

	const { status } = useSelector((state) => state.error);

	const navigate = useNavigate();

	const fetchCard = async () => {
		try {
			const response = await getDataById("http://localhost:8080/animal/2", id); // Використовуємо новий шлях
			setCardData(response);
		} catch (error) {
			setError("Error fetching item data");
			console.error("Error:", error);
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
				<BarProduct type="full" {...cardData.animal}>
					<div>
						<p className="profile__text-info margin-btm-sm">
							Paw Haven Shelter for homeless pets
						</p>
						<p className="profile__text-info margin-btm-sm">
							Lviv, st. Stepana Bandery 10
						</p>
						<p className="profile__text-info margin-btm-bg">063-792-2868</p>
					</div>
				</BarProduct>
			</div>
			<div className="margin-btm-md">
				<p className="profile__text-info margin-btm-sm">
					<strong>Name:</strong> {cardData.animal.name}
				</p>
				<p className="profile__text-info margin-btm-sm">
					<strong>Species:</strong> {cardData.animal.specie}
				</p>
				<p className="profile__text-info margin-btm-sm">
					<strong>Age:</strong> {cardData.animal.age} years old
				</p>
				<p className="profile__text-info margin-btm-sm">
					<strong>Added on:</strong>{" "}
					{new Date(cardData.animal.created_at).toLocaleDateString()}
				</p>
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

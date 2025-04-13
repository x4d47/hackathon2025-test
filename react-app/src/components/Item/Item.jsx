import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import BarProduct from "../BarProduct/BarProduct";
import Wrapper from "../Wrapper/Wrapper";
import Filter from "../Filter/Filter";
import Option from "../Option/Option";
import Input from "../Input/Input";
import Button from "../Button/Button";
import "./Item.css";
import useAxios from "../../hooks/useAxios";
import Loading from "../Loading/Loading";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cartSlice";
import { addItemToCartAction } from "../../store/cartActions";
import Notifications from "../Notifications/Notifications";
import { errorActions } from "../../store/errorSlice";

export default function Item() {
	const { getDataById } = useAxios();
	const { id } = useParams();
	const [loading, setLoading] = useState(true);
	const [cardData, setCardData] = useState(null); // Стан для збереження даних картки

	const dispatch = useDispatch();

	const { status } = useSelector((state) => state.error);

	const quantityRef = useRef(null);
	const bondPercentRef = useRef(null);

	const navigate = useNavigate();

	const fetchCard = async () => {
		try {
			const response = await getDataById(
				"http://127.0.0.1:8080/bank",
				parseInt(id)
			);
			setCardData(response); // Зберігаємо дані у стані cardData
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

	function validationInputField(value) {
		if (!value) {
			dispatch(
				errorActions.setStatus({
					type: "error",
					text: "Type peace count!",
				})
			);
		} else if (!isNaN(value)) {
			return parseInt(value);
		} else {
			dispatch(
				errorActions.setStatus({
					type: "error",
					text: "Only number!",
				})
			);
		}
	}

	function validationSelectField(value) {
		if (!isNaN(value)) {
			return parseFloat(value);
		} else {
			dispatch(
				errorActions.setStatus({
					type: "error",
					text: "Change percentage!",
				})
			);
		}
	}

	const handleClickAddItemToCart = () => {
		const { id, title, imgSrc, bondPrice } = cardData;

		dispatch(
			addItemToCartAction({
				id,
				title,
				imgSrc,
				bondPrice,
				bondPercent: validationSelectField(bondPercentRef.current.value),
				quantity: validationInputField(quantityRef.current.value),
			})
		);
	};

	return (
		<main id="wrapper">
			<Notifications
				type={status?.type}
				action={status?.text}
				handleCloseAction={() => dispatch(errorActions.clearStatus())} // Виправлено на clearStatus
			/>
			<BarProduct type="full" {...cardData}>
				<Wrapper style={{ display: "flex", gap: "3.2rem" }}>
					<Input
						title="Peace count"
						placeholder="10..."
						typeValue="number"
						min="0"
						ref={quantityRef}></Input>
					<Filter title="Percent value" ref={bondPercentRef}>
						<Option>Select percent value</Option>
						{cardData.bondPercent.map((item, id) => (
							<Option key={id} value={item}>
								{item}
							</Option>
						))}
					</Filter>
				</Wrapper>
			</BarProduct>
			<div className="container" id="action-bar">
				<span id="price">
					Price: ${cardData.bondPrice.toLocaleString("de-DE")}
				</span>
				<div id="button-wrapper">
					<Button tag="link" type="outline" onClick={() => navigate(-1)}>
						Go back
					</Button>
					<Button type="solid" onClick={handleClickAddItemToCart}>
						Add to card
					</Button>
				</div>
			</div>
		</main>
	);
}

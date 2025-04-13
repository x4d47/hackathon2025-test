import Filter from "../Filter/Filter";
import Option from "../Option/Option";
import Button from "../Button/Button";
import { useContext, useState } from "react";
import { SearchContext } from "../../context/Context.jsx";
import "./FilterBar.css";

export default function FilterBar({ ...props }) {
	const { useFilter } = useContext(SearchContext);

	const [currentCategory, setCategory] = useState("");
	const [currentTitle, setTitle] = useState("");
	const [currentPrice, setPrice] = useState("");
	const [currentPercentage, setPercentage] = useState("");

	function handleButtonFilter() {
		const filterParametersObj = {
			title: currentTitle,
			price: currentPrice,
			percentage: currentPercentage,
		};

		useFilter(filterParametersObj);
	}

	return (
		<section {...props} id="section">
			<div id="section-filter">
				<div id="filter-wrapper">
					<Filter
						name="category"
						className="margin-right-md"
						onChange={(event) => setCategory(event.target.value)}>
						<Option value="Animals">Animals</Option>
						<Option value="Shelters">Shelters</Option>
					</Filter>
					<Filter
						name="title"
						className="margin-right-md"
						onChange={(event) => setTitle(event.target.value)}>
						<Option value="">Without sorting</Option>
						<Option value="aZ">A-Z</Option>
						<Option value="zA">Z-A</Option>
					</Filter>
					<Filter
						name="price"
						className="margin-right-md"
						onChange={(event) => setPrice(event.target.value)}>
						<Option value="">All price</Option>
						<Option value="highPrice">High price</Option>
						<Option value="lowPrice">Low price</Option>
					</Filter>
					<Filter
						name="percentage"
						className="margin-right-md"
						onChange={(event) => setPercentage(event.target.value)}>
						<Option value="">All percentage</Option>
						<Option value="1.5">1.5%</Option>
						<Option value="2.5">2.5%</Option>
						<Option value="5">5%</Option>
					</Filter>
				</div>
				<Button type="outline" onClick={handleButtonFilter}>
					Apply
				</Button>
			</div>
		</section>
	);
}

import Filter from "../Filter/Filter";
import Option from "../Option/Option";
import Button from "../Button/Button";
import { useContext, useState } from "react";
import { SearchContext } from "../../context/Context.jsx";
import "./FilterBar.css";
import Input from "../Input/Input";

export default function FilterBar({ ...props }) {
	const { useFilter } = useContext(SearchContext);

	const [currentCategory, setCategory] = useState("Animals");
	const [currentSecCategory, setSecCategory] = useState("");
	const [currentTitle, setTitle] = useState("");
	const [currentLocation, setLocation] = useState("");
	const [currentPrice, setPrice] = useState("");
	const [currentPercentage, setPercentage] = useState("");
	const { updateKeyword } = useContext(SearchContext);

	function handleButtonFilter() {
		const filterParametersObj = {
			title: currentTitle,
			price: currentPrice,
			percentage: currentPercentage,
		};

		useFilter(filterParametersObj);
	}

	function handleSearch(event) {
		const value = event.target.value;
		const validation = value.trim();
		updateKeyword(validation);
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
						name="sec_category"
						className="margin-right-md"
						onChange={(event) => setSecCategory(event.target.value)}>
						<Option value="">All</Option>
						{
							currentCategory == "Animals" 
							? (
								<>
									<Option value="Cats">Cats</Option>
									<Option value="Dogs">Dogs</Option>
								</>
							)
							: (
								<>
									<Option value="Shelter">Shelter</Option>
									<Option value="Vet Clinick">Vet Clinick</Option>
								</>
							)
						}
						
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
						name="location"
						className="margin-right-md"
						onChange={(event) => setLocation(event.target.value)}>
						<Option value="">Any</Option>
						<Option value="My">My location</Option>
					</Filter>
				</div>
				<Button type="outline" onClick={handleButtonFilter}>
					Apply
				</Button>
				<Input
					type="image"
					img={"./search.svg"}
					id="search"
					onChange={handleSearch}
				/>
			</div>
		</section>
	);
}

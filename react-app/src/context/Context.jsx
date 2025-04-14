import { createContext, useState, useEffect } from "react";
import useAxios from "../hooks/useAxios";

const ProductContext = createContext();
const SearchContext = createContext();

const Context = (props) => {
	const { getData } = useAxios();

	const [currentLoading, SetLoading] = useState(true);
	const [currentCards, setCards] = useState([]);

	useEffect(() => {
		loadAllCards();
	}, []);

	const loadAllCards = async () => {
		try {
			const data = await getData("http://localhost:8080/animal/search");
			setCards(data);
			SetLoading(false);
		} catch (error) {
			console.error("Error loading cards:", error);
		}
	};

	return (
		<ProductContext.Provider value={{ currentCards, currentLoading }}>
			{props.children}
		</ProductContext.Provider>
	);
};

// Search частину можна залишити без змін
const Search = (props) => {
	const { getData } = useAxios();

	const [filterProperty, setFilterProperty] = useState({
		title: "",
		price: "",
		percentage: "",
	});
	const [currentLoading, SetLoading] = useState(true);
	const [cards, setCards] = useState([]);
	const [currentKeyword, setKeyword] = useState("");

	const useFilter = async (sortTypeObj = filterProperty) => {
		SetLoading(true);
		try {
			setFilterProperty((oldFilterProp) => {
				if (oldFilterProp !== sortTypeObj) {
					return sortTypeObj;
				} else {
					return oldFilterProp;
				}
			});
			const { title, price, percentage } = sortTypeObj;

			const sortingType = () => {
				if (price) {
					return price;
				} else if (title) {
					return title;
				} else {
					return null;
				}
			};
			const queryPart = sortingType() ? `&type=${sortingType()}` : "";

			const data = await getData(
				`http://127.0.0.1:8080/bank/?key=${currentKeyword}${queryPart}&only=${percentage}`
			);

			setCards(() => data);
			SetLoading(false);
		} catch (error) {
			console.error("Error loading data:", error);
		}
	};

	const updateKeyword = (keyword) => {
		setKeyword(() => keyword);
	};

	useEffect(() => {
		useFilter();
	}, [currentKeyword]);

	return (
		<SearchContext.Provider
			value={{ cards, updateKeyword, useFilter, currentLoading }}>
			{props.children}
		</SearchContext.Provider>
	);
};

export const AppProviders = ({ children }) => (
	<Context>
		<Search>{children}</Search>
	</Context>
);

export { ProductContext, SearchContext };

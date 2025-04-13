import React, { createContext, useState, useEffect, useCallback } from "react";
import useAxios from "../hooks/useAxios";

const ProductContext = createContext();
const SearchContext = createContext();

const Context = (props) => {
	const { getSliceData } = useAxios();

	const clusterSize = 3;

	const [currentIndex, setIndex] = useState(0);
	const [currentLoading, SetLoading] = useState(true);
	const [currentNextQuery, setNextQuery] = useState(true);
	const [currentCards, setCards] = useState([]);

	useEffect(() => {
		lazyLoading();
	}, []);

	const lazyLoading = async () => {
		const nextClusterIndex = currentIndex + clusterSize;
		try {
			const { cards, nextQuery } = await getSliceData(
				"http://127.0.0.1:8080/bank/cluster",
				currentIndex
			);

			// Фільтруємо нові картки, щоб уникнути дублювання
			setCards((oldCards) => {
				const uniqueCards = [...oldCards, ...cards];
				return uniqueCards;
			});

			SetLoading(false);
			setNextQuery(nextQuery);
			setIndex(nextClusterIndex);
		} catch (error) {
			console.error("Error loading data:", error);
		}
	};

	return (
		<ProductContext.Provider
			value={{ currentCards, lazyLoading, currentLoading, currentNextQuery }}>
			{props.children}
		</ProductContext.Provider>
	);
};

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

			// по суті, якщо друге сортування застосовано, тобто воно true, тоді перше сортування застосоване не буде. І якщо 2 сортування застосовано, то всепівер поверне price
			const sortingType = () => {
				price ? price : title;

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

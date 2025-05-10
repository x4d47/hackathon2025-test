import axios from "axios";

function useAxios() {
	// Функція для отримання всіх даних
	const getData = async (url) => {
		try {
			const response = await axios.get(url);
			return response.data;
		} catch (error) {
			console.error("Error fetching data:", error);
			throw error; // Рекомендується викидати помилку, щоб її можна було обробити в компоненті
		}
	};

	// Функція для відправки даних на сервер
	const postData = async (url, data) => {
		try {
			const response = await axios.post(url, data);
			return response.data;
		} catch (error) {
			console.error("Error posting data:", error);
			throw error;
		}
	};

	// Функція для отримання даних по ID
	const getDataById = async (url, id) => {
		try {
			console.log(`Fetching data from: ${url}/${id}`); // Додаємо лог для перевірки URL
			const response = await axios.get(`${url}/${id}`);
			if (response.data) {
				return response.data;
			}
			return response.data;
		} catch (error) {
			console.error(`Error fetching data by ID: ${id}`, error);
			throw error;
		}
	};

	const getSliceData = async (url, sliceCount) => {
		try {
			const response = await axios.get(`${url}/${sliceCount}`);
			const [nextQueryObj, ...cards] = response.data;
			const nextQuery = nextQueryObj?.nextQuery || null;

			return { nextQuery, cards };
		} catch (error) {
			console.error("Error fetching sliced data:", error);
			throw error;
		}
	};

	return { getData, postData, getDataById, getSliceData };
}

export default useAxios;

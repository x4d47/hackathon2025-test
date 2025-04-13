import axios from "axios";

function useAxios() {
	const getData = async (url) => {
		try {
			const response = await axios.get(url);

			return response.data;
		} catch (error) {
			console.error(error);
		}
	};

	const postData = async (url, data) => {
		try {
			const response = await axios.post(url, data);
			return response.data;
		} catch (error) {
			console.error(error);
		}
	};

	const getDataById = async (url, id) => {
		try {
			const response = await axios.get(`${url}/${id}`);

			return response.data[0];
		} catch (error) {
			console.error(error);
		}
	};

	const getSliceData = async (url, sliceCount) => {
		try {
			const response = await axios.get(`${url}/${sliceCount}`);
			const [nextQueryObj, ...cards] = response.data;
			const nextQuery = nextQueryObj.nextQuery;

			return { nextQuery, cards };
		} catch (error) {
			console.error(error);
		}
	};

	return { getData, postData, getDataById, getSliceData };
}

export default useAxios;

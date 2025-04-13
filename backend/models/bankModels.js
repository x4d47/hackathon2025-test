export default function parseBank(obj) {
	const result = obj.map((object) => ({
		id: object.id,
		title: object.title,
		description: object.description,
		imgSrc: object.imgSrc,
		bondPrice: object.bondPrice,
		bondPercent: object.bondPercent
			? object.bondPercent.split(",").map(Number)
			: [],
		charArray: object.charArray ? object.charArray.split(",") : [],
	}));
	return result;
}

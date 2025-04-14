import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const useDevice = () => {
	const location = useLocation();

	const [device, setDevice] = useState({
		isMobile: false,
		isTablet: false,
		isDesktop: false,
		screenWidth: 0,
	});

	const updateDevice = () => {
		const screenWidth = window.innerWidth;
		const isMobile = screenWidth <= 767;
		const isTablet = screenWidth >= 768 && screenWidth <= 992;
		const isDesktop = screenWidth > 970;

		setDevice({
			isMobile,
			isTablet,
			isDesktop,
			screenWidth,
		});
	};

	// 🔁 Виклик при завантаженні та зміні розміру
	useEffect(() => {
		updateDevice();
		window.addEventListener("resize", updateDevice);
		return () => {
			window.removeEventListener("resize", updateDevice);
		};
	}, []);

	// 🔁 Виклик при зміні маршруту
	useEffect(() => {
		updateDevice();
	}, [location.pathname]);

	return device;
};

export default useDevice;

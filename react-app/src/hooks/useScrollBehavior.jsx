import { useEffect } from "react";

const useScrollBehavior = (isOpen) => {
	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "auto";
		}

		// Очищаємо ефект, щоб прокрутка відновлювалась при демонтованому компоненті
		return () => {
			document.body.style.overflow = "auto";
		};
	}, [isOpen]);
};

export default useScrollBehavior;

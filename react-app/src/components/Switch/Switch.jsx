import "./Switch.css";
import Button from "../Button/Button";

export default function Switch({
	isFirst,
	text,
	onChange,
	className,
	...props
}) {
	const { firstButton, secondButton } = text;

	return (
		<div className={`switch__container ${className}`} {...props}>
			<Button
				type={`${isFirst ? "solid" : "outline"}`}
				isBig
				onClick={() => onChange(true)}>
				{firstButton}
			</Button>
			<Button
				type={`${isFirst ? "outline" : "solid"}`}
				isBig
				onClick={() => onChange(false)}>
				{secondButton}
			</Button>
		</div>
	);
}

import "./Loading.css";

export default function Loading({ ...props }) {
	return (
		<div id="area">
			<div class="spinner" {...props}></div>
		</div>
	);
}

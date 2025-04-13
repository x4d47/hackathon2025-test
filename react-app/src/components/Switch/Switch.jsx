export default function Switch({ firstbutton, LastButton }) {
	return (
		<div>
			<button className="btn btn--primary" onClick={firstbutton}>
				Sing Up
			</button>
			<button className="btn btn--secondary" onClick={LastButton}>
				Sing In
			</button>
		</div>
	);
}

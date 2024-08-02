import "./HamBurgerIcon.css";

export default function HamBurgerIcon(props) {
	return (
		<div
			className={props.status ?  "HamBurgerIcon active" :"HamBurgerIcon"}
		>
			<span></span>
			<span></span>
			<span></span>
	
		</div>
	);
}

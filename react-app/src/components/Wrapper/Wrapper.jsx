import "./Wrapper.css";

export default function Wrapper({ tag: Tag = "div", children, ...props }) {
	return <Tag {...props}>{children}</Tag>;
}

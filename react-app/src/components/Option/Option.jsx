export default function Option({ tag: Tag = "option", children, ...props }) {
	return <Tag {...props}>{children}</Tag>;
}

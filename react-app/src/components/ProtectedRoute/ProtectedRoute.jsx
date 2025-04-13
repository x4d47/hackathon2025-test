import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, edit = false }) {
	const { isAuthorizated } = useSelector((state) => state.auth);
	const { isShelter } = useSelector((state) => state.auth);

	if (edit && !isAuthorizated && isShelter) {
		return <Navigate to="/" replace />;
	}

	if (!isAuthorizated) {
		return <Navigate to="/" replace />;
	}

	return children;
}

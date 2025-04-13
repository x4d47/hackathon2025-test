import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children }) {
	const { isAuthorizated } = useSelector((state) => state.auth);

	if (!isAuthorizated) {
		return <Navigate to="/" replace />;
	}
	return children;
}

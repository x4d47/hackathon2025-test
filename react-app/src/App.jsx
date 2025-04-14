import { useEffect, useState } from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import LinkButton from "./components/Header/LinkButton";
import Home from "./components/Home/Home";
import Search from "./components/Search/Search";
import Item from "./components/Item/Item";
import { useSelector } from "react-redux";

import Edit from "./components/Edit/Edit";

import { Routes, Route, useLocation } from "react-router-dom";

import Profile from "./components/Profile/Profile";
import Auth from "./components/Auth/Auth";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Favorite from "./components/Favorite/Favorite";

function App() {
	const location = useLocation();
	const currentPath = location.pathname.slice(1);
	const [currentPage, changePage] = useState(currentPath);

	useEffect(() => {
		changePage(currentPath);
	}, [currentPath]);

	const totalQuantity = useSelector((state) => state.cart.totalQuantity);

	return (
		<div className="wrapper">
			<Header>
				<LinkButton to="/home" isActive={currentPage}>
					Home
				</LinkButton>
				<LinkButton to="/search" isActive={currentPage}>
					Search
				</LinkButton>
				<LinkButton
					to="/favorite"
					isActive={currentPage}
					FavoriteCount={totalQuantity || null}>
					Favorite
				</LinkButton>
				<LinkButton to="/edit" isActive={currentPage}>
					Edit
				</LinkButton>
			</Header>
			<Routes>
				<Route path="/" element={<Auth />} />
				<Route path="/home" element={<Home />} />
				<Route path="/search" element={<Search />} />
				<Route
					path="/edit"
					element={
						<ProtectedRoute edit>
							<Edit />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/animal/:id"
					element={
						<ProtectedRoute>
							<Item />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/profile"
					element={
						<ProtectedRoute>
							<Profile />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/favorite"
					element={
						<ProtectedRoute>
							<Favorite />
						</ProtectedRoute>
					}
				/>
				{/* <Route
					path="/cart/checkout"
					element={
						<ProtectedRoute>
							<Checkout />
						</ProtectedRoute>
					}
				/> */}
				{/* <Route
					path="/cart/success"
					element={
						<ProtectedRoute>
							<Success />
						</ProtectedRoute>
					}
				/> */}
			</Routes>
			<Footer />
		</div>
	);
}

export default App;

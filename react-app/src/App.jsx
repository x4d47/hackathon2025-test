import React, { useEffect, useState } from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import LinkButton from "./components/Header/LinkButton";
import Home from "./components/Home/Home";
import Catalog from "./components/Catalog/Catalog";
import Item from "./components/Item/Item";
import { useSelector } from "react-redux";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { useLocation } from "react-router-dom";

import Notification from "./components/Notifications/Notifications";
import Profile from "./components/Profile/Profile";
import Checkout from "./components/Checkout/Checkout";
import Success from "./components/Success/Success";
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
				<LinkButton to="/catalog" isActive={currentPage}>
					Search
				</LinkButton>
				<LinkButton
					to="/favorite"
					isActive={currentPage}
					FavoriteCount={totalQuantity || null}>
					Favorite
				</LinkButton>
			</Header>
			<Routes>
				<Route path="/" element={<Auth />} />
				<Route path="/home" element={<Home />} />
				<Route path="/catalog" element={<Catalog />} />
				<Route
					path="/item/:id"
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

import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./core/Home";
import Signup from "./user/Signup";
import Profile from "./user/Profile";
import Contact from "./core/Contact";
import About from "./core/About";
import Login from "./user/Login";
import PrivateRoute from "./auth/helper/PrivateRoutes";
import Cart from "./core/Cart";
import Product from "./core/Product";
import Order from "./core/Order";
import Updateprofile from "./user/Updateprofile";
import ProductView from "./core/SingleProduct";
import ViewOrders from "./user/ViewOrders";



const Router = () => {
    return(
        <BrowserRouter>
        <Routes>
            <Route path="/" exact Component={Home}></Route>
            <Route path="/signup" exact Component={Signup}></Route>
            <Route path="/login" exact Component={Login}></Route>
            <Route path="/cart" exact Component={Cart}></Route>
            <Route path="/product"  exact Component={Product}></Route>
            <Route path="/singleproduct/:productId"  exact Component={ProductView}></Route>
            <Route path="/contact"  exact Component={Contact}></Route>
            <Route path="/about"  exact Component={About}></Route>
            <Route path="/order" exact Component={Order}></Route>
            <Route path="/updateprofile" exact Component={Updateprofile}></Route>
            <Route path="/profile" element={<PrivateRoute Component={Profile} />} />
            <Route path="/vieworders" exact Component={ViewOrders}></Route>
        </Routes>
        </BrowserRouter>
    )
};

export default Router;
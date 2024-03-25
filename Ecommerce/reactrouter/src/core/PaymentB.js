import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { cartEmpty } from "./helper/CartHelper";
import { getmeToken, processPayment } from "./helper/PaymentHelper";
import { createOrder } from "./helper/OrderHelper";
import { isAuthenticated } from "../auth/helper";
import DropIn from "braintree-web-drop-in-react";

const Payment = ({ products, reload = undefined, setReload = (f) => f }) => {
    const navigate = useNavigate();

    const [info, setInfo] = useState({
        loading: false,
        success: false,
        clientToken: null,
        error: "",
        instance: {},
    });

    useEffect(() => {
        getToken(userId, token);
    }, []);

    const userId = isAuthenticated && isAuthenticated().user.id;
    const token = isAuthenticated && isAuthenticated().token;

    const getToken = (userId, token) => {
        getmeToken(userId, token).then((info) => {
            if (info && info.error) {
                setInfo({ ...info, error: info.error });
                alert("Payment Unsuccessful! Please try again.")
            } else if (info && info.clientToken) {
                setInfo({ clientToken: info.clientToken });
            }
        });
    };

    const getAmount = () => {
        let amount = 0;
        products.forEach((product) => {
            amount += product.price * product.quantity;
        });
        return amount;
    };


    const onPurchase = () => {
        setInfo({ loading: true });
        let nonce;
        if (info.instance) {
            info.instance.requestPaymentMethod().then((data) => {
                nonce = data.nonce;
                const paymentData = {
                    PaymentMethodNonce: nonce,
                    amount: getAmount(),
                };
                processPayment(userId, token, paymentData).then((response) => {
                    if (response.error) {
                        console.log("Payment Failed");
                    } else {
                        setInfo({ ...info, success: true, loading: false });
                        console.log("Payment Success");
                        let product_names = "";
                        products.forEach(function (item) {
                            product_names += item.name + ", ";
                        });
                        const orderData = {
                            products: product_names,
                            transaction_id: response.transaction.id,
                            amount: response.transaction.amount,
                        };
                        createOrder(userId, token, orderData)
                            .then((response) => {
                                if (response.error) {
                                    console.log("Order Failed");
                                } else {
                                    if (response.success === true) {
                                        console.log("Order Placed");
                                        // Reload the page to reflect the changes in the cart
                                        setReload(!reload);
                                    }
                                }
                            })
                            .catch((error) => {
                                console.log("Order Failed");
                            });
                    }
                });
            });
        } else {
            console.error("Drop-in instance is not initialized");
        }
    };


    const handleOrderNavigation = () => {
        // Empty the cart
        cartEmpty(() => {
            console.log("Cart is emptied");
            // Navigate to the order page after emptying the cart
            navigate("/order");
        });
    };


    const showDropIn = () => {
        return (
            <div>
                {info.clientToken === null || products.length === 0 ? (
                    <h2 style={{ marginTop: "20px" }}>Please add any product.</h2>
                ) : (
                    <div>
                        <DropIn
                            options={{ authorization: info.clientToken }}
                            onInstance={(instance) => (info.instance = instance)}
                        />
                        <button onClick={onPurchase} className="btn btn-success">
                            Proceed
                        </button>
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="box row justify-content-between col-6 fw-bold">
            <h1>Your Order</h1>
            <hr style={{ height: "3px", width: 460, marginTop: "-20px" }} />
            <div
                className="d-flex justify-content-between"
                style={{ fontWeight: "bold", fontSize: "25px", marginTop: "-30px" }}
            >
                <div>
                    <label htmlFor="">Total Amount</label>
                </div>
                <div style={{ paddingRight: "20px" }}>
                    <label>{getAmount()} ₹</label>
                </div>
            </div>
            <div>{showDropIn()}</div>
            {info.success && (
                <p className="fs-5">
                    Payment Successful! Click the button below to view your order.
                    <button className="btn btn-primary" onClick={() => handleOrderNavigation()}>View Order</button>
                </p>
            )}
        </div>
    );
};

export default Payment;

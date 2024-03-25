import React, { useState, useEffect } from 'react';
import Base from "./Base";
import { loadCart, removeItemFromCart } from './helper/CartHelper';
import Payment from './PaymentB';
import { isAuthenticated } from '../auth/helper';

const Cart = () => {
  const [reload, setReload] = useState(false);
  const [products, setProducts] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0); // Initialize total amount

  useEffect(() => {
    const loadedProducts = loadCart().map(product => ({ ...product, quantity: 1 })); // Set default quantity to 1
    setProducts(loadedProducts);
  }, [reload]);

  useEffect(() => {
    // Calculate total amount when products change
    setTotalAmount(calculateTotalAmount());
  }, [products]);

  

  const handleQuantityChange = (product, newQuantity) => {
    if (newQuantity > 0) {
      const updatedProducts = products.map((p) => {
        if (p.id === product.id) {
          return { ...p, quantity: newQuantity };
        }
        return p;
      });
      setProducts(updatedProducts);
    }
  };

  const calculateTotalAmount = () => {
    return products.reduce((total, product) => {
      return total + product.price * product.quantity;
    }, 0);
  };

  const showRemoveFromCart = (product) => {
    return (
      isAuthenticated() && (
        <button
          onClick={() => {
            removeItemFromCart(product.id);
            setReload(!reload);
            console.log("Product removed from cart.");
          }}
          className='btn btn-block btn-outline-danger mt-2 mb-2'
          style={{ fontSize: "15px" }}
        >
          Remove from Cart
        </button>
      )
    );
  };

  return (
    <Base>
      <div className="container row mx-auto" style={{ paddingTop: "60px" }}>
        {products.length > 0 && (
          <div className="col-6 mx-auto mt-4">
            <div className="card p-4" style={{ backgroundColor: "rgba(255, 255, 255, 0.5)" }}>
              <div className="d-flex align-items-center mb-4">
                <div style={{ flex: "1" }}>
                  <h4 className="text-center">Image</h4>
                </div>
                <div style={{ flex: "1", marginLeft: "15px" }}>
                  <h4 className="text-center">Product</h4>
                </div>
                <div style={{ flex: "1" }}>
                  <h4 className="text-center">Price</h4>
                </div>
                <div style={{ flex: "1" }}>
                  <h4 className="text-center">Quantity</h4>
                </div>
                <div style={{ flex: "1" }}>
                  <h4 className="text-center">Total</h4>
                </div>
                <div style={{ flex: "1" }}>
                  <h4 className="text-center">Action</h4>
                </div>
              </div>
              {products.map((product, index) => (
                <div className="d-flex align-items-center mb-3 mt-2 fs-5" key={index}>
                  <div style={{ flex: "1", border: "2px solid white" }}>
                    <img src={product.image} alt="" className="img-fluid" />
                  </div>
                  <div style={{ flex: "1", marginLeft: "15px" }}>
                    <p className="text-center">{product.name}</p>
                  </div>
                  <div style={{ flex: "1" }}>
                    <p className="text-center">{product.price}₹</p>
                  </div>
                  <div style={{ flex: "1", position: "relative" }}>
                    <button
                      className="btn btn-sm btn-secondary"
                      style={{ position: "absolute", top: "50%", transform: "translateY(-50%)" }}
                      onClick={() => handleQuantityChange(product, product.quantity - 1)}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      name=""
                      value={product.quantity}
                      onChange={(e) => handleQuantityChange(product, parseInt(e.target.value))}
                      min={1}
                      className="form-control"
                      style={{
                        maxWidth: "82px",
                        marginLeft: "-1px",
                        backgroundColor: "#f8f9fa",
                        color: "#495057",
                        border: "1px solid #ced4da",
                        textAlign: "center",
                      }}
                    />
                    <button
                      className="btn btn-sm btn-secondary"
                      style={{ position: "absolute", right: 17, top: "50%", transform: "translateY(-50%)" }}
                      onClick={() => handleQuantityChange(product, product.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                  <div style={{ flex: "1" }}>
                    <p className="text-center">{product.price * product.quantity}₹</p>
                  </div>
                  <div style={{ flex: "1" }}>
                    {showRemoveFromCart(product)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="col-6 text-center" style={{ paddingLeft: "120px" }}>
          {isAuthenticated() ? (
            products.length > 0 ? (
              <Payment products={products} reload={reload} setReload={setReload} />
            ) : (
              <h2 style={{ marginTop: "20px" }}>Please add any product.</h2>
            )
          ) : (
            <h2 style={{ marginTop: "20px" }}>Please login to continue.</h2>
          )}
        </div>
      </div>
    </Base>
  );
};

export default Cart;

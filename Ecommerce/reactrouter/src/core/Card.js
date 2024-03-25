import { React, useState } from 'react';
import ImageHelper from './helper/ImageHelper';
import { Navigate } from 'react-router-dom';
import { addItemToCart, loadCart, removeItemFromCart } from './helper/CartHelper';
import { isAuthenticated } from '../auth/helper/index'

const Card = ({ 
    product,
    addtoCart = true,
    removeFromCart = false,
    reload = undefined,
    setReload = (f) => f,
}) => {

    const [redirect, setRedirect] = useState(false)

    const cartTitle = product ? product.name : "Product photo"; 
    const cartDescription = product ? product.description : "Product Description";
    const cartPrice = product ? product.price : "Price";  

    const addToCart = () => {
        if (isAuthenticated()) {
            addItemToCart(product, () => setRedirect(true) )
            console.log("Added to cart");
            return <Navigate to="/Cart" />;
        } else {
            alert("Please login to products to cart");
            console.log("Please Login");
        }
    }

    const getAredirect = (redirect) => {
        if (redirect){
            return <Navigate to="/cart" />
        }
    }

    const showAddToCart = addToCartProp => {
        return(
             addtoCart && (
             <button onClick={addToCart} className='btn btn-block btn-outline-success mt-2 mb-2' style={{fontSize:"14px"}}>Add to Cart</button>
             )
        )
    }
    
    const showRemoveFromCart = () => {
        return(
            isAuthenticated() && <button onClick={() => {
                removeItemFromCart(product.id)
                setReload(!reload)
                console.log("Product removed from cart.")
            }} className='btn btn-block btn-outline-danger mt-2 mb-2' style={{fontSize:"15px"}}>Remove from Cart</button>
        )
    }

    const truncateDescription = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + '...';
        } else {
            return text;
        }
    }

    return (
        <div className='card border' style={{ maxHeight:"480px"}}>
            <div className='card-body'>
                {getAredirect(redirect)}
                <ImageHelper product={product} />
                <div className='card-header text-dark bg-light'><h4>{truncateDescription(cartTitle, 16)}</h4></div>
                <p className='lead bg-secondary p-2' style={{fontFamily:"sans-serif", fontSize:"16px"}}>
                    {truncateDescription(cartDescription, 50)}
                </p>
                <p className='btn btn-success rounded'>{cartPrice}₹</p>
                <div className='row'>
                    <div className="col-5">
                        {showAddToCart(addtoCart)}
                    </div>
                    <div className='col-7'>
                        {showRemoveFromCart(removeFromCart)}
                    </div>
                </div>
            </div>
        </div>
    );
    
}

export default Card
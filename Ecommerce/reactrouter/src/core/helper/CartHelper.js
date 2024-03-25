export const addItemToCart = (item, next) => {
    let cart = []
    if (typeof window !== 'undefined') {
        if(localStorage.getItem("cart")) {
            cart = JSON.parse(localStorage.getItem("cart"))
        }

        // Check if the item already exists in the cart
        const existingItemIndex = cart.findIndex(cartItem => cartItem.id === item.id);

        if (existingItemIndex !== -1) {
            // If the item already exists, update its quantity
            cart[existingItemIndex].quantity += item.quantity;
        } else {
            // If the item doesn't exist, add it to the cart
            cart.push({ ...item });
        }
        
        localStorage.setItem("cart", JSON.stringify(cart));
        next();
        
    }
};


export const loadCart = () => {
    if (typeof  window !== "undefined") {
        if (localStorage.getItem("cart")){
            return JSON.parse(localStorage.getItem("cart"))
        }
    }
};

export const removeItemFromCart = productId => {
    let cart = []
    if (typeof  window !== "undefined") {
        if (localStorage.getItem("cart")){
            cart = JSON.parse(localStorage.getItem("cart"))
        }
        cart = cart.filter(product => product.id !== productId); // Using filter instead of map and splice
        localStorage.setItem("cart", JSON.stringify(cart));
    }
    return cart 
}

export const cartEmpty = (next) => {
    if (typeof  window !== "undefined") {
        localStorage.removeItem("cart")
        let cart = []
        localStorage.setItem("cart", JSON.stringify(cart))
        next();
    }
}

export const saveCartData = (cartData) => {
    localStorage.setItem('cart', JSON.stringify(cartData));
}

export const getCartData = () => {
    const cartData = localStorage.getItem('cart');
    return cartData ? JSON.parse(cartData) : [];
}

export const clearCartData = () => {
    localStorage.removeItem('cart');
}
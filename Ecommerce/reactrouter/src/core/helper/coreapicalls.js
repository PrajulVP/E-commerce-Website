export const getProducts = () => {
return fetch('http://localhost:8000/api/product/', { method: "GET" })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
    })
  .catch(error => {
    console.error('Error fetching products:', error);
    throw error;
  });
}

export const getProduct = (productId) => {
  return fetch(`http://localhost:8000/api/product/${productId}/`, { method: "GET" })
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.json();
      })
      .catch(error => {
          console.error('Error fetching product:', error);
          throw error;
      });
}

  
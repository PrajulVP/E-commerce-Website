import React, { useState, useEffect } from 'react';
import Base from '../core/Base';
import { isAuthenticated } from '../auth/helper';
import '../styles.css'

const ViewOrders = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');
  const userId = isAuthenticated() ? isAuthenticated().user.id : null; 

  useEffect(() => {
    if (userId) {
      const fetchOrders = async () => {
        try {
          const response = await fetch(`http://localhost:8000/api/order/?user_id=${userId}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });

          if (!response.ok) {
            throw new Error('Failed to fetch order details');
          }

          const orderData = await response.json();
          // Filter orders to include only those belonging to the current user
          const userOrders = orderData.filter(order => order.user.endsWith(`/${userId}/`));
          setOrders(userOrders);
        } catch (error) {
          console.error('Error fetching order data:', error);
          setError(error.message);
        }
      };

      fetchOrders();
    }
  }, [userId]);

  const formatDate = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);
    const date = dateTime.toLocaleDateString();
    const time = dateTime.toLocaleTimeString();
    return `${date} ${time}`;
  };

  const handlePrint = (order) => {
    const printContent = `
      <div class="card">
        <div class="card-body">
          <h5 class="card-text mb-4">Product: ${order.product_names}</h5>
          <p class="card-text">Total Products: ${order.total_products}</p>
          <p class="card-text">Amount: ${order.total_amount}</p>
          <p class="card-text">Transaction ID: ${order.transaction_id}</p>
          <p class="card-text">Ordered at: ${formatDate(order.created_at)}</p>
        </div>
      </div>
    `;
  
    // Create a new div to hold the print content
    const printDiv = document.createElement('div');
    printDiv.innerHTML = printContent;
  
    // Add print-only styles to the printDiv
    printDiv.classList.add('print-only');
  
    // Append the printDiv to the current document body
    document.body.appendChild(printDiv);
  
    // Trigger the print dialog
    window.print();
  
    // Remove the printDiv from the document body after printing
    document.body.removeChild(printDiv);
  };
  

  return (
    <Base>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="container p-4">
        <h1 className="mb-4">Your Orders</h1>
        {orders.length === 0 ? (
          <h3 className='mt-4'>You haven't ordered anything yet.</h3>
        ) : (
          <div className="row">
            {orders.map((order) => (
              <div key={order.id} className="col-4 -3 mb-4">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-text mb-4">Product: {order.product_names}</h5>
                    <p className="card-text">Total Products: {order.total_products}</p>
                    <p className="card-text">Amount: {order.total_amount}</p>
                    <p className="card-text">Transaction ID: {order.transaction_id}</p>
                    <p className="card-text">Ordered at: {formatDate(order.created_at)}</p>
                    <button className='btn btn-primary' onClick={() => handlePrint(order)}>Print Order</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Base>
  );
};

export default ViewOrders;

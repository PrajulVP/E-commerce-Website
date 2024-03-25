import React, { useState, useEffect } from 'react';
import Base from '../core/Base';
import { isAuthenticated } from '../auth/helper';
import { Link } from 'react-router-dom';
import OrderCard from './OrderCard';
import '../styles.css'

const Order = () => {

  const [order, setOrder] = useState(null);
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
          // Sort orders by date in descending order
          userOrders.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
          // Get the last order
          const lastOrder = userOrders[0];
          setOrder(lastOrder);
        } catch (error) {
          console.error('Error fetching order data:', error);
          setError(error.message);
        }
      };

      fetchOrders();
    }
  }, [userId]);

  return (
    <Base>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="card col-8 p-4" style={{ marginLeft: "100px" }}>
        {order ? (
          <div>
            <h1 className="mb-4 px-2 text-success">Order Placed Successfully!</h1>
            <div className="order-card">
              <OrderCard order={order} />
            </div>
            <div className=' d-flex justify-content-between px-2 mt-3'>
              <Link to='/cart'><button className='btn btn-primary'>Back</button></Link>
              <Link to='/vieworders'><button className='btn btn-primary'>View all Orders</button></Link>
              <button className='btn btn-primary' onClick={() => window.print()}>Print Bill</button>
            </div>
          </div>
        ) : (
          <h3 className='mt-4'>You haven't ordered anything yet.</h3>
        )}
      </div>
    </Base>
  );
};

export default Order;

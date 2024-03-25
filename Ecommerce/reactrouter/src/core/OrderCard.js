import React from 'react';

const OrderCard = ({ order }) => {
  const formatDate = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);
    const date = dateTime.toLocaleDateString();
    const time = dateTime.toLocaleTimeString();
    return `${date} ${time}`;
  };

  return (
    <div className="card">
      <div className="card-body">
        <h4 className="card-text mb-4">Product: {order.product_names}</h4>
        <h5 className="card-text mb-3">Total Products: {order.total_products}</h5>
        <p className="card-text">Amount: {order.total_amount}</p>
        <p className="card-text">Transaction ID: {order.transaction_id}</p>
        <p className="card-text">Ordered at: {formatDate(order.created_at)}</p>
      </div>
    </div>
  );
};

export default OrderCard;

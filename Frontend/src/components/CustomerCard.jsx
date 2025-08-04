// src/components/CustomerCard.jsx
import React from 'react';

const CustomerCard = ({ customer, orderCount }) => {
  return (
    <div className="border rounded-xl p-4 shadow-md bg-white">
      <h2 className="text-lg font-semibold">
        {customer.first_name} {customer.last_name}
      </h2>
      <p className="text-sm text-gray-600">{customer.email}</p>
      <p className="text-sm text-gray-500">Orders: {orderCount}</p>
      <p className="text-sm text-gray-500">
        {customer.city}, {customer.country}
      </p>
    </div>
  );
};

export default CustomerCard;

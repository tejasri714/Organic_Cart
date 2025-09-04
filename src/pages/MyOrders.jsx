import React, { useEffect, useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { dummyOrders } from '../assets/assets';

const MyOrders = () => {
  const [myOrders, setMyOrders] = useState([]);
  const { currency } = useAppContext();

  const fetchMyOrders = async () => {
    setMyOrders(dummyOrders); // Replace with API call when available
  };

  useEffect(() => {
    fetchMyOrders(); // Corrected
  }, []);

  return (
    <div className="mt-10 px-4 md:px-8">
      <div className="flex flex-col items-start mb-8">
        <p className="text-2xl font-semibold uppercase text-gray-700">My Orders</p>
        <div className="w-16 h-1 bg-primary rounded-full mt-2"></div>
      </div>

      {myOrders.map((order, index) => (
        <div
          key={index}
          className={`relative bg-white text-gray-700 ${
            order.items.length !== index + 1 ? 'border-b' : ''
          } border border-gray-200 shadow-sm rounded-xl mb-8 p-6 w-full max-w-4xl`}
        >
          {/* Order Info */}
          <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-sm md:text-base text-gray-500 font-medium">
            <span>🆔 Order ID: {order._id}</span>
            <span>💳 Payment: {order.paymentType}</span>
            <span>💰 Total: {currency} {order.amount}</span>
          </div>

          {/* Order Items */}
          <div className="space-y-6">
            {order.items.map((item, idx) => (
              <div key={idx} className="flex flex-col md:flex-row gap-6 bg-gray-50 p-4 rounded-lg shadow-sm">
                <div className="flex-shrink-0 bg-primary/10 p-3 rounded-lg flex items-center justify-center">
                  <img
                    src={item.product.image[0]}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                </div>

                <div className="flex flex-col justify-between flex-1">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800">{item.product.name}</h2>
                    <p className="text-gray-500 text-sm mt-1">Category: {item.product.category}</p>
                  </div>

                  <div className="flex flex-col justify-center md:mi-8 mb-4 md:mb-0">
                    <p>📦 Quantity: {item.quantity || "1"}</p>
                    <p>📅 Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                    <p>🚚 Status: {order.status}</p>
                    <p className="col-span-2 md:col-span-1 font-semibold text-gray-700">
                      💲 Amount: {currency}{item.product.offerPrice * item.quantity}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyOrders;

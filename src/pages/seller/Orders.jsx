import React, { useEffect, useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { assets, dummyOrders } from '../../assets/assets';

const Orders = () => {
  const { currency } = useAppContext();
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    setOrders(dummyOrders);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="no-scrollbar flex-1 h-[95vh] overflow-y-scroll flex flex-col">
      <div className="md:p-10 p-4 space-y-4">
        <h2 className="text-lg font-medium">Orders List</h2>

        {orders.map((order, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row gap-5 p-5 justify-between max-w-4xl rounded-md border border-gray-300 text-gray-800"
          >
            {/* Product info */}
            <div className="flex gap-5 w-80">
              <img
                className="w-12 h-12 object-cover"
                src={assets.box_icon}
                alt="box icon"
              />
              <div className="flex flex-col justify-center">
                {order.items.map((item, idx) => (
                  <p key={idx} className="font-medium">
                    {item.product.name}{" "}
                    <span className="text-primary"> × {item.quantity}</span>
                  </p>
                ))}
              </div>
            </div>

            {/* Address */}
            <div className="text-sm md:text-base text-black/60">
              <p className="text-black/80 font-medium">
                {order.address.firstName} {order.address.lastName}
              </p>
              <p>
                {order.address.street}, {order.address.city},{' '}
                {order.address.state}, {order.address.zipcode},{' '}
                {order.address.country}
              </p>
              <p>{order.address.phone}</p>
            </div>

            {/* Total amount */}
            <p className="font-medium text-lg my-auto">
              {currency} {order.amount}
            </p>

            {/* Payment info */}
            <div className="flex flex-col text-sm">
              <p>Method: {order.paymentType}</p>
              <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
              <p>
                Payment:{' '}
                <span className={order.isPaid ? 'text-green-600' : 'text-red-500'}>
                  {order.isPaid ? 'Paid' : 'Pending'}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;

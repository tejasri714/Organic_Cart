import React from 'react';
import ProductCard from './ProductCard';
import { useAppContext } from '../context/AppContext';

const BestSeller = () => {
  const { products } = useAppContext();

  console.log(products); // Debug here

  const bestSellers = (products || []).filter(product => product.inStock).slice(0, 5);

  return (
    <div className='mt-16'>
      <p className='text-2xl md:text-3xl font-medium'>Best Sellers</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-6">
        {bestSellers.length > 0 ? (
          bestSellers.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))
        ) : (
          <p className="text-gray-500 mt-4 col-span-full">No products available.</p>
        )}
      </div>
    </div>
  );
};

export default BestSeller;

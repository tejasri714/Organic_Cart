import React from 'react';
import { Link } from 'react-router-dom';
import { assets } from '../assets/assets';

const MainBanner = () => {
  return (
    <div className='relative'>
      {/* Desktop banner */}
      <img src={assets.main_banner_bg} alt="banner" className='w-full hidden md:block' />

      {/* Mobile banner */}
      <img src={assets.main_banner_bg_sm} alt="banner" className='w-full block md:hidden' />

      {/* Overlay content */}
      <div className='absolute inset-0 flex flex-col items-center justify-center text-center px-6'>
        <h1 className='text-black text-2xl md:text-4xl font-bold max-w-xl mb-4'>
          Freshness You Can Trust, Savings You Will Love!
        </h1>

        <div className='flex flex-col sm:flex-row gap-4'>
          {/* Shop Now Button */}
          <Link
            to="/products"
            className="flex items-center gap-2 px-6 md:px-9 py-3 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dull)] transition-colors rounded-lg text-white font-medium text-sm md:text-base"
          >
            Shop Now
            <img
              className='md:hidden transition-transform group-hover:translate-x-1'
              src={assets.white_arrow_icon}
              alt="arrow"
            />
          </Link>

          {/* Explore Deals Button */}
          <Link
            to="/products"
            className="flex items-center gap-2 px-6 md:px-9 py-3 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dull)] transition-colors rounded-lg text-white font-medium text-sm md:text-base"
          >
            Explore Deals
            <img
              className='md:hidden transition-transform group-hover:translate-x-1'
              src={assets.white_arrow_icon}
              alt="arrow"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MainBanner;
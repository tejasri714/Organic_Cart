import React from 'react';

const NewsLetter = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center px-4 py-12 bg-green-50 space-y-4">
      <h1 className="text-2xl md:text-4xl font-semibold text-green-800">
        Never Miss a Deal!
      </h1>

      <p className="text-green-700 text-sm md:text-lg max-w-xl">
        Subscribe to get the latest offers, new arrivals, and exclusive discounts.
      </p>

      <form className="flex w-full max-w-2xl h-12 md:h-13">
        <input
          type="email"
          placeholder="Enter your email address"
          required
          className="w-full h-full px-4 text-sm text-green-800 border border-green-300 rounded-l-md outline-none bg-white"
        />
        <button
          type="submit"
          className="px-6 md:px-10 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-r-md transition-all"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default NewsLetter;

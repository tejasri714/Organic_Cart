import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { useParams, Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import ProductCard from "../components/ProductCard";

const ProductDetails = () => {
  const { currency, addToCart, products } = useAppContext();
  const { id } = useParams();
  const navigate = useNavigate();

  const product = products.find((item) => item._id === id);

  const [thumbnail, setThumbnail] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    if (product) {
      setThumbnail(product.image[0]);
    }
  }, [product]);

  useEffect(() => {
    if (products.length > 0 && product) {
      const sameCategory = products
        .filter((item) => item.category === product.category && item._id !== id)
        .slice(0, 5);
      setRelatedProducts(sameCategory);
    }
  }, [products, product, id]);

  return product && (
    <div className="max-w-6xl w-full px-6 mx-auto mt-16">
      {/* Breadcrumbs */}
      <p className="text-sm text-gray-500 space-x-1">
        <Link to="/" className="hover:underline">Home</Link> /
        <Link to="/products" className="hover:underline"> Products</Link> /
        <Link to={`/products/${product.category.toLowerCase()}`} className="hover:underline"> {product.category}</Link> /
        <span className="text-primary font-medium"> {product.name}</span>
      </p>

      <div className="flex flex-col md:flex-row gap-10 mt-6">
        {/* Image Gallery */}
        <div className="flex gap-4">
          <div className="flex flex-col gap-3">
            {product.image.map((image, index) => (
              <div
                key={index}
                onClick={() => setThumbnail(image)}
                className="border max-w-24 border-gray-300 rounded cursor-pointer overflow-hidden"
              >
                <img src={image} alt={`Thumbnail ${index + 1}`} />
              </div>
            ))}
          </div>

          <div className="border border-gray-300 rounded overflow-hidden max-w-[400px] w-full">
            <img src={thumbnail} alt="Selected product" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Product Details */}
        <div className="text-sm w-full md:w-1/2">
          <h1 className="text-3xl font-semibold">{product.name}</h1>

          {/* Rating */}
          <div className="flex items-center gap-1 mt-2">
            {Array(5).fill('').map((_, i) => (
              <img
                key={i}
                src={i < 4 ? assets.star_icon : assets.star_dull_icon}
                alt=""
                className="w-4 h-4"
              />
            ))}
            <p className="text-base ml-2">(4)</p>
          </div>

          {/* Pricing */}
          <div className="mt-6">
            <p className="text-gray-500/70 line-through">
              MRP: {currency}₹{product.price}
            </p>
            <p className="text-2xl font-semibold text-primary">
              {currency}₹{product.offerPrice}
            </p>
            <span className="text-gray-500/70 text-sm">(inclusive of all taxes)</span>
          </div>

          {/* Description */}
          <p className="text-base font-medium mt-6">About Product</p>
          <ul className="list-disc ml-5 mt-1 text-gray-600 space-y-1">
            {product.description.map((desc, index) => (
              <li key={index}>{desc}</li>
            ))}
          </ul>

          {/* Buttons */}
          <div className="flex items-center mt-8 gap-4 text-base">
            <button
              className="w-full py-3.5 cursor-pointer font-medium btn-primary rounded"
              onClick={() => addToCart(product._id)}
            >
              Add to Cart
            </button>
            <button
              className="w-full py-3.5 cursor-pointer font-medium btn-primary rounded"
              onClick={() => {
                addToCart(product._id);
                navigate("/cart");
              }}
            >
              Buy now
            </button>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-20">
          <div className="flex flex-col items-center">
            <p className="text-xl font-semibold text-center">Related Products</p>
            <div className="w-20 h-0.5 bg-primary rounded-full mt-2 mb-6"></div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-10 gap-y-16">
            {relatedProducts
              .filter((product) => product.inStock)
              .map((product, index) => (
                <ProductCard key={index} product={product} />
              ))}
          </div>

          <button
            onClick={() => navigate('/products')}
            className="block mx-auto cursor-pointer px-12 my-16 py-2.5 border rounded text-primary hover:bg-primary/10 transition"
          >
            See more
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;

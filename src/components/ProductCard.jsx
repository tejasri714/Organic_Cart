import React from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";

const ProductCard = ({ product }) => {
    const { currency, addToCart, removeFromCart, cartItems, navigate } = useAppContext();

    if (!product) return null;

    return (
        <div
            onClick={() => {
                navigate(`/products/${product.category[0]?.toLowerCase()}/${product._id}`);
                window.scrollTo(0, 0);
            }}
            className="border border-gray-300 rounded-lg p-3 md:p-4 bg-white min-w-56 max-w-56 w-full hover:shadow-md transition cursor-pointer"
        >
            {/* Image */}
            <div className="flex items-center justify-center px-2 mb-3">
                <img
                    className="transition-transform duration-300 group-hover:scale-105 w-full max-h-36 object-contain"
                    src={product.image[0]}
                    alt={product.name}
                />
            </div>

            {/* Category */}
            <p className="text-gray-400 text-xs mb-1">{product.category[0]}</p>

            {/* Product Name */}
            <p className="text-gray-800 font-medium text-sm truncate w-full" title={product.name}>
                {product.name}
            </p>

            {/* Rating */}
            <div className="flex items-center gap-1 my-2">
                {Array(5)
                    .fill("")
                    .map((_, i) => (
                        <img
                            key={i}
                            src={i < 4 ? assets.star_icon : assets.star_dull_icon}
                            className="w-3 md:w-4"
                            alt="star"
                        />
                    ))}
                <p className="text-xs text-gray-400">(4)</p>
            </div>

            {/* Price + Cart */}
            <div className="flex items-end justify-between mt-3">
                {/* Price */}
                <p className="text-primary font-semibold text-sm md:text-base">
                    {currency}${product.offerPrice}{" "}
                    <span className="text-gray-400 line-through ml-1 text-xs md:text-sm">
                        {currency}{product.price}
                    </span>
                </p>

                {/* Cart Buttons */}
                <div
                    onClick={(e) => e.stopPropagation()}
                    className="text-primary"
                >
                    {!cartItems[product._id] ? (
                        <button
                            onClick={() => addToCart(product._id)}
                            className="flex items-center gap-1 bg-primary/10 border border-primary/30 md:w-[80px] w-[64px] h-[34px] rounded text-xs md:text-sm font-medium justify-center"
                        >
                            <img src={assets.cart_icon} alt="cart_icon" className="w-4 h-4" />
                            Add
                        </button>
                    ) : (
                        <div className="flex items-center gap-2 md:w-20 w-16 h-[34px] bg-primary/20 rounded select-none justify-center text-sm">
                            <button
                                onClick={() => removeFromCart(product._id)}
                                className="px-2"
                            >
                                -
                            </button>
                            <span className="w-5 text-center">
                                {cartItems[product._id]}
                            </span>
                            <button
                                onClick={() => addToCart(product._id)}
                                className="px-2"
                            >
                                +
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;

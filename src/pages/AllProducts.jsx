import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import ProductCard from "../components/ProductCard";

const AllProducts = () => {
    const { products, searchQuery } = useAppContext();
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        if (searchQuery.length > 0) {
            setFilteredProducts(
                products.filter((product) =>
                    product.name.toLowerCase().includes(searchQuery.toLowerCase())
                )
            );
        } else {
            setFilteredProducts(products);
        }
    }, [products, searchQuery]);

    console.log("🔥 Products in Context:", products);
    console.log("🔥 Filtered Products:", filteredProducts);

    return (
        <div className="p-10">
            <h1 className="text-xl font-bold">All Products Page</h1>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-4">
                {filteredProducts.length === 0 && <p>No products found.</p>}
                {filteredProducts.map((product) => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default AllProducts;

import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";

// ✅ Axios Setup
axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
    const currency = import.meta.env.VITE_CURRENCY || "₹";

    const [user, setUser] = useState(null);
    const [isSeller, setIsSeller] = useState(false);
    const [showUserLogin, setShowUserLogin] = useState(false);
    const [products, setProducts] = useState([]);
    const [cartItems, setCartItems] = useState({});
    const [searchQuery, setSearchQuery] = useState("");

    // ✅ Seller Auth Status
    const fetchSeller = async () => {
        try {
            const { data } = await axios.get("/api/seller/is-auth");
            setIsSeller(data.success);
        } catch {
            setIsSeller(false);
        }
    };

    // ✅ Fetch Products from Backend
    const fetchProducts = async () => {
        try {
            const { data } = await axios.get("/api/product/list");
            if (data.success) {
                setProducts(data.products);
                console.log("✅ Products Set to State:", data.products);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error("❌ Fetch products failed:", error);
            toast.error(error.message);
        }
    };

    // ✅ Cart Operations
    const addToCart = (itemId) => {
        const cartData = structuredClone(cartItems);
        itemId = itemId.toString();
        cartData[itemId] = (cartData[itemId] || 0) + 1;
        setCartItems(cartData);
        toast.success("Added to Cart");
    };

    const updateCartItem = (itemId, quantity) => {
        const cartData = structuredClone(cartItems);
        cartData[itemId.toString()] = quantity;
        setCartItems(cartData);
        toast.success("Cart Updated");
    };

    const removeFromCart = (itemId) => {
        const cartData = structuredClone(cartItems);
        itemId = itemId.toString();
        if (cartData[itemId]) cartData[itemId] -= 1;
        if (cartData[itemId] === 0) delete cartData[itemId];
        setCartItems(cartData);
        toast.success("Removed from Cart");
    };

    const getCartCount = () =>
        Object.values(cartItems).reduce((acc, curr) => acc + curr, 0);

    const getCartAmount = () =>
        Object.entries(cartItems).reduce((total, [itemId, qty]) => {
            const item = products.find((p) => p._id === itemId);
            return item ? total + item.offerPrice * qty : total;
        }, 0);

    useEffect(() => {
        fetchSeller();
        fetchProducts();
    }, []);

    const value = {
        user,
        setUser,
        isSeller,
        setIsSeller,
        showUserLogin,
        setShowUserLogin,
        products,
        currency,
        cartItems,
        addToCart,
        updateCartItem,
        removeFromCart,
        searchQuery,
        setSearchQuery,
        getCartAmount,
        getCartCount,
        axios,
        fetchProducts,
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);

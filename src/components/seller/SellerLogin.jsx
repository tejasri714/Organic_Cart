import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import { toast } from "react-hot-toast";

const SellerLogin = () => {
  const { isSeller, setIsSeller, axios } = useAppContext();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post("/api/seller/login", { email, password });
      if (data.success) {
        setIsSeller(true);
        navigate("/seller");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  useEffect(() => {
    if (isSeller) {
      navigate("/seller");
    }
  }, [isSeller, navigate]);

  return (
    !isSeller && (
      <form
        onSubmit={onSubmitHandler}
        className="min-h-screen flex items-center justify-center text-gray-600 px-4"
      >
        <div className="flex flex-col gap-5 w-full max-w-md px-8 py-12 rounded-lg shadow-xl border border-gray-200 bg-white">
          <p className="text-2xl font-semibold text-center w-full">
            <span className="text-primary">Seller</span> Login
          </p>

          <div className="w-full">
            <label className="block text-sm mb-1" htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary"
            />
          </div>

          <div className="w-full">
            <label className="block text-sm mb-1" htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded btn-primary"
          >
            Login
          </button>

          <p className="text-center text-sm text-gray-500 mt-2">
            Not a seller? <span className="text-primary underline cursor-pointer">Go back to user login</span>
          </p>
        </div>
      </form>
    )
  );
};

export default SellerLogin;

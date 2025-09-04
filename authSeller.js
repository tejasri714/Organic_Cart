import jwt from 'jsonwebtoken';

const authSeller = async (req, res, next) => {
  const { sellerToken } = req.cookies;

  if (!sellerToken) {
    return res.status(401).json({ success: false, message: "Not authorized" });
  }

  try {
    const tokenDecode = jwt.verify(sellerToken, process.env.JWT_SECRET);

    if (tokenDecode.email === process.env.SELLER_EMAIL) {
      next(); // ✅ Seller is authenticated
    } else {
      return res.status(401).json({ success: false, message: "Not authorized" });
    }
  } catch (error) {
    res.status(401).json({ success: false, message: error.message });
  }
};

export default authSeller;

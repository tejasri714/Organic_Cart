import jwt from 'jsonwebtoken';

// ✅ Middleware to verify user authentication
const authUser = async (req, res, next) => {
  // Extract token from cookies
  const { token } = req.cookies;

  // If no token found, block the request
  if (!token) {
    return res.status(401).json({ success: false, message: 'Not Authorized' });
  }

  try {
    // Verify token using JWT_SECRET
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

    // If token contains user ID, store it on req.userId
    if (tokenDecode.id) {
      req.userId = tokenDecode.id; // ✅ Store safely on req.userId (not body)
    } else {
      return res.status(401).json({ success: false, message: 'Not Authorized' });
    }

    // Move to next middleware or controller
    next();
  } catch (error) {
    // If token is invalid or expired
    return res.status(401).json({ success: false, message: error.message });
  }
};

export default authUser;

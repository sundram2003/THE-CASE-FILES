import jwt from 'jsonwebtoken';

export const auth = async (req, res, next) => {
  try {
    // console.log("printing req.body", req.body)
    // console.log("printing req: ", req);
    // console.log("Printing req.headers: ", req.headers);
    //extract token
    // console.log("printing req.cookie: ", req.cookies);
    const token =
      req.cookies.token ||
      req.body.token ||
      req.header("Authorization").replace("Bearer ", "");
    // console.log("Printing token: ", token);
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token is Missing",
      });
    }
    //verify token
    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decode;
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "token is invalid",
      });
    }
    next();
  } catch (error) {
    console.log('error: ', error);
    return res.status(401).json({
      success: false,
      message: "Unauthorized"
    });
  }
}
export const isAdmin = async (req, res, next) => {
  try {

    if (req.user.role !== "admin") {
      return res.status(401).json({
        success: false,
        message: "This is a protected route for admins only",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User cannot be verified. Please try again",
    });
  }
};
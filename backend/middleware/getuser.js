// var jwt = require('jsonwebtoken');
// const jwt_secret="prajwalisgoodb@y";

// const getuser =(req,res,next)=>{
//     const token=req.header('auth-token')
//     if(!token)
//     {
//         return res.status(400).send("use correct token");
//     }
//     try {
//         const data=jwt.verify(token,jwt_secret);
//         req.user=data.user;

//         next()
//     } 
//     catch (error) 
//     {
//         console.error(error.message);
//         return res.status(500).send("internal server error occure");
//     }
// }

// module.exports=getuser;


const jwt = require('jsonwebtoken');
const jwt_secret = "prajwalisgoodb@y";

const getuser = (req, res, next) => {
  console.log("Cookies in getuser:", req.cookies);
  const token = req.cookies.authtoken;
  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  try {
    const data = jwt.verify(token, jwt_secret);
    req.user = data;
    next();
  }
  catch (error) 
  {
    console.error("JWT verification error:", error.message);
    return res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = getuser;

import jwt from 'jsonwebtoken';

export const authenticate = async(req,res,next)=>{
    const token = req.headers.authorization?.split(' ')[1];

    if(!token){
        return res.status(401).json({message:'authentication required'});
    }

    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        console.log("token",decoded);
        req.user = decoded;
        next();
    } catch (error) {
        
  console.error("❌ JWT Error:", error.message);
        res.status(401).json({message:'invalid token'});
    }

};

export const authorize = (...roles)=>{
    return (req,res,next)=>{
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Unauthorized' });
          }
          next();
    };
};
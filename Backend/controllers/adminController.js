import User from "./../models/User.js";
import Order from "./../models/OrderSchema.js";

export const approveBusiness = async(req, res)=>{
    try {
        const {userId} = req.params;
        const user = await User.findById(userId);
        console.log("user",user);
        if(!user || user.role !== "business"){
            return res.status(404).json({
                message: "user not found or not a business",
            });
        }
        user.businessDetails.verified = true;
        await user.save();
        res.status(200).json({
            success: true,
            message: "Business approved successfully",
            user,
        });

    } catch (error) {
        res.status(500).json({
            message: "failed to approve business",
            error: error.message,
        });
        
    }
}



export const getPlatformStats = async(req, res)=>{
    try {
        const [totalUsers, totalOrders, pendingBusinesses] = await Promise.all([
            User.countDocuments({}),
            Order.countDocuments({}),
            User.countDocuments({role: "business", "businessDetails.verified":false}),
        ]);
        res.status(200).json({
            success: true,
            message: "Platform stats fetched successfully",
            totalUsers,
            totalOrders,
            pendingBusinesses ,
        });
    } catch (error) {
        res.status(500).json({
            message: "failed to get platform stats",
            error: error.message,
        });
        
    }
}
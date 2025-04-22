import Order from "./../models/OrderSchema.js";
import Food from "./../models/FoodSchema.js";

export const CreateOrder = async (req, res) => {
  try {
    const { foodId, paymentMethod, pickupType } = req.body;
    const food = await Food.findById(foodId);

    if (!food || food.status !== "available") {
      return res.status(404).json({
        message: "food is not available",
      });
    }

    const order = new Order({
        userId: req.user.id,
        foodId,
        paymentMethod,
        pickupType,

    });

    food.status = 'reserve';
    await Promise.all([order.save(), food.save()]);
    res.status(201).json({
      success: true,
      message: "Order created successfully",
      order,
    });

  } catch (error) {
    res.status(500).json({
      message: "failed to create order",
      error: error.message,
    });
  }
};



export const getOrderHistory = async (req, res) => {
    try {
        const order = await Order.find({userId: req.user.id})
        .populate("foodId","title description");
        res.status(200).json({
            success: true,
            message: "Order history fetched successfully",
            order,
        });
    } catch (error) {
        res.status(500).json({
            message: "failed to get order history",
            error: error.message,
        });
        
    }
}

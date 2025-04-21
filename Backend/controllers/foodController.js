import Food from "./../models/FoodSchema.js";

export const CreateFoodListing = async (req, res) => {
  try {
    const food = new Food({
      ...req.body,
      businessId: req.user.id,
    });

    await food.save();
    res.status(201).json({
      success: true,
      message: "Food listing created successfully",
      food,
    });
  } catch (error) {
    res.status(500).json({
      message: "failed to create food listing",
      error: error.message,
    });
  }
};

export const getNearbyFood = async (req, res) => {
    try {
      const { lat, lng, radius = 5000 } = req.query;
  
      const latNum = parseFloat(lat);
      const lngNum = parseFloat(lng);
  
      if (isNaN(latNum) || isNaN(lngNum)) {
        return res.status(400).json({ message: "Latitude and Longitude must be valid numbers." });
      }
  
      const food = await Food.find({
        status: "available",
        expireTime: { $gt: new Date() },
        location: {
          $near: {
            $geometry: { type: "Point", coordinates: [lngNum, latNum] },
            $maxDistance: radius,
          },
        },
      }).populate("businessId", "name email location phone businessDetails");
  
      res.status(200).json({
        success: true,
        food,
      });
    } catch (error) {
      res.status(500).json({
        message: "failed to get food listings",
        error: error.message,
      });
    }
  };
  

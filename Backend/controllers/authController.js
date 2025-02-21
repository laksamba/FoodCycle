import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User";

export const register = async (req, res) => {
  try {
    const { name, email, password, role, location, phone } = req.body;

    const exitingUser = await User.findOne({ email });
    if (exitingUser) {
      return res.status(400).json({ message: "User Already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role,
      location,
      phone,
    });

    await user.save();
    // token generation
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    res.status(201).json({ token, user: { id: user._id, role: user.role } });
  } catch (error) {
    res.status(500).json({message:'registration failed', error: error.message})
  };
};



// Login logic 

export const login = async(req,res)=>{
    try {
        const { email, password} = req.body;
        const user = await User.findOne({email});

        if(!user || !(await bcrypt.compare(password,user.password))){
            res.status(401).json({message:'invalid credentials'});
        }

        const token = jwt.sign(
            {id:user._id, role: user.role},
            process.env.JWT_SECRET,
            {expiresIn:'1d'},
        );
        res.json({ token, user: { id: user._id, role: user.role } });

    } catch (error) {
        res.status(500).json({ message: 'Login failed', error: error.message });
    }


}

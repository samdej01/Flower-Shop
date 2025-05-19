const bcrypt = require('bcrypt');
const User = require('../model/User.model');

const userRegistration = async (req, res) => {
    const { firstName, lastName, email, phone, password } = req.body;

    console.log(`First Name: ${firstName}, Last Name: ${lastName}, Email: ${email}, Phone: ${phone}, Password: ${password}`);

    console.log("Incoming registration request:", { firstName, lastName, email, phone });

    try {
        // Basic field validation
        if ([firstName, lastName, email, phone, password].some(field => !field?.trim())) {
            console.log("Missing fields");
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            console.log("Invalid email format");
            return res.status(400).json({
                success: false,
                message: "Invalid email format"
            });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log("User already exists");
            return res.status(409).json({
                success: false,
                message: "User already exists with the same email"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("Password hashed successfully");

        // Create the user
        const user = await User.create({
            firstName,
            lastName,
            email,
            phone,
            password: hashedPassword,
        });
        console.log("User created:", user);

        return res.status(201).json({
            success: true,
            message: "User created successfully",
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phone: user.phone
            }
        });
    } catch (error) {
        console.error("Error during registration:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

module.exports = userRegistration;

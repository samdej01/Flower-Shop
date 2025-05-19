const User = require('../model/User.model');
const bcrypt = require('bcrypt');

const userLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            console.log("Email and password are required");
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }

        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            console.log("User not found");
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            console.log("Invalid password");
            return res.status(401).json({
                success: false,
                message: "Invalid password"
            });
        }

        // Generate access token
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();
        user.refreshToken = refreshToken;
        await user.save();

        // Set the access and refresh tokens in cookies
        res.cookie('accessToken', accessToken, { maxAge: 86400000, httpOnly: true });
        res.cookie('refreshToken', refreshToken, { maxAge: 86400000, httpOnly: true });

        return res.status(200).json({
            success: true,
            message: "Login successful",
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phone: user.phone,
                accessToken,
                refreshToken
            }
        });
    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

module.exports = userLogin;

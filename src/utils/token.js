import jwt from "jsonwebtoken";

export const createToken = (user) => {
    const payload = {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
    };
    const options = {
        expiresIn: "1h",
    };
    return jwt.sign(payload, process.env.JWT_SECRET, options);
};

export const verifyToken = (token) => {
    const options = {
        maxAge: "1h",
    };
    return jwt.verify(token, process.env.JWT_SECRET, options);
};
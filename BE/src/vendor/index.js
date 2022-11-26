import jwt from "jsonwebtoken";

export function jwtGenerator(userData) {
    return jwt.sign(
        {
            name: userData.name,
            gender: userData.gender,
            phone: userData.phone,
            isAdmin: userData.isAdmin,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "15d",
        }
    );
}

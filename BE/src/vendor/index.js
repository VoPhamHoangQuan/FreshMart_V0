import jwt from "jsonwebtoken";

export function jwtGenerator(userData) {
    return jwt.sign(
        {
            id: userData._id,
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

export function isAuth(req, res, next) {
    const authentication = req.headers.authorization;
    if (authentication) {
        const token = authentication.slice(7, authentication.length);

        jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
            if (err) {
                res.status(401).send({ error: "Invalid Token" });
            } else {
                req.userInfo = decode;
                next();
            }
        });
    } else {
        res.status(401).send({ error: "no token" });
    }
}

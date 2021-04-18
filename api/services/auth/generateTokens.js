const jwt = require("jsonwebtoken");
const moment = require("moment");

function generateTokens(user) {
    const accessTokenExpires = moment().add(1, "hours");
    const accessToken = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
        expiresIn: "1h",
        audience: process.env.HOST,});

    const refreshTokenExpires = moment().add(24, "hours");
    const refreshToken = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
        expiresIn: "24h",
        audience: process.env.HOST,});

    return {
        access: {
            token: accessToken,
            expires: accessTokenExpires.toDate(),
        },
        refresh: {
            token: refreshToken,
            expires: refreshTokenExpires.toDate(),
        },
    };
}

module.exports = {
    generateTokens,
};

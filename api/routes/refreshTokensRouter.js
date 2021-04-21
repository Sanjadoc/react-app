"use strict";
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { generateTokens } = require("../services/auth/generateTokens");

router.post("/", async (req, res) => {
    try {
        const { refreshToken } = req.body;

        const payload = jwt.verify(refreshToken, process.env.JWT_SECRET);
        const getUserDataPayload = await User.findById(payload.id);

        const { id } = getUserDataPayload;

        const tokens = await generateTokens(getUserDataPayload);
        await User.updateRefreshToken(id, tokens.refresh.token);
        
        const userInfo = await User.getUserData(tokens.refresh.token);

        res.send({ userInfo, tokens });
        
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;

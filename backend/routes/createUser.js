const expres = require('express');
const router = expres.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtSecret = "thingsgoboomby9amwhatsgoboomwillblowyourmind";

router.post('/createUser', [
    body('email').isEmail(),
    body('name').isLength({ min: 5 }),
    body('password', 'Length must be greate than 5').isLength({ min: 5 })], async (req, res) => {
        const salt = await bcrypt.genSalt(10);
        const securePassword = await bcrypt.hash(req.body.password, salt);
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            await User.create({
                name: req.body.name,
                password: securePassword,
                email: req.body.email,
                location: req.body.location
            });
            res.status(201).json({ success: true, message: "Created successfully" });
        } catch (error) {
            console.log("Here is the error", error);
        }
    })

//login
router.post('/loginUser', [
    body('email').isEmail(),
    body('password', 'Length must be greate than 5').isLength({ min: 5 })], async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        let email = req.body.email;
        try {
            let user = await User.findOne({ email });
            if (!user) {
                res.status(400).json({ errors: "Invalid Email" });
            }
            const comparePassword = await bcrypt.compare(req.body.password, user.password);
            if (!comparePassword) {
                res.status(400).json({ errors: "Invalid Password" });
            }
            const data = {
                user: {
                    id: user.id
                }
            }
            const authToken = jwt.sign(data, jwtSecret);
            return res.status(200).json({ success: true, token: authToken })
        } catch (error) {
            console.log("Here is the error", error);
        }
    });
module.exports = router;
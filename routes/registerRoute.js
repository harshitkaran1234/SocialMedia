const express = require('express');
const User = require('../schemas/user');
const router = express.Router();

async function checkUserExists(email, username) {
    const [userWithEmail, userWithUsername] = await Promise.all([
        User.findOne({ email }),
        User.findOne({ username })
    ]);

    if (userWithEmail || userWithUsername) return true;
    return false;
}

router.post("/", async (req, res, next) => {
    const userDetails = req.body;
    console.log(userDetails);
    try {
        const isValid = Object.values(userDetails).every(val => typeof val !== 'undefined' && val !== '');
        if(!isValid) console.log('please input valid data');
        if(userDetails.password !== userDetails.confirmPassword) { console.log('password and confirm password does not match') };
        const userExists = await checkUserExists(userDetails.email, userDetails.password);
        if(userExists) throw new Error('user already exists');
        const newUser = new User(userDetails);
        await newUser.save();
        res.status(200).render('home', { title: 'this is title', message: 'This is message'});
    } catch(err) {
        console.log(`error in registering user${err}`);
    }
})

router.get("/", (req, res, next) => {
    res.status(200).render("register");
})

module.exports = router;
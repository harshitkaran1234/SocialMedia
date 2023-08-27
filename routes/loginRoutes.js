const bcrypt = require('bcrypt');
const express = require('express');

const User = require('../schemas/user');
const router = express.Router();

async function comparePasswords(inputPassword, hashedPassword) {
    try {
      const match = await bcrypt.compare(inputPassword, hashedPassword);
      return match;
    } catch (error) {
      throw error;
    }
  }

async function validateUser(loginDetails) {
    const { username, password } = loginDetails;
    try {
        const user = await User.findOne({ username });
        if(!user) {
            console.log('invalid username');
            return false;
        }
        const passwordMatched = await comparePasswords(password, user.password);
        if(passwordMatched) return true;
        return false;
    } catch(err) {
        console.log('Error in finding user');
        return false;
    }
}

router.post('/', async (req, res) =>{
    const loginDetails = req.body;
    try {
        const isUserValid = await validateUser(loginDetails);
        if(!isUserValid) {
            console.log('invalid login details');
            return;
        }
        res.status(200).render('home', { title: 'this is title', message: 'This is message'});
    } catch(err) {
        console.log(`Error in logging in ${err}`);
    }
})

router.get('/', (req, res, next) => {
    res.status(200).render('login');
})

module.exports = router;
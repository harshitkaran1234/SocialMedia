const express = require('express');
const app = express();
const path = require('path');
const { checkLogin } = require('./middleware');
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://harsheet2020:NarutoLuffy@cluster0.kh572kx.mongodb.net/?retryWrites=true&w=majority')
.then(() => {
    console.log('database connection successful');
})
.catch((err) => {
    console.log(`database connection error ${err}`);
})

app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));


const loginRoute = require('./routes/loginRoutes');
const registerRoute = require('./routes/registerRoute');

app.use("/login", loginRoute);
app.use("/register", registerRoute);

app.get('/', checkLogin, (req, res) => {
    res.render('home', { title: 'this is title', message: 'This is message'})
})

app.listen(3000, ()=> console.log('server running on port 3000'));
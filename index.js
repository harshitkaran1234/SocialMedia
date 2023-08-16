const express = require('express');
const app = express();
app.set('view engine', 'pug')

app.get('/', (req, res) => {
    res.render('home', { title: 'this is title', message: 'This is message'})
})

app.listen(3000, ()=> console.log('server running on port 3000'));
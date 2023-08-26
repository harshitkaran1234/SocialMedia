const mongoose = require('mongoose');

class Database {
    constructor(){
        this.connect();
    }

    connect() {
        mongoose.connect('mongodb+srv://harsheet2020:NarutoLuffy@cluster0.kh572kx.mongodb.net/?retryWrites=true&w=majority')
        .then(() => {
            console.log('database connection successful');
        })
        .catch((err) => {
            console.log(`database connection error ${err}`);
        })
    }
}

module.exports = new Database();
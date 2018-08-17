require('dotenv').config({ path: './variables.env' });
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
let isConnected;

module.exports = connectToDatabase = () => {
    if (isConnected) {
        console.log('=> using existing database connection');
        return Promise.resolve();
    }

    console.log('=> using new database connection');
    // Using local db
    return mongoose.connect(process.env.LocalDB)
    // Using cloud db
    // return mongoose.connect(process.env.DB, {
    //   auth: {
    //     user: 'seogenie_dbo',
    //     password: '4Y!j46JW5nxce'
    //   }
    // })
        .then(db => { 
            isConnected = db.connections[0].readyState;
        });
};
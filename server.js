const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const colors = require('colors');


// ---------------------------------------------------------------- mongoose returns a promise that is why we need to use .then() 
mongoose.connect(process.env.DATABASE_LOCAL)
    .then(() => {
        console.log('Database connection established!!!');
        // console.log(mongoose);

    })

    
const app = require('./app')
const port = process.env.PORT || 8080;


app.listen(port, () => {
    console.log(``);
    console.log(`Server running on port ${port}`.yellow.bold);
});

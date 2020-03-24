require('dotenv').config();

const PORT = 8080;

const express = require("express"); //express library
const mongoose = require("mongoose"); //mongoose library for mongodb models

const user = require('./routes/user.route')
const image = require ('./routes/image.route')

const app = express();
const db = mongoose.connection;


mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser  : true, useUnifiedTopology: true });
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Database connection successful...'));

app.use(express.json()); //to use json format on the requests

//routes
app.use('/user',user)
app.use('/image',image)
//

app.listen(PORT, () => {
 console.log(`Server is listening on port: ${PORT}`);
});
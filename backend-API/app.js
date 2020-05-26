const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const db = require("./config/database");

db.authenticate()
    .then(() => { console.log("Database connected") })
    .catch(err => { console.log(err) })


//express app
const app = express();

//body parser
app.use(bodyParser.urlencoded({ extended: false }));

//routes
app.use("/admin", require('./routes/admin'));
app.use("/user", require('./routes/user'));
app.use("/public", express.static(path.join(__dirname, "public")));

//port
app.listen(5000, () => {
    console.log("listening to port 5000");
})
require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();
const { DBURL } = process.env;

mongoose.connect(DBURL,
{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("Mongoose Connect");
})
.catch(() => {
    console.error("Mongoose Connect Error");
});

const PORT = process.env.PORT || 8080;

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.use(require("./routes"));

app.listen(PORT, () => {
    console.log("SERVER LISTEN");
});
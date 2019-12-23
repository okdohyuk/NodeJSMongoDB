require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();
const { DBURL } = process.env;

const http = require("http").Server(app);
const io = require("socket.io")(http);

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

let userCount = 0;
io.on("connection", (socket) => {
    console.log("connect", socket.id);
    userCount += 1;
    io.to(socket.id).emit("setname", "user"+userCount);

    socket.on("send", (name, text) => {
        io.emit("recv", name + ": " + text);
    });
});

http.listen(PORT, () => {
    console.log("SERVER LISTEN");
});
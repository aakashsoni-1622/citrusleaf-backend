var express = require('express');
var cors = require("cors");
var app = express();

app.use(function (req, res, next) {					//allow cross origin requests
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS, DELETE, GET");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(
    cors({
        origin: "*",
        methods: "GET,POST,DELETE,OPTIONS",
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
module.exports = app;

"use strict";
exports.__esModule = true;
var express = require("express");
var http_1 = require("http");
var socket_io_1 = require("socket.io");
var app = express();
app.use(express.static("dist"));
app.get("/", function (req, res) {
    res.sendFile("index.html");
});
var httpServer = (0, http_1.createServer)(app);
var io = new socket_io_1.Server(httpServer, {});
io.on("connection", function (socket) { });
httpServer.listen(3000);

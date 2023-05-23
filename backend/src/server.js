"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var http_1 = require("http");
var socket_io_1 = require("socket.io");
var cors_1 = require("cors");
var app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: "*", methods: ["POST", "GET"] }));
var socketCorsSetting = {
    origin: ['*']
};
var server = http_1.default.createServer(app);
var webSocket = new socket_io_1.Server(server, { cors: socketCorsSetting, path: '/room' }); // adding middle ware and custome options
app.get("/", function (req, res) {
    res.status(200).json({ "success": " Hi bitch you are lodu" });
});
webSocket.on("connection", function (socket) {
    socket.on("message", function (msg) {
        webSocket.emit("panda", msg); // sends message to everyone 
    });
});
server.listen(3000, function () {
    console.log("Listening on port 3000, bitch !");
});

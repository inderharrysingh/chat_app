"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: "*", methods: ["POST", "GET"] }));
const socketCorsSetting = {
    origin: "*"
};
const httpServer = http_1.default.createServer(app);
const io = new socket_io_1.Server(httpServer, { cors: socketCorsSetting }); // adding middle ware and custome options
app.get("/", (req, res) => {
    res.status(200).json({ "success": " Hi bitch you are lodu" });
});
io.on("connection", (socket) => {
    console.log('someone connected !');
    io.emit("message", "What's your name bitch ");
    socket.on("message", (msg) => {
        console.log(msg);
        io.emit("message", "got it bro");
    });
    socket.on('disconnect', function () {
        console.log('Client disconnected.');
    });
});
httpServer.listen(3000, () => {
    console.log("Listening on port 3000, bitch !");
});
//# sourceMappingURL=server.js.map
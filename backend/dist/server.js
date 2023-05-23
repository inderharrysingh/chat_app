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
    origin: ['*']
};
const server = http_1.default.createServer(app);
const webSocket = new socket_io_1.Server(server, { cors: socketCorsSetting, path: '/room' }); // adding middle ware and custome options
app.get("/", (req, res) => {
    res.status(200).json({ "success": " Hi bitch you are lodu" });
});
webSocket.on("connection", (socket) => {
    socket.on("message", (msg) => {
        webSocket.emit("panda", msg); // sends message to everyone 
    });
});
server.listen(3000, () => {
    console.log("Listening on port 3000, bitch !");
});
//# sourceMappingURL=server.js.map
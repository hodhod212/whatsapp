"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const cors_1 = __importDefault(require("cors"));
const room_1 = require("./room");
const dotenv = require("dotenv");
dotenv.config();
const app = (0, express_1.default)();
app.use(cors_1.default);
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
  cors: { origin: "*", methods: ["get", "post"] },
});
io.on("connection", (socket) => {
  console.log("User is connected");
  (0, room_1.roomHandler)(socket);
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});
const port = process.env.PORT || 8080;
server.listen(port, () => {
  console.log(`Listening to port server on ${port}`);
});

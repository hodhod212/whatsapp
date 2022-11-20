"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roomHandler = void 0;
const uuid_1 = require("uuid");
const rooms = {};
const roomHandler = (socket) => {
    const createRoom = () => {
        const roomId = (0, uuid_1.v4)();
        rooms[roomId] = [];
        socket.emit("room-created", { roomId });
        console.log("User created the room");
    };
    const joinRoom = ({ roomId, peerId }) => {
        if (rooms[roomId]) {
            console.log("User joined the room", roomId, peerId);
            rooms[roomId].push(peerId);
            socket.join(roomId);
            socket.to(roomId).emit("user-joined", { peerId });
            socket.emit("get-users", {
                roomId,
                participants: rooms[roomId],
            });
        }
        socket.on("disconnect", () => {
            console.log("User left the room", peerId);
            leaveRoom({ peerId, roomId });
        });
    };
    const leaveRoom = ({ roomId, peerId }) => {
        rooms[roomId] = rooms[roomId].filter((id) => id !== peerId);
        socket.to(roomId).emit("user-disconnected", peerId);
    };
    const startSharing = ({ peerId, roomId }) => {
        socket.to(roomId).emit("user-started-sharing", peerId);
    };
    const stopSharing = (roomId) => {
        socket.to(roomId).emit("user-stoped-sharing");
    };
    socket.on("create-room", createRoom);
    socket.on("join-room", joinRoom);
    socket.on("start-sharing", startSharing);
    socket.on("stop-sharing", stopSharing);
};
exports.roomHandler = roomHandler;

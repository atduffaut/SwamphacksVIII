import * as express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import {
  createGame,
  createRocks,
  generatePlayer,
  PlayerStates,
  randomMapX,
  randomMapY,
} from "./gameState";

const PORT = 3000;

const app = express();
app.use(express.static("dist"));
app.get("/", (req, res) => {
  res.sendFile("index.html");
});
const httpServer = createServer(app);
const io = new Server(httpServer, {});

const state = createGame();
io.on("connection", (socket) => {
  socket.emit("setup", state);

  const player = generatePlayer(randomMapX(), randomMapY());
  state.players[socket.id] = player;
  io.emit("playerJoined", player);

  socket.on("disconnect", () => {
    io.emit("playerDisconnected", socket.id);
    delete state.players[socket.id];

    console.log("user disconnected");
  });

  console.log("a user connected");
});

httpServer.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}.`);
});

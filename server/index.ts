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

let idCount = 0;
const state = createGame();
io.on("connection", (socket) => {
  let personalID = idCount.toString();
  
  idCount++;

  socket.emit("setup", state);

  const player = generatePlayer(randomMapX(), randomMapY());
  state.players[personalID] = player;
  socket.broadcast.emit("playerJoined", personalID, player);

  socket.on("disconnect", () => {
    io.emit("playerDisconnected", personalID);
    delete state.players[personalID];

    console.log("user disconnected");
  });

  console.log("a user connected");
});

httpServer.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}.`);
});

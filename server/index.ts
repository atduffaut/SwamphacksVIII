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
  MAP_WIDTH,
  MAP_HEIGHT
} from "./gameState";
import { isColliding, onCollide } from "./collision";

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
const DELTA = 1 / 30 * 15;
io.on("connection", (socket) => {
  let personalID = idCount.toString();
  
  idCount++;
  
  const player = generatePlayer(randomMapX(), randomMapY());
  state.players[personalID] = player;

  socket.emit("setup", state, {
    id: personalID,
    x: player.x,
    y: player.y
  });
  socket.broadcast.emit("playerJoined", personalID, player);

  socket.on("move", (inputVx: number, inputVy: number, rotation: number) => {
    const vx = Math.min(inputVx, 5) * DELTA;
    const vy = Math.min(inputVy, 5) * DELTA;
    state.players[personalID].x += vx;
    state.players[personalID].y += vy;

    state.players[personalID].x = Math.max(0, state.players[personalID].x);
    state.players[personalID].y = Math.max(0, state.players[personalID].y);
    state.players[personalID].x = Math.min(MAP_WIDTH, state.players[personalID].x);
    state.players[personalID].y = Math.min(MAP_HEIGHT, state.players[personalID].y);
    
    state.players[personalID].rotation = rotation;

    io.emit("move", personalID, state.players[personalID].x, state.players[personalID].y, state.players[personalID].rotation);
  });

  socket.on("disconnect", () => {
    io.emit("playerDisconnected", personalID);
    delete state.players[personalID];

    console.log("user disconnected");
  });

  console.log("a user connected");
});
setInterval(() => {
  // Object.values(state.players).map(player => {
  //   state.entities.map(entity => {
  //     if (isColliding(player, entity)) {
  //       onCollide(player, entity);
  //     }
  //   });
  // })

  // state.entities.forEach(entity => {
  //   if (entity.vx > 0 && entity.vy > 0) {
  //     entity.x += entity.vx;
  //     entity.y += entity.vy;
  //   }
  //   io.emit("rocks", state.entities);
  // })
}, 1/30);

httpServer.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}.`);
});

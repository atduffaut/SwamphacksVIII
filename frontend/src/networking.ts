import { io, Socket } from "socket.io-client";
import { onReceiveSetup, onReceivePlayerDisconnect, onReceivePlayerJoin, onMovePlayer,
  onReceiveRocks } from ".";
import {
  onReceivePositions,
} from "./events/events";
import { EntityState, PlayerState } from "./types";

export const setupNetworking = (): Socket => {
  const socket = io();

  socket.on("connect", () => {
    console.log("Connected. ID is", socket.id);
  });

  socket.on("setup", onReceiveSetup);

  socket.on("positions", onReceivePositions);

  socket.on("playerJoined", onReceivePlayerJoin);

  socket.on("move", onMovePlayer);

  socket.on("rocks", onReceiveRocks);

  socket.on("playerDisconnected", onReceivePlayerDisconnect);

  return socket;
};

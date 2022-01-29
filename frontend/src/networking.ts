import { io, Socket } from "socket.io-client";
import {
  onReceivePlayerDisconnect,
  onReceivePlayerJoin,
  onReceivePositions,
  onReceiveSetup,
} from "./events/events";
import { EntityState } from "./types";

export const setupNetworking = (): Socket => {
  const socket = io();

  socket.on("connect", () => {
    console.log("Connected. ID is", socket.id);
  });

  socket.on("setup", onReceiveSetup);

  socket.on("positions", onReceivePositions);

  socket.on("playerJoined", onReceivePlayerJoin);

  socket.on("playerDisconnected", onReceivePlayerDisconnect);

  return socket;
};

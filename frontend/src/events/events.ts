import { EntityState, PlayerState, TotalGameState } from "../types";

export const onReceiveSetup = (state: TotalGameState) => {
  console.log("Game state received:", state);
};

export const onReceivePositions = (positions: EntityState[]) => {
  console.log("Entity positions received:", positions);
};

export const onReceivePlayerJoin = (player: PlayerState) => {
  console.log("New player:", player.name);
};

export const onReceivePlayerDisconnect = (playerId: string) => {
  console.log("Player disconnected:", playerId);
};

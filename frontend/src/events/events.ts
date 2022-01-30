import { EntityState, PlayerState, TotalGameState } from "../types";

export const onReceivePositions = (positions: EntityState[]) => {
  console.log("Entity positions received:", positions);
};

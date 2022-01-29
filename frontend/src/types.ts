export type EntityState = {
  type: string;
  x: number;
  y: number;
};

export type PlayerState = EntityState & {
  name: string;
};

export type PlayerStates = {
  [id: string]: PlayerState;
};

export type TotalGameState = {
  entities: EntityState[];
  players: PlayerStates;
};

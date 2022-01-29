export const MAP_WIDTH = 2000;
export const MAP_HEIGHT = 2000;

type EntityState = {
  type: string;
  x: number;
  y: number;
};

type PlayerState = EntityState & {
  name: string;
};

export type PlayerStates = {
  [id: string]: PlayerState;
};

export type TotalGameState = {
  entities: EntityState[];
  players: PlayerStates;
};

export const randomMapX = (): number =>
  Math.floor(Math.random() * MAP_WIDTH - 40);

export const randomMapY = (): number =>
  Math.floor(Math.random() * MAP_HEIGHT - 40);

export const generatePlayer = (x: number, y: number): PlayerState => {
  return {
    type: "player",
    x: x,
    y: y,
    name: "Knight " + Math.floor(Math.random() * 1000).toString(),
  };
};

const generateRock = (x: number, y: number): EntityState => {
  return {
    type: "rock",
    x: x,
    y: y,
  };
};

export const createRocks = (): EntityState[] => {
  const rocks: EntityState[] = [];
  for (let i = 0; i < 100; i++) {
    let rock = generateRock(randomMapX(), randomMapY());
    rocks.push(rock);
  }
  return rocks;
};

export const createGame = (): TotalGameState => {
  return {
    entities: createRocks(),
    players: {},
  };
};

interface GameState {
  cells: Cell[];
}

interface Cell {
  text: string;
  clazz: string;
  link: string;
}

export type { GameState, Cell }
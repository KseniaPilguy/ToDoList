export type ToDo = {
  id: number;
  title: string;
  board: number;
};

export type Board = {
  id: number;
  title: string;
  items: ToDo[];
};

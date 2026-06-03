export interface ITodo {
  id: number;
  text: string;
}

export interface ITodoWithCompleted extends ITodo {
  completed: boolean;
}

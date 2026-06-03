import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useState
} from "react";

import { ITodo, ITodoWithCompleted } from "./types";

// Define the shape of the state. It might be more convenient to embed
// the 'completed' state inside the Todo interface. However, this way it allows
// for demonstration of a map in the state together with a selector to merge
// the data.
interface IState {
  todos: ITodo[];
  completed: Record<number, boolean>;
  textAdd: string;
}

// Define focused context shapes so unrelated state updates do not notify
// consumers that only care about another slice of the todo state.
interface ITodoInputContext {
  textAdd: string;
  changeAddText: (text: string) => void;
  addTodo: () => void;
}

interface ITodoListContext {
  todosWithCompleted: ITodoWithCompleted[];
  deleteTodo: (id: number) => void;
  toggleCompleted: (id: number) => void;
}

interface IStateDebugContext {
  state: IState;
}

const initialTodos: ITodo[] = [
  { id: 1, text: "Do the laundry" },
  { id: 2, text: "Dance around the room" },
  { id: 3, text: "Buy a motorbike" },
  { id: 4, text: "Jump on the couch" }
];

// Calculate the last ID in the todoList for use in generating new IDs.
let nextId = Math.max(...initialTodos.map(t => t.id)) + 1;

// Todo 1 and 4 are marked as 'completed' initially.
const initialCompleted: Record<number, boolean> = {
  1: true,
  4: true
};

const initialState: IState = {
  todos: initialTodos,
  completed: initialCompleted,
  textAdd: ""
};

const TodoInputContext = createContext<ITodoInputContext | undefined>(
  undefined
);
const TodoListContext = createContext<ITodoListContext | undefined>(undefined);
const StateDebugContext = createContext<IStateDebugContext | undefined>(
  undefined
);

const StateContainer = ({ children }: PropsWithChildren) => {
  const [state, setState] = useState<IState>(initialState);

  const todosWithCompleted = useMemo(() => {
    // This selector merges the todos array with the 'completed' map.
    return state.todos.map(todo => ({
      ...todo,
      completed: state.completed[todo.id] || false
    }));
  }, [state.completed, state.todos]);

  const toggleCompleted = useCallback((id: number) => {
    setState(prevState => ({
      ...prevState,
      completed: {
        ...prevState.completed,
        [id]: !prevState.completed[id] || false
      }
    }));
  }, []);

  const deleteTodo = useCallback((id: number) => {
    setState(prevState => {
      const completed = { ...prevState.completed };
      delete completed[id];

      return {
        ...prevState,
        todos: prevState.todos.filter(todo => todo.id !== id),
        completed
      };
    });
  }, []);

  const addTodo = useCallback(() => {
    // Generate a new Todo using nextId (and increment it) and reset
    // textAdd (the text in the input field)
    setState(prevState => {
      const todo: ITodo = {
        id: nextId++,
        text: prevState.textAdd
      };

      return {
        ...prevState,
        todos: [todo, ...prevState.todos],
        textAdd: ""
      };
    });
  }, []);

  const changeAddText = useCallback((text: string) => {
    setState(prevState => ({ ...prevState, textAdd: text }));
  }, []);

  const todoInputContext = useMemo<ITodoInputContext>(
    () => ({
      textAdd: state.textAdd,
      changeAddText,
      addTodo
    }),
    [addTodo, changeAddText, state.textAdd]
  );

  const todoListContext = useMemo<ITodoListContext>(
    () => ({
      todosWithCompleted,
      deleteTodo,
      toggleCompleted
    }),
    [deleteTodo, todosWithCompleted, toggleCompleted]
  );

  const stateDebugContext = useMemo<IStateDebugContext>(
    () => ({
      state
    }),
    [state]
  );

  // Pass focused context values so each consumer subscribes to the smallest
  // slice it needs.
  return (
    <TodoInputContext.Provider value={todoInputContext}>
      <TodoListContext.Provider value={todoListContext}>
        <StateDebugContext.Provider value={stateDebugContext}>
          {children}
        </StateDebugContext.Provider>
      </TodoListContext.Provider>
    </TodoInputContext.Provider>
  );
};

export const useTodoInputContext = () => {
  const context = useContext(TodoInputContext);

  if (!context) {
    throw new Error("useTodoInputContext must be used inside StateContainer");
  }

  return context;
};

export const useTodoListContext = () => {
  const context = useContext(TodoListContext);

  if (!context) {
    throw new Error("useTodoListContext must be used inside StateContainer");
  }

  return context;
};

export const useStateDebugContext = () => {
  const context = useContext(StateDebugContext);

  if (!context) {
    throw new Error("useStateDebugContext must be used inside StateContainer");
  }

  return context;
};

export default StateContainer;

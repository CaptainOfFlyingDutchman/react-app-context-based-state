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

// Define the shape of the context. This is what gets consumed by components
// who wish to get access to the state. You can create selectors and actions
// to provide encapsulated getters and setters.
interface IContext {
  state: IState;
  selectors: {
    getTodosWithCompleted: () => ITodoWithCompleted[];
  };
  actions: {
    changeAddText: (text: string) => void;
    addTodo: () => void;
    deleteTodo: (id: number) => void;
    toggleCompleted: (id: number) => void;
  };
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

const StateContext = createContext<IContext | undefined>(undefined);

const StateContainer = ({ children }: PropsWithChildren) => {
  const [state, setState] = useState<IState>(initialState);

  const getTodosWithCompleted = useCallback(() => {
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

  // Build the context object with the container state and all the
  // implementations of the selectors and actions.
  const context = useMemo<IContext>(
    () => ({
      state,
      selectors: {
        getTodosWithCompleted
      },
      actions: {
        deleteTodo,
        toggleCompleted,
        addTodo,
        changeAddText
      }
    }),
    [
      addTodo,
      changeAddText,
      deleteTodo,
      getTodosWithCompleted,
      state,
      toggleCompleted
    ]
  );

  // Pass the context object as a value of the Context Provider. Then
  // render any children below it.
  return (
    <StateContext.Provider value={context}>{children}</StateContext.Provider>
  );
};

export const useStateContext = () => {
  const context = useContext(StateContext);

  if (!context) {
    throw new Error("useStateContext must be used inside StateContainer");
  }

  return context;
};

export default StateContainer;

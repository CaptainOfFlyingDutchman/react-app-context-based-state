import { useStateContext } from "./StateContainer";
import TodoListContainer from "./TodoListContainer";
import TodoInputContainer from "./TodoInputContainer";

const App = () => {
  const { state } = useStateContext();

  return (
    <div>
      Todo list:
      <TodoInputContainer />
      <TodoListContainer />
      Internal state:
      <pre>{JSON.stringify(state, null, 2)}</pre>
    </div>
  );
};

export default App;

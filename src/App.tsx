import StateDebug from "./StateDebug";
import TodoListContainer from "./TodoListContainer";
import TodoInputContainer from "./TodoInputContainer";

const App = () => {
  return (
    <div>
      Todo list:
      <TodoInputContainer />
      <TodoListContainer />
      Internal state:
      <StateDebug />
    </div>
  );
};

export default App;

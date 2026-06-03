import { useStateContext } from "./StateContainer";
import TodoList from "./TodoList";

const TodoListContainer = () => {
  const { selectors, actions } = useStateContext();

  return (
    <TodoList
      todos={selectors.getTodosWithCompleted()}
      handleTick={actions.toggleCompleted}
      handleDelete={actions.deleteTodo}
    />
  );
};

export default TodoListContainer;

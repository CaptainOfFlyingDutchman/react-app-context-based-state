import { useActionsContext, useStateContext } from "./StateContainer";
import TodoList from "./TodoList";

const TodoListContainer = () => {
  const { selectors } = useStateContext();
  const { toggleCompleted, deleteTodo } = useActionsContext();

  return (
    <TodoList
      todos={selectors.getTodosWithCompleted()}
      handleTick={toggleCompleted}
      handleDelete={deleteTodo}
    />
  );
};

export default TodoListContainer;

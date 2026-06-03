import { useTodoListContext } from "./StateContainer";
import TodoList from "./TodoList";

const TodoListContainer = () => {
  const { todosWithCompleted, toggleCompleted, deleteTodo } =
    useTodoListContext();

  return (
    <TodoList
      todos={todosWithCompleted}
      handleTick={toggleCompleted}
      handleDelete={deleteTodo}
    />
  );
};

export default TodoListContainer;

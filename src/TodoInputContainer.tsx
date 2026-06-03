import { useTodoInputContext } from "./StateContainer";
import TodoInput from "./TodoInput";

const TodoInputContainer = () => {
  const { textAdd, changeAddText, addTodo } = useTodoInputContext();

  return (
    <TodoInput
      text={textAdd}
      handleChange={changeAddText}
      handleSubmit={addTodo}
    />
  );
};

export default TodoInputContainer;

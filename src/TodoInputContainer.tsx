import { useActionsContext, useStateContext } from "./StateContainer";
import TodoInput from "./TodoInput";

const TodoInputContainer = () => {
  const { state } = useStateContext();
  const { changeAddText, addTodo } = useActionsContext();

  return (
    <TodoInput
      text={state.textAdd}
      handleChange={changeAddText}
      handleSubmit={addTodo}
    />
  );
};

export default TodoInputContainer;

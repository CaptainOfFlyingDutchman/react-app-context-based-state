import { useStateContext } from "./StateContainer";
import TodoInput from "./TodoInput";

const TodoInputContainer = () => {
  const { state, actions } = useStateContext();

  return (
    <TodoInput
      text={state.textAdd}
      handleChange={actions.changeAddText}
      handleSubmit={actions.addTodo}
    />
  );
};

export default TodoInputContainer;

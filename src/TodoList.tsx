import { ITodoWithCompleted } from "./types";

interface IProps {
  todos: ITodoWithCompleted[];
  handleTick: (id: number) => void;
  handleDelete: (id: number) => void;
}

const TodoList = (props: IProps) => {
  return (
    <div>
      <ul>
        {props.todos.map(todo => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => props.handleTick(todo.id)}
            />
            {todo.text}
            <button type="button" onClick={() => props.handleDelete(todo.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;

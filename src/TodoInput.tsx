interface IProps {
  text: string;
  handleChange: (text: string) => void;
  handleSubmit: () => void;
}

const TodoInput = (props: IProps) => (
  <div>
    <input
      type="text"
      value={props.text}
      onChange={e => props.handleChange(e.target.value)}
    />
    <button onClick={props.handleSubmit}>Add</button>
  </div>
);

export default TodoInput;

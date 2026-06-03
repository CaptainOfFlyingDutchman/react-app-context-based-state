import { useStateContext } from "./StateContainer";

const StateDebug = () => {
  const { state } = useStateContext();

  return <pre>{JSON.stringify(state, null, 2)}</pre>;
};

export default StateDebug;

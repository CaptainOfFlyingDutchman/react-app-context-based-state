import { useStateDebugContext } from "./StateContainer";

const StateDebug = () => {
  const { state } = useStateDebugContext();

  return <pre>{JSON.stringify(state, null, 2)}</pre>;
};

export default StateDebug;

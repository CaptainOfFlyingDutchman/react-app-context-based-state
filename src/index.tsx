import { createRoot } from "react-dom/client";

import StateContainer from "./StateContainer";
import App from "./App";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element #root was not found");
}

createRoot(rootElement).render(
  <StateContainer>
    <App />
  </StateContainer>
);

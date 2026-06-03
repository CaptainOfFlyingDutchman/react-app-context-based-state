## Original blog by Wilco Schoneveld

https://medium.com/headfwd/managing-local-state-with-the-react-context-api-and-typescript-ed342fcb96fc

## Branch change gist

- `main` - React 18 rewrite: upgraded the app from the old React 16 / `react-scripts-ts` setup to React 18, Vite, modern TypeScript, hooks, and `createRoot`.
- `feat/context-split` - Context split: extracted the internal state debug UI and separated state/selectors from stable actions to reduce action-only context re-renders.
- `feat/context-split-by-domain` - Domain context split: split todo input, todo list, and debug state into focused contexts so unrelated state updates notify fewer consumers.

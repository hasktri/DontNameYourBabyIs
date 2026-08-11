# Copilot Instructions for DontNameYourBabyIs-FE

## Project Overview
- **Type:** React + Redux Toolkit (RTK) single-page app
- **Entry Point:** `src/index.js` (mounts `App` to `#root` in `public/index.html`)
- **State Management:** Centralized in `src/store.js` using RTK, with a single `list` slice (`src/listSlice.js`).
- **UI:** All logic and UI in `src/App.js` (input, add, and list display)

## Architecture & Data Flow
- App state is managed via Redux Toolkit. All list items are stored in `state.list.items`.
- `App.js` uses `useSelector` to read items and `useDispatch` to add items via the `addItem` reducer.
- No async logic, middleware, or API calls present.
- All Redux logic is colocated in `src/listSlice.js`.

## Developer Workflows
- **Start Dev Server:** `npm start` (runs webpack-dev-server at [http://localhost:4001](http://localhost:4001))
- **Build for Production:** `npm run build` (outputs to `dist/`)
- **No test scripts or test files present.**
- **No custom lint, format, or CI/CD scripts.**

## Patterns & Conventions
- All React components are function components using hooks.
- Redux slices are defined with `createSlice` and colocated with reducers and actions.
- Only `.js` and `.jsx` files in `src/`.
- No TypeScript, no CSS modules, no custom middleware.
- All styles are inline in React components.

## Integration & Dependencies
- **External:** React, ReactDOM, Redux Toolkit, React-Redux.
- **Build:** Webpack (see `webpack.config.js`), Babel (see `.babelrc`).
- **No API integration, no routing, no environment variables.**

## Examples
- To add a new feature, create a new slice in `src/`, import it in `store.js`, and add to the `reducer` map.
- UI changes go in `App.js` or new components imported there.

## Key Files
- `src/App.js`: Main UI and logic
- `src/listSlice.js`: Redux slice for list state
- `src/store.js`: Redux store setup
- `webpack.config.js`: Build and dev server config
- `.babelrc`: Babel presets for React/JSX

---
**For AI agents:**
- Follow the colocated slice pattern for Redux logic.
- Use inline styles for UI unless otherwise specified.
- Keep all new logic in `src/` unless adding build or config files.
- No need to add tests, types, or API code unless requested.

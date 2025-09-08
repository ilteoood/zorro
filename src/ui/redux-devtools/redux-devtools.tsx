import reduxDevtoolsStyle from "./redux-devtools.module.css";

export const ReduxDevTools = () => (
  <iframe
    title="Redux Devtools"
    className={reduxDevtoolsStyle.iframe}
    src="http://localhost:8000"
  />
);

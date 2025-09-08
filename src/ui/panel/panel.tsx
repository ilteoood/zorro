import { NoticeBadge } from "../notice-badge/notice-badge";
import { ReduxDevTools } from "../redux-devtools/redux-devtools";

import panelStyle from "./panel.module.css";

export default function ReduxDevToolsPanel() {
  return (
    <div className={panelStyle.app}>
      <NoticeBadge
        title="Limited Functionality"
        text="Time travel and action dispatch are currently unavailable in remote mode."
        linkUrl="https://github.com/reduxjs/redux-devtools/issues/1340"
      />

      <NoticeBadge
        title="Device scoping"
        text="Redux DevTools are not currently scoped to a specific device. Make sure to select the correct instance of the store."
      />

      <ReduxDevTools />
    </div>
  );
}

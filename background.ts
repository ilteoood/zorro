import { DEFAULT_CONFIG } from "./src/zorro/zorro.config";

export const withRozeniteReduxDevTools = <T>(
  config: T,
  remoteDevtoolsConfig: typeof DEFAULT_CONFIG,
): T => {
  import("@redux-devtools/cli").then(({ default: devToolsCli }) => {
    devToolsCli({
      ...DEFAULT_CONFIG,
      ...remoteDevtoolsConfig,
      logLevel: process.env.ROZENITE_LOG_LEVEL,
    });
  });

  return config;
};

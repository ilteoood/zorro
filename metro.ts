import { DEFAULT_CONFIG, type ZorroConfig } from "./src/zorro.config";

export const withRozeniteReduxDevTools = <T>(
  config: T,
  remoteDevtoolsConfig: ZorroConfig,
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

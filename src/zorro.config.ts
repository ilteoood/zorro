const getRnHostname = (): string => {
  const getDevServer = require('react-native/Libraries/Core/Devtools/getDevServer');
  const devServer = getDevServer();
  return devServer.url.split('://')[1].split(':')[0];
};

const getHostname = (hostname: string): string => {
  try {
    return getRnHostname();
  } catch {
    return hostname;
  }
}

export type ZorroConfig = {
  name?: string;
  hostname?: string;
  port?: number;
  realtime?: boolean;
  secure?: boolean;
  enabled?: boolean;
};

export const DEFAULT_CONFIG: Required<ZorroConfig> = {
  name: "Zustand Store",
  hostname: getHostname("localhost"),
  port: 8000,
  realtime: true,
  secure: false,
  enabled: true,
};

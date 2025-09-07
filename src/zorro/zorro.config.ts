import getHostForRN from "rn-host-detect";

export type ZorroConfig = {
  name?: string;
  hostname?: string;
  port?: number;
  realtime?: boolean;
  secure?: boolean;
  enabled?: boolean;
};

export const DEFAULT_CONFIG: ZorroConfig = {
  name: "Zustand Store",
  hostname: getHostForRN("localhost"),
  port: 8000,
  realtime: true,
  secure: false,
  enabled: true,
};

import getHostForRN from "rn-host-detect";

export const DEFAULT_CONFIG = {
  hostname: getHostForRN("localhost"),
  port: 8000,
  secure: false,
  enabled: true,
};

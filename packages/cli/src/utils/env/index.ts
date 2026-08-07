import type { NODE_ENV } from "../../definitions/node";
import * as dotenv from "dotenv";

const refineEnv: Record<string, string> = {};

dotenv.config({ processEnv: refineEnv });

const envSearchMap: Record<Exclude<NODE_ENV, "custom">, RegExp> = {
  development: /dev/i,
  production: /prod/i,
  test: /test|tst/i,
  "continuous-integration": /ci/i,
  "user-acceptance-testing": /uat/i,
  "system-integration-testing": /sit/i,
};

export const getNodeEnv = (): NODE_ENV => {
  const nodeEnv = process.env.NODE_ENV;

  if (!nodeEnv) {
    return "development";
  }

  let env: NODE_ENV = "custom";

  for (const [key, value] of Object.entries(envSearchMap)) {
    if (value.test(nodeEnv)) {
      env = key as NODE_ENV;
      break;
    }
  }

  return env;
};

const getEnvValue = (key: string): string | undefined => {
  return process.env[key] || refineEnv[key];
};

export const ENV = {
  NODE_ENV: getNodeEnv(),
  REFINE_NO_TELEMETRY: getEnvValue("REFINE_NO_TELEMETRY") || "false",
  UPDATE_NOTIFIER_IS_DISABLED:
    getEnvValue("UPDATE_NOTIFIER_IS_DISABLED") || "false",
  UPDATE_NOTIFIER_CACHE_TTL:
    getEnvValue("UPDATE_NOTIFIER_CACHE_TTL") || 1000 * 60 * 60 * 24,
  REFINE_DEVTOOLS_PORT: getEnvValue("REFINE_DEVTOOLS_PORT"),
};

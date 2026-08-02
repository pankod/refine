import crypto from 'crypto';
import { redis } from './redisClient';

export type ReleaseLock = () => Promise<void>;

/** Best-effort Redis lease for singleton maintenance jobs on stateless pods. */
export const acquireDistributedLock = async (name: string, ttlMs: number): Promise<ReleaseLock | null> => {
  const key = `greeniq:lock:${name}`;
  const token = crypto.randomUUID();
  const acquired = await redis.set(key, token, 'PX', ttlMs, 'NX');
  if (acquired !== 'OK') return null;
  return async () => {
    await redis.eval(
      "if redis.call('get', KEYS[1]) == ARGV[1] then return redis.call('del', KEYS[1]) else return 0 end",
      1,
      key,
      token
    );
  };
};

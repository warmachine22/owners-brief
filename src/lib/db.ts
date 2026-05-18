import { id, init } from '@instantdb/react';
import schema from '../../instant.schema';

const appId = import.meta.env.VITE_INSTANT_APP_ID as string | undefined;

export const isInstantConfigured = Boolean(appId);

export const db = init({
  appId: appId || '00000000-0000-0000-0000-000000000000',
  schema,
  useDateObjects: false,
});

export { id };

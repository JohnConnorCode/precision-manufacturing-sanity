type ServerLogLevel = 'info' | 'warn' | 'error';

export type ServerLogEntry = {
  id: string;
  timestamp: string;
  level: ServerLogLevel;
  scope: string;
  message: string;
  stack?: string;
  context?: Record<string, unknown>;
};

type ServerLogEvent = {
  level?: ServerLogLevel;
  scope: string;
  message?: string;
  error?: unknown;
  context?: Record<string, unknown>;
};

const MAX_LOG_ENTRIES = 50;

const getLogStore = (): ServerLogEntry[] => {
  const globalWithStore = globalThis as typeof globalThis & {
    __IIS_SERVER_LOGS__?: ServerLogEntry[];
  };

  if (!globalWithStore.__IIS_SERVER_LOGS__) {
    globalWithStore.__IIS_SERVER_LOGS__ = [];
  }

  return globalWithStore.__IIS_SERVER_LOGS__;
};

const generateLogId = () => `log-${Date.now()}-${Math.random().toString(16).slice(2)}`;

export function logServerEvent(event: ServerLogEvent): ServerLogEntry {
  const { level = 'info', scope, message, error, context } = event;
  const timestamp = new Date().toISOString();

  const resolvedMessage =
    message ||
    (error instanceof Error
      ? error.message
      : typeof error === 'string'
      ? error
      : 'Server log event');

  const entry: ServerLogEntry = {
    id: generateLogId(),
    timestamp,
    level,
    scope,
    message: resolvedMessage,
    stack: error instanceof Error ? error.stack : undefined,
    context,
  };

  const store = getLogStore();
  store.push(entry);
  if (store.length > MAX_LOG_ENTRIES) {
    store.splice(0, store.length - MAX_LOG_ENTRIES);
  }

  const logger =
    level === 'error' ? console.error : level === 'warn' ? console.warn : console.log;

  if (level === 'info' && process.env.NODE_ENV === 'production') {
    // Avoid noisy info logs in production
    return entry;
  }

  logger(`[${scope}] ${resolvedMessage}`, error ?? context ?? {});
  return entry;
}

export function logServerError(
  scope: string,
  error: unknown,
  context?: Record<string, unknown>
) {
  return logServerEvent({ level: 'error', scope, error, context });
}

export function getServerLogEntries(limit = 20): ServerLogEntry[] {
  const store = getLogStore();
  const entries = store.length > limit ? store.slice(-limit) : store;
  return [...entries].reverse();
}

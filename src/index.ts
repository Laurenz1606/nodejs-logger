type LogLevels = "debug" | "info" | "warn" | "error";

export function logger(message: string, level: LogLevels) {
  message = formatString(message, level);
  console[level](message);
}

function formatString(message: string, level: LogLevels) {
  const date = new Date();
  const formatedDate = date.toISOString();
  const template = process.env.LOGGER_TEMPLATE || "[%L] %d %m";
  return template
    .replace("%d", formatedDate)
    .replace("%L", level.toUpperCase())
    .replace("%l", level)
    .replace("%m", message);
}

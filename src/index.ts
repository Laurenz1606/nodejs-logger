import chalk from "chalk";

type LogLevels = "debug" | "info" | "warn" | "error";

export function logger(message: string, level: LogLevels) {
  message = formatString(message, level);
  console[level](message);
}

function formatString(message: string, level: LogLevels) {
  const date = new Date();
  const formatedDate = date.toISOString();
  const template = process.env.LOGGER_TEMPLATE || "[%l] %d %m";

  let logLevel = "";

  if (level === "debug") logLevel = chalk.magenta(level.toUpperCase());
  if (level === "info") logLevel = chalk.cyan(level.toUpperCase());
  if (level === "warn") logLevel = chalk.yellowBright(level.toUpperCase());
  if (level === "error") logLevel = chalk.bold(chalk.red(level.toUpperCase()));

  return template
    .replace("%d", formatedDate)
    .replace("%l", logLevel)
    .replace("%m", message);
}

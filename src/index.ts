import chalk from "chalk";

type LogLevels = "debug" | "info" | "warn" | "error";

//all format identities
// %L -> The current LogLevel in Uppercase (e.g. "INFO")
// %l -> The current LogLevel in Lowercase (e.g. "info")
// %d -> The current date as YYYY-MM-DD (e.g. "2022-01-10")
// %t -> The current time as HH:MM:SS (e.g. "21:04:32")
// %m -> The message for the logger (e.g. "404 Not Found")

interface Config {
  debug?: boolean;
  info?: boolean;
  warn?: boolean;
  error?: boolean;
  format?: string;
}

function up(message: string): string {
  return message.toUpperCase();
}

function l2(message: string) {
  return message.length === 1 ? `0${message}` : message;
}

function currentDate() {
  const date = new Date();
  return `${l2(String(date.getFullYear()))}-${l2(String(date.getMonth()))}-${l2(
    String(date.getDay()),
  )}`;
}

function currentTime() {
  const date = new Date();
  return `${l2(String(date.getHours()))}:${l2(String(date.getMinutes()))}:${l2(
    String(date.getSeconds()),
  )}`;
}

export class Logger {
  private Config: Config;
  constructor(config?: Config) {
    this.Config = {
      debug: config?.debug || true,
      error: config?.error || true,
      info: config?.info || true,
      warn: config?.warn || true,
      format: config?.format || "[%L] %m",
    };
  }

  public log(level: LogLevels, message: string) {
    if (this.Config[level]) console[level](this.format(level, message));
  }

  public format(level: LogLevels, message: string): string {
    let logLevel = "";
    if (level === "debug") logLevel = chalk.magenta(level);
    if (level === "info") logLevel = chalk.cyan(level);
    if (level === "warn") logLevel = chalk.yellowBright(level);
    if (level === "error") logLevel = chalk.bold(chalk.red(level));

    let logLevelUp = "";
    if (level === "debug") logLevelUp = chalk.magenta(up(level));
    if (level === "info") logLevelUp = chalk.cyan(up(level));
    if (level === "warn") logLevelUp = chalk.yellowBright(up(level));
    if (level === "error") logLevelUp = chalk.bold(chalk.red(up(level)));
    if (level === "error")
      logLevel = chalk.bold(chalk.red(level.toUpperCase()));

    return message
      .split("\n")
      .map((line) => {
        return (<string>this.Config.format)
          .replace("%d", chalk.bold(chalk.green(currentDate())))
          .replace("%t", chalk.bold(chalk.gray(currentTime())))
          .replace("%L", logLevelUp)
          .replace("%l", logLevel)
          .replace("%m", line);
      })
      .join("\n");
  }
}

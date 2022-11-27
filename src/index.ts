import chalk from "chalk";

type LogLevels = "debug" | "info" | "warn" | "error";

//all format identities
// %L -> The current LogLevel in Uppercase (e.g. "INFO")
// %l -> The current LogLevel in Lowercase (e.g. "info")
// %d -> The current date as YYYY-MM-DD (e.g. "2022-01-10")
// %t -> The current time as HH:MM:SS (e.g. "21:04:32")
// %m -> The message for the logger (e.g. "404 Not Found")

export interface IConfig {
  debug?: boolean;
  info?: boolean;
  warn?: boolean;
  error?: boolean;
  format?: string;
}

type ErrorMessage = string | Error;

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
  private Config: IConfig & { format: string };
  constructor(config?: IConfig) {
    this.Config = {
      debug: config?.debug ?? true,
      error: config?.error ?? true,
      info: config?.info ?? true,
      warn: config?.warn ?? true,
      format: config?.format || "[%L] %m",
    };
  }

  public debug(errorMessage: ErrorMessage) {
    this.log("debug", errorMessage);
  }

  public info(errorMessage: ErrorMessage) {
    this.log("info", errorMessage);
  }

  public warn(errorMessage: ErrorMessage) {
    this.log("warn", errorMessage);
  }

  public error(errorMessage: ErrorMessage) {
    this.log("error", errorMessage);
  }

  public log(level: LogLevels, errorMessage: ErrorMessage) {
    const log = this.Config[level];
    const isError = errorMessage instanceof Error;

    //exit when log is false
    if (!log) return;

    //check for error and error stack and log error
    if (isError && errorMessage.stack) {
      return console[level](this.format(level, errorMessage.stack));
    }

    //check for error and log error stack
    if (isError) {
      return console[level](this.format(level, errorMessage.message));
    }

    //log normal string
    return console[level](this.format(level, errorMessage));
  }

  public format(level: LogLevels, errorMessage: string): string {
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

    return errorMessage
      .split("\n")
      .map((line) => {
        return this.Config.format
          .replace("%d", chalk.bold(chalk.green(currentDate())))
          .replace("%t", chalk.bold(chalk.gray(currentTime())))
          .replace("%L", logLevelUp)
          .replace("%l", logLevel)
          .replace("%m", line);
      })
      .join("\n");
  }
}

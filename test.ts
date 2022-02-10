import { Logger } from "./src";

const log = new Logger({
  format: "[%d] %m",
});

log.log("debug", "Hallo12");
log.log("info", "Hallo12");
log.log("warn", "Hallo12");
log.log("error", "Hallo12");

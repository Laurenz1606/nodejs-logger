import { Logger } from "./src";

const log = new Logger({
  format: "[%L] %d %t %m",
});

log.log("debug", "Hallo12");
log.log("info", "Hallo12");
log.log("warn", "Hallo12");
log.log(
  "info",
  JSON.stringify({ test: "test123", test2: { a: false } }, null, 2),
);

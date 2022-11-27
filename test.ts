import { Logger } from "./src";

//create logger
const log = new Logger({
  format: "[%L] %d %t %m",
});

//log messages
console.log("\nDefault log");
log.log("debug", "Hallo");
log.log("info", "Hallo");
log.log("warn", "Hallo");
log.log("error", "Hallo");

//multi line
console.log("\nMultiline");
log.log(
  "info",
  JSON.stringify({ test: "test123", test2: { a: false } }, null, 2),
);

//shorthands
console.log("\nShorthands");
log.debug("Hallo");
log.info("Hallo");
log.warn("Hallo");
log.error("Hallo");

//error support
console.log("\nNormal Error Support");
log.error(new Error("Hallo"));

//error without stack support
console.log("\nWithout stack Error Support");
const err = new Error("Hallo");
err.stack = undefined;
log.error(err);

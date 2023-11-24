import { execSync } from "child_process";

import { Actions, Scenarios } from "../interface";

import { config } from "./config";
import { ADBRunner } from "./adb-runner";
import { cleanup, getCoords, getScreenSize } from "./utils";

const [SCENARIO] = process.argv.slice(2) as [Scenarios];

if (!SCENARIO) {
  console.error(
    `No scenario provided. Please provide one of \n- ${Object.values(
      Scenarios
    ).join("\n- ")}`
  );
  process.exit(0);
}

const APP_NAME = config.appName;

try {
  const [width, height] = getScreenSize();

  const coords = getCoords(width, height);

  /**
   * Kill the app if it exists
   */
  cleanup(APP_NAME);

  /**
   * Start app
   */
  execSync(
    `adb shell am start -n ${APP_NAME}/${APP_NAME}.MainActivity && sleep 0.5`
  );

  /**
   * Create entry to run
   */
  let commands = [];
  const entry = config.points.entry.scenarios[SCENARIO];

  commands.push(`--input.${Actions.TAP} "${coords(entry)}"`);

  const frame = config.points.frame;
  const scenario = frame["scenarios"][SCENARIO];

  let sleep = config.sleep

  if (scenario) {
    const cmd = [
      `--input.${scenario.type}`,
      `"${scenario.coords.map(coords).join(" ")}"`,
    ];
    commands.push(cmd.join(" "));
    sleep = scenario.sleep ?? config.sleep
  }

  commands.push(`--input.${Actions.TAP} "${coords(frame.back)}"`);

  commands = commands.reduce((o, i, idx) => {
    if (idx) {
      return [...o, `--sleep ${sleep}`, i];
    }

    return [...o, i];
  }, []);

  ADBRunner(APP_NAME, commands);
} catch (e) {
  console.error(e);
  throw e;
}

[
  `exit`,
  `SIGINT`,
  `SIGUSR1`,
  `SIGUSR2`,
  `uncaughtException`,
  `SIGTERM`,
].forEach((eventType) => {
  process.on(eventType, function () {
    cleanup(APP_NAME);
  });
});

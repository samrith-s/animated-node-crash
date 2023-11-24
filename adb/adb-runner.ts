import { execSync } from "child_process";

export function ADBRunner(appName: string, argv: string[]) {
  if (/^-+/.test(appName)) {
    throw new Error(
      `Invalid app name '${appName}' provided. App name must not match options and should not begin with hyphens (-)`
    );
  }

  const getAction = (item: string) => {
    switch (item) {
      case "sleep":
        return "sleep";

      default:
        return `adb shell ${item.split(".").join(" ")}`;
    }
  };

  const actions = argv.reduce((acc, item) => {
    const [_, cmd, value] = item.match(/^-+([A-Za-z\.]+)\s*\"*([0-9\s\.]+)\"*/i);

    acc.push(`${getAction(cmd.replace(/^-+/, ""))} ${value}`);

    return acc;
  }, []);

  let count = 0;

  const getApp = () => {
    try {
      return execSync(`adb shell ps | grep ${appName}`);
    } catch (e) {
      throw new Error(e.message);
    }
  };

  const startTime = Date.now()

  while (getApp()) {
    console.clear()
    console.log("Test running with the following steps");
    console.log(`\t${actions.join('\n\t')}`);
    console.log(`Iterations: ${count}\r`);
    console.log(`Time elapsed: ${((Date.now() - startTime)/1000).toFixed(2)}s`)

    try {
      execSync(actions.join('\n'), {
        stdio: "inherit",
      });
      count++
    } catch (e) {
      throw new Error(e.message);
    }
  }
}

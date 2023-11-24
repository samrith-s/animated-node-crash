import { execSync } from "child_process";

import { Coords } from "./interface";

export function getCoords(width: number, height: number) {
  return function coords(coords: Coords) {
    return [width * coords.x, height * coords.y].join(" ");
  };
}

export function cleanup(appName: string) {
  execSync(`adb shell am force-stop ${appName}`).toString();
}

export function getScreenSize(): readonly [number, number] {
  const [_, width, height] = execSync("adb shell wm size")
    .toString()
    .match(/(\d+)x(\d+)/);

  const [___, statusH] = execSync(
    `adb shell dumpsys window windows| sed -n '/Window .*StatusBar.*:/,/Window .*:/p'| grep 'Requested'`
  )
    .toString()
    .match(/.*h=(\d+).*/);

  return [
    Math.ceil(parseFloat(width)),
    Math.ceil(parseFloat(height) - parseFloat(statusH)),
  ] as const;
}

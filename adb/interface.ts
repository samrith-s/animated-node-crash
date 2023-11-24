import { Actions, Scenarios } from "../interface";

export type Coords = {
  x: number,
  y: number
}

export type Config = {
  appName: string;
  sleep: number
  points: {
    entry: {
      scenarios: {
        [key in Scenarios]: Coords
      }
    },
    frame: {
      back: Coords
      scenarios: {
        [key in Scenarios]?: {
          sleep: number
          type: Actions
          coords: Coords[]
        }
      }
    }
  }
}
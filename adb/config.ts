import { Actions, Scenarios } from "../interface";
import { Config } from "./interface";

export const config: Config = {
  appName: "com.anonymous.AnimatedNodeCrash",
  sleep: 0.2,
  points: {
    entry: {
      scenarios: {
        [Scenarios.TOUCHABLE_OPACITY]: {
          x: 0.466,
          y: 0.520
        },
        [Scenarios.SECTION_LIST]: {
          x: 0.500,
          y: 0.531
        },
        [Scenarios.CUSTOM]: {
          x: 0.500,
          y: 0.591
        }
      },
    },
      frame: {
        back: {
          x: 0.064,
          y: 0.072,
        },
        scenarios: {
          [Scenarios.TOUCHABLE_OPACITY]: {
            sleep: 0.02,
            type: Actions.TAP,
            coords: [{
              x: 0.500, 
              y: 0.500
            }]
          },
          [Scenarios.SECTION_LIST]: {
            sleep: 0.1,
            type: Actions.SWIPE,
            coords: [{
              x: 0.500,
              y: 0.450,
            }, {
              x: 0.500,
              y: 0.090
            }]
          },
        }
      }
  },
};

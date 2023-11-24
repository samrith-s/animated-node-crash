# Animated Node crash test

This repository aims to reproduce [an issue faced by a lot of developers](https://github.com/facebook/react-native/issues/37267) with respect to the app crashing on Android, with the `Animated` API from React Native.

## Prerequisites

Working setup of:
- Node
- ADB

## Setup

Once you have cloned the repository, you can install the dependencies with NPM.

```bash
npm install
```

## Generating the build

You can create a release build with the following command:

```bash
npm run release
```

The output APK will be available at:

```
.output/animated-node-crash.apk
```

## Running the test

The test will run until the app crashes, upon which it will automatically terminate.

Ensure you have the APK installed on any device or emulator. Once done, you can run any of the tests via the CLI.

The console will also log the iterations and time elapsed.

### Touchable Opacity

```bash
npm run test touchable-opacity
```

### Section List

```bash
npm run test section-list
```

### Custom animation

```bash
npm run test custom
```




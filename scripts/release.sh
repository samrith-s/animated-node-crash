#!/bin/bash

set -e

rm -rf .output

cd ./android
./gradlew clean
./gradlew assembleRelease
cd ..

mkdir -p .output

cp \
  android/app/build/outputs/apk/release/app-release.apk \
  .output/animated-node-crash.apk;

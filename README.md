# STOPCovid NI

## Getting Started

Following these instructions will allow you to run and build the project on your local machine for development and testing purposes.

### Prerequisites

Follow the official guide "[Setting up the development environment](https://reactnative.dev/docs/environment-setup)" to set up your local machine to develop iOS and Android applications with React Native.

Install an xCode version that supports iOS 13.5, required by the [ExposureNotification framework](https://developer.apple.com/documentation/exposurenotification) used by the app.

Install `yarn` globally:

```bash
npm install -g yarn
```

For other installation methods, follow the official [Installation guide](https://classic.yarnpkg.com/en/docs/install).

### Installing

Clone this repository.

Install the npm dependencies:

```bash
yarn install
```

Create your `.env` file or copy it from the `.env.sample`:

```bash
cp .env.sample .env
```

Move to `ios/` folder and install the CocoaPods dependencies:

```bash
cd ios && pod install
```

## Running the applications locally

Start the React Native bundler:

```bash
yarn start
```

To start the Android application, run:

```bash
yarn android
```

To start the iOS one, run:

```bash
yarn ios
```

## E2E Testing

Application is using [Detox](https://github.com/wix/detox/) to run E2E testing. Check the [Getting Started](https://github.com/wix/Detox/blob/master/docs/Introduction.GettingStarted.md) section for details of how to setup Detox locally.

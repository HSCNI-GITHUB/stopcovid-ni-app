import React, {useEffect, useState} from 'react';
import {
  StatusBar,
  Platform,
  AppState,
  Image,
  Text,
  TextInput,
  LogBox
} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {enableScreens} from 'react-native-screens';
import NetInfo from '@react-native-community/netinfo';
import PushNotification, {
  PushNotification as PN
} from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import {Asset} from 'expo-asset';
import * as Font from 'expo-font';
import {
  ExposureProvider,
  KeyServerType,
  getVersion
} from 'react-native-exposure-notification-service';
import * as SecureStore from 'expo-secure-store';

import './services/i18n';

import {urls} from './constants/urls';
import {Base} from './components/templates/base';
import Navigation from './components/organisms/navigation';
import {ApplicationProvider} from './providers/context';
import {useApplication} from './providers/context';
import {
  SettingsProvider,
  SettingsContext,
  useSettings
} from './providers/settings';
import {Loading} from './components/views/loading';
import {ReminderProvider} from './providers/reminder';
import {notificationHooks} from './services/notifications';
import {useAgeGroupTranslation} from './hooks';

// This hides a warning from react-native-easy-markdown which is still using componentWillReceiveProps in its latest version
LogBox.ignoreLogs([
  'Warning: componentWillReceiveProps has been renamed, and is not recommended for use.'
]);

enableScreens();

try {
  NetInfo.fetch().then((state) => console.log(state));
} catch (err) {
  console.log(err);
}

function cacheImages(images: (string | number)[]) {
  return images.map((image) => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

// @ts-ignore
Text.defaultProps = {};
// @ts-ignore
Text.defaultProps.maxFontSizeMultiplier = 1.3;
// @ts-ignore
Text.defaultProps.textBreakStrategy = 'simple';

// @ts-ignore
TextInput.defaultProps = {};
// @ts-ignore
TextInput.defaultProps.maxFontSizeMultiplier = 1.3;
// @ts-ignore
TextInput.defaultProps.textBreakStrategy = 'simple';

const ExposureApp = ({
  notification,
  exposureNotificationClicked,
  setState
}: {
  notification: PN | null;
  exposureNotificationClicked: Boolean | null;
  setState: (value: React.SetStateAction<NIState>) => void;
}) => {
  const [authToken, setAuthToken] = useState<string>('');
  const [refreshToken, setRefreshToken] = useState<string>('');
  const {getTranslation} = useAgeGroupTranslation();

  const settings = useSettings();
  const application = useApplication();

  useEffect(() => {
    async function getTokens() {
      try {
        const storedAuthToken = (await SecureStore.getItemAsync('token')) || '';
        const storedRefreshToken =
          (await SecureStore.getItemAsync('refreshToken')) || '';

        if (storedAuthToken !== authToken) {
          setAuthToken(storedAuthToken);
        }
        if (storedRefreshToken !== refreshToken) {
          setRefreshToken(storedRefreshToken);
        }
      } catch (err) {
        console.log('error getting tokens', err);
      }
    }

    getTokens();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [application.user]);

  return (
    <ExposureProvider
      isReady={Boolean(
        application.user?.valid &&
          application.completedExposureOnboarding &&
          authToken &&
          refreshToken
      )}
      traceConfiguration={settings.traceConfiguration}
      serverUrl={urls.api}
      keyServerUrl={urls.api}
      keyServerType={KeyServerType.nearform}
      authToken={authToken}
      refreshToken={refreshToken}
      analyticsOptin={true}
      notificationTitle={getTranslation('closeContactNotification:title')}
      notificationDescription={getTranslation(
        'closeContactNotification:description'
      )}>
      <StatusBar barStyle="default" />
      <Navigation
        user={application.user}
        notification={notification}
        exposureNotificationClicked={exposureNotificationClicked}
        completedExposureOnboarding={application.completedExposureOnboarding}
        setState={setState}
      />
    </ExposureProvider>
  );
};

export interface NIState {
  loading: boolean;
  token?: {os: string; token: string};
  notification: PN | null;
  exposureNotificationClicked: Boolean | null;
}

const App = (props: {exposureNotificationClicked: Boolean | null}) => {
  const [state, setState] = React.useState<NIState>({
    loading: false,
    notification: null,
    exposureNotificationClicked: props.exposureNotificationClicked
  });

  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        const imageAssets = cacheImages([
          require('./assets/images/logo/logo.png')
        ]);

        await Font.loadAsync({
          'aktiv-extra-bold': require('./assets/fonts/AktivGrotesk_A_XBd.ttf'),
          'aktiv-bold': require('./assets/fonts/AktivGrotesk_A_Bd.ttf'),
          'aktiv-medium': require('./assets/fonts/AktivGrotesk_A_Md.ttf'),
          aktiv: require('./assets/fonts/AktivGrotesk_A_Rg.ttf'),
          'aktiv-light': require('./assets/fonts/AktivGrotesk_A_Lt.ttf')
        });

        await Promise.all([...imageAssets]);
      } catch (e) {
        console.warn(e);
      } finally {
        console.log('done');
        setState({...state, loading: false});
      }
    }

    loadResourcesAndDataAsync();

    notificationHooks.handleNotification = async function (notification) {
      let requiresHandling = false;
      if (Platform.OS === 'ios') {
        if (
          (notification && notification.userInteraction) ||
          (AppState.currentState === 'active' && notification)
        ) {
          PushNotification.setApplicationIconBadgeNumber(0);
          requiresHandling = true;
          setTimeout(() => {
            notification.finish(
              Platform.OS === 'ios'
                ? PushNotificationIOS.FetchResult.NoData
                : ''
            );
          }, 3000);
        }
      }
      if (requiresHandling) {
        setTimeout(() => setState((s) => ({...s, notification})), 500);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SafeAreaProvider>
      <Base>
        <StatusBar barStyle="default" />
        <SettingsProvider>
          <SettingsContext.Consumer>
            {(settingsValue) => {
              if (!settingsValue.loaded) {
                return <Loading />;
              }
              return (
                <ReminderProvider>
                  <ApplicationProvider
                    user={settingsValue.user}
                    onboarded={settingsValue.onboarded}
                    completedExposureOnboarding={
                      settingsValue.completedExposureOnboarding
                    }>
                    <ExposureApp
                      notification={state.notification}
                      exposureNotificationClicked={
                        state.exposureNotificationClicked
                      }
                      setState={setState}
                    />
                  </ApplicationProvider>
                </ReminderProvider>
              );
            }}
          </SettingsContext.Consumer>
        </SettingsProvider>
      </Base>
    </SafeAreaProvider>
  );
};

export default App;

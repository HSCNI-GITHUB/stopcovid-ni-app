import React, {FC, MutableRefObject, useEffect} from 'react';
import {Platform} from 'react-native';
import {
  NavigationContainer,
  NavigationContainerRef
} from '@react-navigation/native';
import {
  createStackNavigator,
  CardStyleInterpolators
} from '@react-navigation/stack';
import {useTranslation} from 'react-i18next';
import {TFunction} from 'i18next';
import {PushNotification as PN} from 'react-native-push-notification';

import colors from '../../constants/colors';
import {isMountedRef, navigationRef, ScreenNames} from '../../navigation';
import {Onboarding} from '../views/onboarding';
import {AgeConfirmation} from '../views/age-confirmation';
import {LocationConfirmation} from '../views/location-confirmation';
import {Dashboard} from '../views/dashboard';
import {Community} from '../views/community';
import {TestsAdd} from '../views/tests-add';
import {Tracing} from '../views/tracing';
import {About} from '../views/about';
import {Settings} from '../views/settings';
import {CloseContact} from '../views/close-contact';
import {TestsResult} from '../views/tests-result';
import {Terms} from '../views/terms';
import {Usage} from '../views/usage';
import {Leave} from '../views/leave';
import {Tests} from '../views/tests';
import {DataPolicy} from '../views/data-policy';
import {Debug} from '../views/debug';
import {NIState} from 'App';

const Stack = createStackNavigator();

const Screens = (t: TFunction, user: string | null) => {
  const header = () => null;
  return [
    {
      name: ScreenNames.ageConfirmation,
      component: AgeConfirmation,
      options: {
        title: t('viewNames:age'),
        header,
        cardStyle: {
          backgroundColor: colors.teal
        }
      }
    },
    {
      name: ScreenNames.locationConfirmation,
      component: LocationConfirmation,
      options: {
        title: t('viewNames:location'),
        header,
        cardStyle: {
          backgroundColor: colors.teal
        }
      }
    },
    {
      name: ScreenNames.onboarding,
      component: Onboarding,
      options: {
        title: t('viewNames:onboarding'),
        header,
        cardStyle: {}
      }
    },
    {
      name: ScreenNames.dashboard,
      component: Dashboard,
      options: {
        header,
        cardStyle: {backgroundColor: colors.darkerGrey}
      }
    },
    {
      name: ScreenNames.tracing,
      component: Tracing,
      options: {
        header,
        title: t('viewNames:tracing'),
        cardStyle: {backgroundColor: colors.lightGreen},
        cardStyleInterpolator:
          CardStyleInterpolators.forRevealFromBottomAndroid,
        gestureEnabled: true,
        gestureDirection: 'vertical'
      }
    },
    {
      name: ScreenNames.about,
      component: About,
      options: {
        header,
        title: t('viewNames:about'),
        cardStyle: {backgroundColor: colors.cream},
        cardStyleInterpolator:
          CardStyleInterpolators.forRevealFromBottomAndroid,
        gestureEnabled: true,
        gestureDirection: 'vertical'
      }
    },
    {
      name: ScreenNames.community,
      component: Community,
      options: {
        header,
        title: t('viewNames:community'),
        cardStyle: {backgroundColor: colors.blue},
        cardStyleInterpolator:
          CardStyleInterpolators.forRevealFromBottomAndroid,
        gestureEnabled: true,
        gestureDirection: 'vertical'
      }
    },
    {
      name: ScreenNames.tests,
      component: Tests,
      options: {
        header,
        title: t('viewNames:tests'),
        cardStyle: {backgroundColor: colors.lightYellow},
        cardStyleInterpolator:
          CardStyleInterpolators.forRevealFromBottomAndroid,
        gestureEnabled: true,
        gestureDirection: 'vertical'
      }
    },
    {
      name: ScreenNames.testsAdd,
      component: TestsAdd,
      options: {
        header,
        title: t('viewNames:testsAdd'),
        cardStyle: {backgroundColor: colors.lightYellow},
        cardStyleInterpolator:
          CardStyleInterpolators.forRevealFromBottomAndroid,
        gestureEnabled: true,
        gestureDirection: 'vertical'
      }
    },
    {
      name: ScreenNames.testsResult,
      component: TestsResult,
      options: {
        header,
        title: t('viewNames:testsResult'),
        cardStyle: {backgroundColor: colors.darkGreen},
        cardStyleInterpolator:
          CardStyleInterpolators.forRevealFromBottomAndroid,
        gestureEnabled: true,
        gestureDirection: 'vertical'
      }
    },
    {
      name: ScreenNames.settings,
      component: Settings,
      options: {
        header,
        title: t('viewNames:settings'),
        cardStyle: {backgroundColor: colors.black},
        cardStyleInterpolator:
          CardStyleInterpolators.forRevealFromBottomAndroid,
        gestureEnabled: true,
        gestureDirection: 'vertical'
      }
    },
    {
      name: ScreenNames.closeContact,
      component: CloseContact,
      options: {
        header,
        title: t('viewNames:closeContact'),
        cardStyle: {backgroundColor: colors.pink},
        cardStyleInterpolator:
          CardStyleInterpolators.forRevealFromBottomAndroid,
        gestureEnabled: true,
        gestureDirection: 'vertical'
      }
    },
    {
      name: ScreenNames.terms,
      component: Terms,
      options: {
        title: t('viewNames:terms'),
        header,
        cardStyle: {},
        cardStyleInterpolator: user
          ? CardStyleInterpolators.forHorizontalIOS
          : CardStyleInterpolators.forRevealFromBottomAndroid,
        gestureEnabled: true,
        gestureDirection: user ? 'horizontal' : 'vertical'
      }
    },
    {
      name: ScreenNames.dataPolicy,
      component: DataPolicy,
      options: {
        title: t('viewNames:dataPolicy'),
        header,
        cardStyle: {}
      }
    },
    {
      name: ScreenNames.usage,
      component: Usage,
      options: {
        title: t('viewNames:usage'),
        header,
        cardStyle: {}
      }
    },
    {
      name: ScreenNames.leave,
      component: Leave,
      options: {
        title: t('viewNames:leave'),
        header,
        cardStyle: {}
      }
    },
    {
      name: ScreenNames.debug,
      component: Debug,
      options: {
        title: t('viewNames:debug'),
        header,
        cardStyle: {}
      }
    }
  ];
};

interface Navigation {
  user: string | null;
  notification: PN | null;
  exposureNotificationClicked: Boolean | null;
  setState: (value: React.SetStateAction<NIState>) => void;
}

const Navigation: FC<Navigation> = ({
  user,
  notification,
  exposureNotificationClicked,
  setState
}) => {
  const {t} = useTranslation();
  useEffect(() => {
    (isMountedRef as MutableRefObject<boolean>).current = true;
    return () => {
      (isMountedRef as MutableRefObject<boolean>).current = false;
    };
  }, []);

  useEffect(() => {
    if (Platform.OS !== 'ios') {
      return;
    }

    if (navigationRef.current && notification) {
      navigationRef.current.navigate(ScreenNames.closeContact);

      setState((s) => ({...s, notification: null}));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notification]);

  useEffect(() => {
    if (Platform.OS !== 'android') {
      return;
    }

    if (navigationRef.current && exposureNotificationClicked) {
      navigationRef.current.navigate(ScreenNames.closeContact);
      setState((s) => ({...s, exposureNotificationClicked: null}));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exposureNotificationClicked]);

  const initialScreen = user
    ? ScreenNames.dashboard
    : ScreenNames.ageConfirmation;

  return (
    <NavigationContainer
      ref={(e) => {
        (navigationRef as MutableRefObject<NavigationContainerRef | null>).current = e;
      }}>
      <Stack.Navigator
        screenOptions={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          cardStyle: {backgroundColor: 'transparent'},
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          animationEnabled: true
        }}
        initialRouteName={initialScreen}
        headerMode="float">
        {Screens(t, user).map((screen, index) => (
          // @ts-ignore
          <Stack.Screen {...screen} key={`screen-${index}`} />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;

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
import {User} from '../../providers/context';
import {Onboarding} from '../views/onboarding';
import {AgeConfirmation} from '../views/age-confirmation';
import {LocationConfirmation} from '../views/location-confirmation';
import {AgeSorting} from '../views/age-sorting';
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
import {useAgeGroupTranslation, GetTranslation} from '../../hooks';
import {Pause} from '../views/pause';
import {YourDataModal} from '../views/onboarding/your-data-modal';
import {TestResultModal} from '../views/onboarding/test-result-modal';
import {PrivacyModal} from '../views/onboarding/privacy-modal';
import {notificationHooks} from '../../services/notifications';

const Stack = createStackNavigator();

const Screens = (t: TFunction, getTranslation: GetTranslation, user?: User) => {
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
      name: ScreenNames.ageSorting,
      component: AgeSorting,
      options: {
        title: getTranslation('viewNames:ageSorting'),
        header
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
      name: ScreenNames.askPermissions,
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
        cardStyle: {},
        cardStyleInterpolator: user
          ? CardStyleInterpolators.forHorizontalIOS
          : CardStyleInterpolators.forRevealFromBottomAndroid,
        gestureEnabled: true,
        gestureDirection: user ? 'horizontal' : 'vertical'
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
    },
    {
      name: ScreenNames.pause,
      component: Pause,
      options: {
        title: t('viewNames:pause'),
        header,
        cardStyle: {backgroundColor: 'transparent'},
        cardStyleInterpolator:
          Platform.OS === 'ios'
            ? CardStyleInterpolators.forVerticalIOS
            : CardStyleInterpolators.forRevealFromBottomAndroid,
        gestureEnabled: true,
        gestureDirection: 'vertical'
      }
    },
    {
      name: ScreenNames.yourDataModal,
      component: YourDataModal,
      options: {
        title: t('viewNames:yourDataModal'),
        header,
        cardStyle: {backgroundColor: 'transparent'},
        cardStyleInterpolator:
          Platform.OS === 'ios'
            ? CardStyleInterpolators.forVerticalIOS
            : CardStyleInterpolators.forRevealFromBottomAndroid,
        gestureEnabled: true,
        gestureDirection: 'vertical'
      }
    },
    {
      name: ScreenNames.testResultModal,
      component: TestResultModal,
      options: {
        title: t('viewNames:testResultModal'),
        header,
        cardStyle: {backgroundColor: 'transparent'},
        cardStyleInterpolator:
          Platform.OS === 'ios'
            ? CardStyleInterpolators.forVerticalIOS
            : CardStyleInterpolators.forRevealFromBottomAndroid,
        gestureEnabled: true,
        gestureDirection: 'vertical'
      }
    },
    {
      name: ScreenNames.privacyModal,
      component: PrivacyModal,
      options: {
        title: t('viewNames:privacyModal'),
        header,
        cardStyle: {backgroundColor: 'transparent'},
        cardStyleInterpolator:
          Platform.OS === 'ios'
            ? CardStyleInterpolators.forVerticalIOS
            : CardStyleInterpolators.forRevealFromBottomAndroid,
        gestureEnabled: true,
        gestureDirection: 'vertical'
      }
    }
  ];
};

interface Navigation {
  user?: User;
  notification: PN | null;
  exposureNotificationClicked: Boolean | null;
  completedExposureOnboarding: Boolean | null;
  setState: (value: React.SetStateAction<NIState>) => void;
}

const Navigation: FC<Navigation> = ({
  user,
  notification,
  exposureNotificationClicked,
  completedExposureOnboarding,
  setState
}) => {
  const {t} = useTranslation();
  const {getTranslation} = useAgeGroupTranslation();
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

  const initialScreen =
    user?.valid && completedExposureOnboarding
      ? ScreenNames.dashboard
      : user?.valid
      ? ScreenNames.askPermissions
      : ScreenNames.ageConfirmation;

  return (
    <NavigationContainer
      ref={(e) => {
        notificationHooks.navigation = e as NavigationContainerRef;
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
        headerMode="float"
        mode="modal">
        {Screens(t, getTranslation, user).map((screen, index) => (
          // @ts-ignore
          <Stack.Screen {...screen} key={`screen-${index}`} />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;

import React, {FC, useRef, useEffect, useState} from 'react';
import {
  StyleSheet,
  Image,
  ScrollView,
  Text,
  View,
  Animated,
  RefreshControl,
  findNodeHandle,
  AccessibilityInfo
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {
  useNavigation,
  useFocusEffect,
  useIsFocused
} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import {
  useExposure,
  StatusState,
  StatusType,
  Status
} from '@nearform/react-native-exposure-notification-service';
import * as SecureStore from 'expo-secure-store';
import intervalToDuration from 'date-fns/intervalToDuration';

import {text} from '../../theme';
import {Header} from '../molecules/header';
import {Grid} from '../molecules/grid';
import {SymptomCheckerMessage} from '../atoms/symptom-checker';
import Spacing from '../atoms/spacing';
import Markdown from '../atoms/markdown';
import colors from '../../constants/colors';
import {ScreenNames} from '../../navigation';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {useApplication} from '../../providers/context';
import {ArrowLink} from '../molecules/arrow-link';
import {
  ExposureNotificationsModal,
  BluetoothNotificationsModal
} from '../organisms/modals';
import {useSettings} from '../../providers/settings';
import {useAppState} from '../../hooks/app-state';

const ArrowIcon = require('../../assets/images/icon-arrow-white/image.png');

const ANIMATION_DURATION = 300;
const PROMPT_OFFSET = 1000;

const getMessage = ({
  onboarded,
  enabled,
  status,
  messages,
  stage
}: {
  onboarded: boolean;
  enabled: Boolean;
  status: Status;
  messages: string[];
  stage: number;
}): string => {
  if (onboarded) {
    if (enabled && status.state === StatusState.active) {
      return 'dashboard:message:standard';
    }
    return 'dashboard:message:inactive';
  } else {
    if (stage < 1) {
      if (enabled && status.state === StatusState.active) {
        return messages[0];
      }
      return 'dashboard:alternateTourStart';
    } else {
      return messages[stage];
    }
  }
};

export const Dashboard: FC = () => {
  const {t} = useTranslation();
  const {enabled, status, contacts, readPermissions} = useExposure();
  const [appState] = useAppState();
  const navigation = useNavigation();
  const {
    onboarded,
    setContext,
    loadAppData,
    accessibility: {screenReaderEnabled}
  } = useApplication();
  const {isolationDuration, isolationCompleteDuration} = useSettings();
  const [refreshing, setRefreshing] = useState(false);
  const focusStart = useRef<any>();
  const isFocused = useIsFocused();

  const messageOpacity = useRef(new Animated.Value(0)).current;
  const contentOpacity = useRef(new Animated.Value(0)).current;
  const gridOpacity = useRef(new Animated.Value(0)).current;
  const exposureEnabled = useRef(enabled);
  const bluetoothDisabled = useRef(
    status.state === 'disabled' && status.type?.includes(StatusType.bluetooth)
  );

  const [state, setState] = useState<{
    stage: number;
    exposurePrompt: boolean;
    bluetoothPrompt: boolean;
    disabled: boolean;
    current: string;
    isolationMessage: string | null;
    isolationComplete: boolean;
    default: string;
    messages: string[];
  }>({
    stage: onboarded ? -1 : 0,
    exposurePrompt: false,
    bluetoothPrompt: false,
    disabled: false,
    current: t(
      getMessage({
        onboarded,
        enabled,
        status,
        messages: t('dashboard:tour', {returnObjects: true}),
        stage: onboarded ? -1 : 0
      })
    ),
    isolationMessage: null,
    isolationComplete: false,
    messages: t('dashboard:tour', {returnObjects: true}),
    default: t('dashboard:message:standard')
  });

  const processContactsForMessaging = async () => {
    try {
      const currentStatus = await SecureStore.getItemAsync('niexposuredate');
      if (currentStatus) {
        const duration = intervalToDuration({
          start: new Date(Number(currentStatus)),
          end: new Date()
        });

        const withIsolation = isolationDuration + isolationCompleteDuration;

        if (duration.days && duration.days > withIsolation) {
          await SecureStore.deleteItemAsync('niexposuredate');
          return setState((s) => ({
            ...s,
            isolationComplete: false,
            isolationMessage: null
          }));
        }

        if (duration.days && duration.days === withIsolation) {
          return setState((s) => ({
            ...s,
            isolationComplete: true,
            isolationMessage: t('dashboard:isolationComplete')
          }));
        }

        if (contacts && contacts.length > 0) {
          return setState((s) => ({
            ...s,
            isolationComplete: false,
            isolationMessage: t('dashboard:exposed')
          }));
        }
      }

      if (!contacts || contacts.length === 0) {
        return;
      }

      const latestExposure = new Date(
        Math.max.apply(
          null,
          contacts.map((e) => {
            return (new Date(Number(e.exposureAlertDate)) as unknown) as number;
          })
        )
      );

      if (latestExposure) {
        await SecureStore.setItemAsync(
          'niexposuredate',
          String(latestExposure.getTime())
        );

        setState((s) => ({
          ...s,
          isolationComplete: false,
          isolationMessage: t('dashboard:exposed')
        }));
      } else {
        setState((s) => ({
          ...s,
          isolationComplete: false,
          isolationMessage: null
        }));
      }
    } catch (err) {
      await SecureStore.deleteItemAsync('niexposuredate');
      console.log('processContactsForMessaging', err);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadAppData().then(() => setRefreshing(false));
  };

  useEffect(() => {
    onRefresh();
    processContactsForMessaging();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    processContactsForMessaging();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contacts, status]);

  const onboardedAnimation = () => {
    const parallel = [
      Animated.timing(gridOpacity, {
        toValue: 1,
        duration: ANIMATION_DURATION,
        useNativeDriver: true
      }),
      Animated.timing(contentOpacity, {
        toValue: 1,
        duration: ANIMATION_DURATION,
        useNativeDriver: true
      })
    ];

    Animated.sequence([
      Animated.timing(messageOpacity, {
        toValue: 1,
        duration: ANIMATION_DURATION,
        useNativeDriver: true
      }),
      Animated.parallel(parallel)
    ]).start();
  };

  useFocusEffect(
    React.useCallback(() => {
      if (!isFocused || appState !== 'active') {
        return;
      }

      readPermissions();
    }, [isFocused, appState, readPermissions])
  );

  useEffect(() => {
    if (onboarded) {
      setTimeout(() => onboardedAnimation(), 200);
    } else {
      setTimeout(() => animateTiles(0), 200);
    }
    if (screenReaderEnabled && focusStart.current) {
      const tag = findNodeHandle(focusStart.current);
      if (tag) {
        setTimeout(() => AccessibilityInfo.setAccessibilityFocus(tag), 250);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setState((s) => ({
      ...s,
      current: t(
        getMessage({
          onboarded,
          enabled,
          status,
          messages: state.messages,
          stage: state.stage
        })
      )
    }));

    exposureEnabled.current = enabled;
    bluetoothDisabled.current =
      status.state === 'disabled' &&
      status.type?.includes(StatusType.bluetooth);

    if (!exposureEnabled.current && onboarded) {
      setTimeout(() => {
        if (!exposureEnabled.current) {
          setState((s) => ({
            ...s,
            exposurePrompt: true
          }));
        }
      }, PROMPT_OFFSET);
    } else if (bluetoothDisabled.current && onboarded) {
      setTimeout(() => {
        if (bluetoothDisabled.current) {
          setState((s) => ({
            ...s,
            bluetoothPrompt: true
          }));
        }
      }, PROMPT_OFFSET);
    } else if (onboarded && exposureEnabled.current) {
      setState((s) => ({
        ...s,
        exposurePrompt: false
      }));
    }

    setTimeout(() => processContactsForMessaging(), 100);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, onboarded, status]);

  useFocusEffect(() => {
    if (screenReaderEnabled && isFocused && focusStart.current) {
      const tag = findNodeHandle(focusStart.current);
      if (tag) {
        setTimeout(() => AccessibilityInfo.setAccessibilityFocus(tag), 200);
      }
    }
  });

  const animateTiles = (stage: number) => {
    if (stage > -1) {
      Animated.parallel([
        Animated.timing(messageOpacity, {
          toValue: 1,
          duration: ANIMATION_DURATION,
          useNativeDriver: true
        }),
        Animated.timing(gridOpacity, {
          toValue: 1,
          duration: ANIMATION_DURATION,
          useNativeDriver: true
        })
      ]).start(() => {
        setState((s) => ({...s, disabled: false}));
      });
    } else {
      Animated.parallel([
        Animated.timing(messageOpacity, {
          toValue: 1,
          duration: ANIMATION_DURATION,
          useNativeDriver: true
        }),
        Animated.timing(contentOpacity, {
          toValue: 1,
          duration: ANIMATION_DURATION,
          useNativeDriver: true
        }),
        Animated.timing(gridOpacity, {
          toValue: 1,
          duration: ANIMATION_DURATION,
          useNativeDriver: true
        })
      ]).start(() => {
        AsyncStorage.setItem('ni.onboarded', 'true');
      });
    }
  };

  const handleTour = (stage: number) => {
    setState((s) => ({...s, disabled: true}));
    Animated.parallel([
      Animated.timing(messageOpacity, {
        toValue: 0,
        duration: ANIMATION_DURATION,
        useNativeDriver: true
      }),
      Animated.timing(gridOpacity, {
        toValue: 0,
        duration: ANIMATION_DURATION,
        useNativeDriver: true
      })
    ]).start(() => {
      if (stage < state.messages.length - 1) {
        setState((s) => ({
          ...s,
          stage: stage + 1,
          current: getMessage({
            onboarded,
            enabled,
            status,
            messages: state.messages,
            stage: stage + 1
          })
        }));
        setTimeout(() => {
          animateTiles(stage + 1);
          if (screenReaderEnabled && isFocused && focusStart.current) {
            const tag = findNodeHandle(focusStart.current);
            if (tag) {
              setTimeout(
                () => AccessibilityInfo.setAccessibilityFocus(tag),
                200
              );
            }
          }
        }, 100);
      } else {
        setState((s) => ({
          ...s,
          stage: -1,
          current: s.default
        }));
        setContext({onboarded: true});
        setTimeout(() => {
          animateTiles(-1);
          if (screenReaderEnabled && isFocused && focusStart.current) {
            const tag = findNodeHandle(focusStart.current);
            if (tag) {
              setTimeout(
                () => AccessibilityInfo.setAccessibilityFocus(tag),
                200
              );
            }
          }
        }, 100);
      }
    });
  };

  return (
    <>
      <Header />
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={onboarded && refreshing}
            onRefresh={onRefresh}
          />
        }>
        <Spacing s={65} />
        {!onboarded && state.stage > -1 && (
          <>
            <View style={styles.dots}>
              <Animated.View
                style={[
                  styles.dot,
                  {
                    backgroundColor:
                      state.stage > -1 ? colors.white : colors.black
                  }
                ]}
              />
              <Animated.View
                style={[
                  styles.dot,
                  {
                    backgroundColor:
                      state.stage > 0 ? colors.white : colors.black
                  }
                ]}
              />
              <Animated.View
                style={[
                  styles.dot,
                  {
                    backgroundColor:
                      state.stage > 1 ? colors.white : colors.black
                  }
                ]}
              />
              <Animated.View
                style={[
                  styles.dot,
                  {
                    backgroundColor:
                      state.stage > 2 ? colors.white : colors.black
                  }
                ]}
              />
            </View>
            <Animated.View ref={focusStart} style={{opacity: messageOpacity}}>
              <TouchableWithoutFeedback onPress={() => handleTour(state.stage)}>
                <Markdown markdownStyles={tourStyles}>{state.current}</Markdown>
              </TouchableWithoutFeedback>
              <ArrowLink
                onPress={() => {
                  if (!state.disabled) {
                    handleTour(state.stage);
                  }
                }}
                accessibilityLabel={t('dashboard:tourAction')}
                accessibilityHint={t('dashboard:tourAction')}
                // @ts-ignore
                textStyle={styles.nextLinkText}
                containerStyle={styles.nextLink}
                invert
              />
            </Animated.View>
          </>
        )}
        {onboarded && state.isolationMessage && (
          <>
            <Animated.View
              ref={focusStart}
              style={{
                opacity: messageOpacity
              }}>
              <Markdown markdownStyles={tourStyles}>
                {state.isolationMessage}
              </Markdown>
              {!state.isolationComplete && (
                <>
                  <Spacing s={20} />
                  <TouchableWithoutFeedback
                    onPress={() =>
                      navigation.navigate(ScreenNames.closeContact)
                    }
                    accessibilityHint={t('common:readMore')}
                    accessibilityLabel={t('common:readMore')}>
                    <View style={styles.linkContainer}>
                      <Text style={styles.button}>{t('common:readMore')}</Text>
                      <Image
                        source={ArrowIcon}
                        accessibilityIgnoresInvertColors={false}
                      />
                    </View>
                  </TouchableWithoutFeedback>
                  <Spacing s={20} />
                </>
              )}
              {state.isolationComplete && (
                <>
                  <Spacing s={20} />
                  <Text style={styles.supplemental}>
                    {t('dashboard:isolationCompleteSupplemental')}
                  </Text>
                </>
              )}
            </Animated.View>
            <Spacing s={45} />
            <Animated.View style={{opacity: contentOpacity}}>
              <SymptomCheckerMessage />
            </Animated.View>
          </>
        )}

        {onboarded && !state.isolationMessage && (
          <Animated.View ref={focusStart} style={{opacity: messageOpacity}}>
            <Markdown markdownStyles={tourStyles}>{state.current}</Markdown>
            {state.stage === -1 && (
              <>
                <Spacing s={20} />
                <Text style={styles.supplemental}>
                  {t('dashboard:message:bluetooth')}
                </Text>
              </>
            )}
          </Animated.View>
        )}
        <Spacing s={state.isolationMessage ? 15 : 50} />
        <Grid
          onboarded={onboarded}
          stage={state.stage}
          opacity={gridOpacity}
          onboardingCallback={() => handleTour(state.stage)}
        />
        {state.isolationMessage && <Spacing s={34} />}
        {onboarded && !state.isolationMessage && (
          <Animated.View style={{opacity: contentOpacity}}>
            <Spacing s={15} />
            <SymptomCheckerMessage />
            <Spacing s={45} />
          </Animated.View>
        )}
        {onboarded && (
          <Text style={[styles.supplemental, styles.thanks]}>
            {t('dashboard:thanks')}
          </Text>
        )}
        <Spacing s={60} />
      </ScrollView>
      {state.exposurePrompt && (
        <ExposureNotificationsModal
          isVisible={state.exposurePrompt}
          onBackdropPress={() =>
            setState((s) => ({...s, exposurePrompt: false}))
          }
          onClose={() => setState((s) => ({...s, exposurePrompt: false}))}
        />
      )}
      {state.bluetoothPrompt && (
        <BluetoothNotificationsModal
          isVisible={state.bluetoothPrompt}
          onBackdropPress={() =>
            setState((s) => ({...s, bluetoothPrompt: false}))
          }
          onClose={() => setState((s) => ({...s, bluetoothPrompt: false}))}
        />
      )}
    </>
  );
};

const tourStyles = StyleSheet.create({
  block: {
    paddingLeft: 45,
    paddingRight: 45
  },
  text: {
    fontWeight: '300',
    ...text.large,
    paddingLeft: 45,
    paddingRight: 45
  },
  // @ts-ignore
  strong: {
    ...text.defaultBold
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  message: {
    fontWeight: '300',
    ...text.large,
    paddingLeft: 45,
    paddingRight: 45
  },
  markdownContainer: {
    paddingLeft: 45,
    paddingRight: 45
  },
  button: {
    textAlign: 'left',
    justifyContent: 'flex-start',
    color: colors.white,
    marginRight: 10,
    fontWeight: 'bold'
  },
  linkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    paddingLeft: 45,
    paddingRight: 45
  },
  supplemental: {
    ...text.default,
    color: colors.white,
    paddingLeft: 45,
    paddingRight: 45
  },
  nextLinkText: {
    ...text.defaultBold,
    color: colors.white,
    fontSize: 15,
    lineHeight: 30,
    paddingLeft: 45,
    paddingRight: 45
  },
  thanks: {
    textAlign: 'center'
  },
  dots: {
    flexDirection: 'row',
    marginBottom: 30,
    paddingLeft: 46,
    paddingRight: 45
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 5,
    backgroundColor: colors.black,
    marginRight: 10
  },
  nextLink: {
    marginTop: 30
  }
});

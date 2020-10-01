import React, {FC, useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {StackNavigationProp} from '@react-navigation/stack';
import {
  Alert,
  Animated,
  Dimensions,
  ScrollView,
  StyleSheet
} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import Spinner from 'react-native-loading-spinner-overlay';
import {useExposure} from 'react-native-exposure-notification-service';

import Layouts from '../../../theme/layouts';
import WhyUse from './why-use';
import YourData from './your-data';
import PermissionsInfo from './permissions-info';
import PrivacyInfo from './privacy';
import UpgradeNotice from './upgrade-notice';
import {register} from '../../../services/api';
import {useApplication} from '../../../providers/context';
import colors from '../../../constants/colors';
import TermsNotice from './terms-notice';
import TermsAgreement from './terms-agreement';
import TestResult from './test-result';

enum OnboardingStatus {
  'whyUse' = 1,
  'yourData' = 2,
  'testResult' = 3,
  'privacy' = 4,
  'termsNotice' = 5,
  'termsAgreement' = 6,
  'permissionsInfo' = 7,
  'upgradeNotice' = 7.1
}

const onboardingBackgrounds: {[key in OnboardingStatus]?: string} = {
  [OnboardingStatus.whyUse]: colors.teal,
  [OnboardingStatus.yourData]: colors.pastelRed,
  [OnboardingStatus.testResult]: colors.pastelGreen,
  [OnboardingStatus.privacy]: colors.pastelYellow
};

interface State {
  page: OnboardingStatus;
  slideInX: Animated.Value;
  error: string | null;
  loading: boolean;
}

interface OnboardingProps {
  navigation: StackNavigationProp<any>;
}

const width = Dimensions.get('window').width;
const ANIMATION_DURATION = 200;

enum RegistrationError {
  'INVALID' = 'Invalid verification',
  'TIMESTAMP' = 'Invalid timestamp'
}

export const Onboarding: FC<OnboardingProps> = ({navigation}) => {
  const {t} = useTranslation();
  const exposure = useExposure();
  const app = useApplication();
  const [status, setStatus] = useState<State>({
    page: 1,
    slideInX: new Animated.Value(width),
    error: null,
    loading: false
  });
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    Animated.timing(status.slideInX, {
      toValue: 0,
      duration: ANIMATION_DURATION,
      useNativeDriver: true
    }).start();
  }, [status]);

  const handleNext = () => {
    setStatus((s) => ({
      ...s,
      page: status.page + 1,
      slideInX: new Animated.Value(width)
    }));
    scrollViewRef.current?.scrollTo({x: 0, y: 0, animated: false});
  };

  const registerAndProceed = async () => {
    try {
      setStatus((s) => ({...s, loading: true}));
      const {token, refreshToken} = await register();
      await SecureStore.setItemAsync('token', token);
      await SecureStore.setItemAsync('refreshToken', refreshToken, {});
      await app.setContext({
        user: {
          new: true,
          valid: true
        }
      });

      const nextPage = exposure.supported
        ? OnboardingStatus.permissionsInfo
        : OnboardingStatus.upgradeNotice;

      setStatus((s) => ({
        ...s,
        page: nextPage,
        slideInX: new Animated.Value(width),
        loading: false
      }));
      scrollViewRef.current?.scrollTo({x: 0, y: 0, animated: false});
    } catch (err) {
      console.log('Error registering device: ', err, err.message);
      let title = t('common:tryAgain:title');
      let message = t('common:tryAgain:description');
      try {
        const response = JSON.parse(await err.text());
        console.log(response);
        if (RegistrationError.TIMESTAMP === response.message) {
          title = t('common:tryAgain:timestampTitle');
          message = t('common:tryAgain:timestamp');
        }
      } catch (e) {
        console.log('Error processing response');
      }

      Alert.alert(title, message, [
        {
          text: t('common:ok:label'),
          style: 'default',
          onPress: () =>
            setStatus((s) => ({
              ...s,
              loading: false
            }))
        }
      ]);
    }
  };

  const goBack = () => {
    setStatus((s) => ({
      ...s,
      page: Math.round(status.page - 1),
      slideInX: new Animated.Value(-width)
    }));

    scrollViewRef.current?.scrollTo({x: 0, y: 0, animated: false});
  };

  const hideProgress = [
    OnboardingStatus.permissionsInfo,
    OnboardingStatus.upgradeNotice
  ].includes(status.page);

  return (
    <Layouts.OnboardingWithNavbar
      canGoBack={
        ![
          OnboardingStatus.termsAgreement,
          OnboardingStatus.permissionsInfo,
          OnboardingStatus.upgradeNotice
        ].includes(status.page)
      }
      goBack={
        status.page === OnboardingStatus.whyUse ? navigation.goBack : goBack
      }
      hideProgress={hideProgress}
      backgroundColor={onboardingBackgrounds[status.page]}
      activeSection={Math.round(status.page)}
      scrollViewRef={scrollViewRef}
      darkNavbar={status.page === OnboardingStatus.privacy}>
      <Animated.View
        style={[
          styles.animatedView,
          {transform: [{translateX: status.slideInX}]},
          {minHeight: Dimensions.get('window').height - 190}
        ]}>
        {status.page === OnboardingStatus.whyUse && (
          <WhyUse handleNext={handleNext} />
        )}
        {status.page === OnboardingStatus.yourData && (
          <YourData handleNext={handleNext} navigation={navigation} />
        )}
        {status.page === OnboardingStatus.testResult && (
          <TestResult handleNext={handleNext} navigation={navigation} />
        )}
        {status.page === OnboardingStatus.privacy && (
          <PrivacyInfo handleNext={handleNext} navigation={navigation} />
        )}
        {status.page === OnboardingStatus.termsNotice && (
          <TermsNotice handleNext={handleNext} navigation={navigation} />
        )}
        {status.page === OnboardingStatus.termsAgreement && (
          <TermsAgreement
            disabled={status.loading}
            handleNext={registerAndProceed}
          />
        )}
        {status.page === OnboardingStatus.permissionsInfo && (
          <PermissionsInfo navigation={navigation} />
        )}
        {status.page === OnboardingStatus.upgradeNotice && <UpgradeNotice />}
      </Animated.View>
      {status.loading && (
        <Spinner animation="fade" visible overlayColor={'rgba(0, 0, 0, 0.5)'} />
      )}
    </Layouts.OnboardingWithNavbar>
  );
};

const styles = StyleSheet.create({
  animatedView: {flex: 1}
});

import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Image,
  Platform,
  ScrollView
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import {useExposure} from '@nearform/react-native-exposure-notification-service';
import * as SecureStore from 'expo-secure-store';

import {ModalHeader} from '../molecules/modal-header';

import colors from '../../constants/colors';
import {ScreenNames} from '../../navigation';
import {text} from '../../theme';
import Button from '../atoms/button';
import {ClearContactsModal} from '../atoms/modal/clear-contacts';
import Spacing from '../atoms/spacing';
import {SPACING_BOTTOM} from '../../theme/layouts/shared';
import {useSafeArea} from 'react-native-safe-area-context';
import {HIDE_DEBUG, BUILD_VERSION} from '@env';

const ArrowIcon = require('../../assets/images/icon-arrow-white/image.png');
const SettingsIcon = require('../../assets/images/icon-settings-white/image.png');

const REQUIRED_PRESS_COUNT = 3;

const mockCloseContact = {
  exposureAlertDate: '1595520188294',
  attenuationDurations: [1, 1, 1],
  daysSinceLastExposure: 1,
  matchedKeyCount: 1,
  maxRiskScore: 1,
  summationRiskScore: 1
};

export const Settings = () => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const [clear, setClear] = useState(false);
  const {contacts, setExposureState} = useExposure();
  const insets = useSafeArea();
  const [showDebug, setShowDebug] = useState<boolean>(false);
  const [pressCount, setPressCount] = useState<number>(0);

  const headingPressHandler = async () => {
    if (HIDE_DEBUG === 'y') {
      return
    }
    setPressCount(pressCount + 1);
    if (!showDebug && pressCount + 1 >= REQUIRED_PRESS_COUNT) {
      await AsyncStorage.setItem('cti.showDebug', 'y');
      setShowDebug(true);
    }
  };

  const simCloseContacts = async (remove = false) => {
    if (remove) {
      await SecureStore.deleteItemAsync('niexposuredate');
    }

    setExposureState((s) => ({
      ...s,
      contacts: remove
        ? []
        : [mockCloseContact, mockCloseContact, mockCloseContact]
    }));
  };

  useEffect(() => {
    const init = async () => {
      try {
        const showDebugData = await AsyncStorage.getItem('cti.showDebug');
        if (showDebugData) {
          setShowDebug(showDebugData === 'y');
        }
      } catch (err) {
        console.log('Error reading "cti.showDebug" from async storage:', err);
      }
    };
    init();
  }, []);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[
        styles.contentContainer,
        {paddingBottom: insets.bottom + SPACING_BOTTOM}
      ]}>
      <ModalHeader
        heading="settings:title"
        color={colors.white}
        icon={SettingsIcon}
        action={headingPressHandler}
      />
      <View style={styles.content}>
        <View style={styles.button}>
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate(ScreenNames.terms)}
            accessibilityRole="link"
            accessibilityHint={t('settings:terms:hint')}
            accessibilityLabel={t('settings:terms:label')}>
            <View style={styles.linkContainer}>
              <Text style={styles.button}>{t('settings:terms:label')}</Text>
              <Image
                source={ArrowIcon}
                accessibilityIgnoresInvertColors={false}
              />
            </View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback
            onPress={() => navigation.navigate(ScreenNames.dataPolicy)}
            accessibilityRole="link"
            accessibilityHint={t('settings:data:hint')}
            accessibilityLabel={t('settings:data:label')}>
            <View style={styles.linkContainer}>
              <Text style={styles.button}>{t('settings:data:label')}</Text>
              <Image
                source={ArrowIcon}
                accessibilityIgnoresInvertColors={false}
              />
            </View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback
            onPress={() => navigation.navigate(ScreenNames.leave)}
            accessibilityRole="link"
            accessibilityHint={t('settings:leave:hint')}
            accessibilityLabel={t('settings:leave:label')}>
            <View style={styles.linkContainer}>
              <Text style={styles.button}>{t('settings:leave:label')}</Text>
              <Image
                source={ArrowIcon}
                accessibilityIgnoresInvertColors={false}
              />
            </View>
          </TouchableWithoutFeedback>

          {showDebug && (
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate(ScreenNames.debug)}
              accessibilityRole="link"
              accessibilityHint={t('settings:debug:hint')}
              accessibilityLabel={t('settings:debug:label')}>
              <View style={styles.linkContainer}>
                <Text style={styles.button}>{t('settings:debug:label')}</Text>
                <Image
                  source={ArrowIcon}
                  accessibilityIgnoresInvertColors={false}
                />
              </View>
            </TouchableWithoutFeedback>
          )}

          {showDebug && (
            <TouchableWithoutFeedback
              onPress={() => simCloseContacts(false)}
              accessibilityRole="link"
              accessibilityHint={t('settings:sim:hint')}
              accessibilityLabel={t('settings:sim:label')}>
              <View style={styles.linkContainer}>
                <Text style={styles.button}>{t('settings:sim:label')}</Text>
                <Image
                  source={ArrowIcon}
                  accessibilityIgnoresInvertColors={false}
                />
              </View>
            </TouchableWithoutFeedback>
          )}
        </View>

        {contacts && contacts.length > 0 && (
          <View style={styles.clear}>
            <Text style={styles.clearMessage}>
              {t('settings:clearData:message')}
            </Text>
            <Button
              label={t('settings:clearData:action:label')}
              hint={t('settings:clearData:action:hint')}
              onPress={() => {
                setClear(true);
              }}>
              {t('settings:clearData:action:label')}
            </Button>
          </View>
        )}
      </View>
      {clear && (
        <ClearContactsModal
          onClose={() => setClear(false)}
          onBackButtonPress={() => setClear(false)}
        />
      )}
      {BUILD_VERSION && (
        <>
          <Spacing s={24} />
          <Text
            style={styles.version}
            accessibilityHint={t('common:version', {version: BUILD_VERSION})}>
            App version: {BUILD_VERSION}
          </Text>
        </>
      )}
      <Spacing s={50} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    flex: 1,
    marginTop: 65
  },
  contentContainer: {
    flexGrow: 1,
    paddingTop: Platform.OS === 'ios' ? 65 : 30,
    paddingLeft: 45,
    paddingRight: 45
  },
  linkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 30
  },
  button: {
    ...text.medium,
    textAlign: 'left',
    justifyContent: 'flex-start',
    color: colors.white,
    marginRight: 10
  },
  buttons: {
    flex: 1,
    marginBottom: 30
  },
  clear: {
    flex: 0,
    marginTop: 60
  },
  clearMessage: {
    ...text.default,
    color: colors.white,
    textAlign: 'center',
    marginBottom: 20
  },
  version: {
    ...text.default,
    color: colors.white,
    textAlign: 'center',
    marginBottom: 20
  }
});

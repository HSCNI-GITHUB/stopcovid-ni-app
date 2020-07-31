import React, {FC} from 'react';
import {Linking, Platform} from 'react-native';
import * as IntentLauncher from 'expo-intent-launcher';
import {
  useExposure,
  StatusState,
  StatusType
} from '@nearform/react-native-exposure-notification-service';

import Button from '../atoms/button';
import {useTranslation} from 'react-i18next';

export const goToSettingsAction = async (
  bluetoothDisabled?: boolean,
  askPermissions?: () => Promise<void>,
  exposureOff?: boolean
) => {
  try {
    if (Platform.OS === 'ios') {
      if (exposureOff) {
        Linking.openURL('app-settings:');
      } else {
        Linking.openURL('App-Prefs:');
      }
    } else {
      bluetoothDisabled
        ? await IntentLauncher.startActivityAsync(
            IntentLauncher.ACTION_SETTINGS
          )
        : await askPermissions!();
    }
  } catch (err) {
    console.log('Error handling go to settings', err);
  }
};

const GoToSettings: FC = () => {
  const {t} = useTranslation();
  const {status, askPermissions} = useExposure();
  const platform = Platform.OS === 'ios' ? 'ios' : 'android';

  const bluetoothDisabled =
    status.state === 'disabled' && status.type?.includes(StatusType.bluetooth);

  const ensUnknown = status.state === StatusState.unknown;
  const ensDisabled = status.state === StatusState.disabled;

  const type = status.type || [];
  const exposureOff = type.includes(StatusType.exposure);

  return (
    <Button
      type="inverted"
      onPress={async () =>
        ensUnknown
          ? await askPermissions()
          : goToSettingsAction(bluetoothDisabled, askPermissions, exposureOff)
      }
      label={
        ensUnknown
          ? t('common:turnOnBtnLabel')
          : ensDisabled
          ? t('common:turnOnBtnLabel')
          : platform === 'android'
          ? t('common:turnOnBtnLabel')
          : t('common:goToSettings')
      }
      hint={
        ensUnknown
          ? t('common:turnOnBtnHint')
          : ensDisabled
          ? t('common:turnOnBtnHint')
          : platform === 'android'
          ? t('common:turnOnBtnHint')
          : t('common:goToSettingsHint')
      }>
      {ensUnknown
        ? t('common:turnOnBtnLabel')
        : ensDisabled
        ? t('common:turnOnBtnLabel')
        : platform === 'android'
        ? t('common:turnOnBtnLabel')
        : t('common:goToSettings')}
    </Button>
  );
};

export default GoToSettings;

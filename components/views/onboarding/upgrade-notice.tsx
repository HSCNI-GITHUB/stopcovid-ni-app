import React, {FC} from 'react';
import {Text, StyleSheet, View, Linking, Platform} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useExposure} from '@nearform/react-native-exposure-notification-service';

import Button from '../../atoms/button';
import {text} from '../../../theme';
import Spacing from '../../atoms/spacing';

interface UpgradeNoticeProps {}

const UpgradeNotice: FC<UpgradeNoticeProps> = () => {
  const {t} = useTranslation();
  const exposure = useExposure();

  const platform = Platform.OS === 'ios' ? 'ios' : 'android';

  const checkForUpgradeHandler = async () => {
    try {
      if (Platform.OS === 'ios') {
        Linking.openURL('App-Prefs:');
      } else {
        await exposure.triggerUpdate();
        await exposure.supportsExposureApi();
      }
    } catch (err) {
      console.log('Error handling check for upgrade', err);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.moreText}>
          {t(`onboarding:upgradeNotice:${platform}:text1`)}
        </Text>
        <Spacing s={24} />
        <Text style={[styles.moreText, styles.bold]}>
          {t('onboarding:upgradeNotice:text2')}
        </Text>
        <Spacing s={24} />
      </View>
      <View>
        <Button
          type="default"
          onPress={checkForUpgradeHandler}
          hint={t(
            `onboarding:upgradeNotice:accessibility:${platform}:upgradeHint`
          )}
          label={t(`onboarding:upgradeNotice:${platform}:btnLabel`)}>
          {t(`onboarding:upgradeNotice:${platform}:btnLabel`)}
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flexGrow: 1},
  top: {flex: 1},
  viewText: {
    ...text.medium
  },
  moreText: {
    ...text.small
  },
  bold: {
    fontWeight: 'bold'
  }
});

export default UpgradeNotice;

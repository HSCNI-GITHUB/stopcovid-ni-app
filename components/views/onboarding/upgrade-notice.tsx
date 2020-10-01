import React, {FC} from 'react';
import {Text, StyleSheet, View, Linking, Platform} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useExposure} from 'react-native-exposure-notification-service';

import Button from '../../atoms/button';
import {text, scale} from '../../../theme';
import Spacing from '../../atoms/spacing';
import {Content} from './common';

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
      <Content>
        <Text style={styles.title}>
          {t(`onboarding:upgradeNotice:${platform}:title`)}
        </Text>
        <Spacing s={24} />
        <Text style={styles.moreText}>
          {t(`onboarding:upgradeNotice:${platform}:text1`)}
        </Text>
        <Spacing s={24} />
        <Text style={[styles.moreText, styles.bold]}>
          {t('onboarding:upgradeNotice:text2')}
        </Text>
        <Spacing s={36} />
        <Button
          variant="small"
          onPress={checkForUpgradeHandler}
          hint={t(
            `onboarding:upgradeNotice:accessibility:${platform}:upgradeHint`
          )}
          label={t(`onboarding:upgradeNotice:${platform}:btnLabel`)}>
          {t(`onboarding:upgradeNotice:${platform}:btnLabel`)}
        </Button>
      </Content>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, paddingTop: 160},
  title: {
    ...text.mediumBold,
    fontSize: scale(25)
  },
  viewText: {
    ...text.medium
  },
  moreText: {
    ...text.small
  },
  bold: {
    ...text.defaultBold
  }
});

export default UpgradeNotice;

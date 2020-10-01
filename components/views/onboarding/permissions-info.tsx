import React, {useState} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {StackNavigationProp} from '@react-navigation/stack';
import {useExposure} from 'react-native-exposure-notification-service';

import Button from '../../atoms/button';
import Spacing from '../../atoms/spacing';
import Illustration from '../../atoms/illustration';
import {text, scale} from '../../../theme';
import {ScreenNames} from '../../../navigation';
import {useSettings} from '../../../providers/settings';
import {useApplication} from '../../../providers/context';
import * as SecureStore from 'expo-secure-store';
import {Content} from './common';
import {Title} from '../../atoms/title';

const IllustrationSource = require('../../../assets/images/permissions-info-illustration/image.png');

interface PermissionInfoProps {
  navigation: StackNavigationProp<any>;
}

const PermissionsInfo: React.FC<PermissionInfoProps> = ({navigation}) => {
  const {t} = useTranslation();
  const {reload} = useSettings();
  const [disabled, setDisabled] = useState(false);
  const {askPermissions} = useExposure();
  const application = useApplication();

  const handlePermissions = async () => {
    setDisabled(true);
    SecureStore.setItemAsync('analyticsConsent', String(true), {});
    try {
      await askPermissions();
      reload();
      await application.setContext({completedExposureOnboarding: true});

      setTimeout(
        () =>
          navigation.reset({
            routes: [{name: ScreenNames.dashboard}]
          }),
        1000
      );
    } catch (e) {
      setDisabled(false);
      console.log("Error opening app's settings", e);
    }
  };

  return (
    <View style={styles.container}>
      <Spacing s={60} />
      <Illustration
        source={IllustrationSource}
        accessibilityHint={t(
          'onboarding:permissionsInfo:accessibility:illustrationAlt'
        )}
      />
      <Content>
        <Title
          style={styles.title}
          title="onboarding:permissionsInfo:view:title"
        />
        <Spacing s={28} />
        <Text style={styles.viewText}>
          {t('onboarding:permissionsInfo:view:item1')}
        </Text>
        <Spacing s={28} />
        <Text style={[styles.viewText, styles.bold]}>
          {t('onboarding:permissionsInfo:view:item2')}
        </Text>
        <Spacing s={56} />
        <Button
          variant="small"
          disabled={disabled}
          onPress={handlePermissions}
          hint={t('onboarding:permissionsInfo:accessibility:nextHint')}
          label={t('onboarding:permissionsInfo:accessibility:nextLabel')}>
          {t('common:next:label')}
        </Button>
      </Content>
      <Spacing s={20} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  center: {alignItems: 'center'},
  title: {
    ...text.mediumBold,
    fontSize: scale(25)
  },
  viewText: {
    ...text.small
  },
  // @ts-ignore
  bold: {
    ...text.smallBold
  }
});

export default PermissionsInfo;

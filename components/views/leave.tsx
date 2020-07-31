import React, {FC} from 'react';
import {
  StyleSheet,
  ScrollView,
  Alert,
  Platform,
  Dimensions
} from 'react-native';
import {useTranslation} from 'react-i18next';
import * as Haptics from 'expo-haptics';
import {useNavigation} from '@react-navigation/native';
import {useExposure} from '@nearform/react-native-exposure-notification-service';

import Markdown from '../atoms/markdown';
import colors from '../../constants/colors';
import {text} from '../../theme';
import {Title} from '../atoms/title';
import {Back} from '../atoms/back';
import Button from '../atoms/button';
import {useApplication} from '../../providers/context';
import {forget} from '../../services/api';
import {ScreenNames} from '../../navigation';
import {useSettings} from '../../providers/settings';
import Spacing from '../atoms/spacing';

export const Leave: FC = () => {
  const {t} = useTranslation();
  const exposure = useExposure();
  const app = useApplication();
  const navigation = useNavigation();
  const {reload} = useSettings();

  const confirmed = async () => {
    try {
      try {
        await exposure.deleteAllData();
        exposure.stop();
      } catch (err) {
        console.log(err);
      }
      await forget();
      await app.clearContext();
      reload();

      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

      navigation.reset({
        index: 0,
        routes: [{name: ScreenNames.ageConfirmation}]
      });
    } catch (e) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      Alert.alert(
        'Error',
        e.message && e.message === 'Network Unavailable'
          ? t('common:networkError')
          : t('leave:error')
      );
    }
  };

  const confirm = () => {
    Alert.alert(t('leave:confirm:title'), t('leave:confirm:text'), [
      {
        text: t('leave:confirm:cancel'),
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel'
      },
      {
        text: t('leave:confirm:confirm'),
        onPress: () => confirmed(),
        style: 'destructive'
      }
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      <Back />
      <Title title="leave:title" />
      <Markdown markdownStyles={markdownStyle}>{t('leave:body')}</Markdown>
      <Button
        style={styles.button}
        type="inverted"
        hint={t('leave:control:hint')}
        label={t('leave:control:label')}
        onPress={confirm}>
        {t('leave:control:label')}
      </Button>
      <Spacing s={44} />
    </ScrollView>
  );
};

const markdownStyle = StyleSheet.create({
  text: {
    ...text.medium,
    color: colors.darkGrey
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 65 : 30,
    paddingLeft: 45,
    paddingRight: 45
  },
  button: {
    marginTop: Dimensions.get('window').scale > 2 ? 24 : 12
  }
});

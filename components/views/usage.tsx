import React, {FC, useEffect, useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Switch,
  Platform
} from 'react-native';
import {useTranslation} from 'react-i18next';
import * as SecureStore from 'expo-secure-store';
import {useExposure} from '@nearform/react-native-exposure-notification-service';

import Markdown from '../atoms/markdown';
import {text} from '../../theme';
import colors from '../../constants/colors';
import {Title} from '../atoms/title';
import {Back} from '../atoms/back';
import Spacing from '../atoms/spacing';

export const Usage: FC = () => {
  const {t} = useTranslation();
  const {configure} = useExposure();
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    SecureStore.getItemAsync('analyticsConsent')
      .then((consent) => {
        if (consent) {
          setEnabled(consent === 'true');
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const toggleSwitch = async () => {
    if (enabled) {
      setEnabled(false);
      SecureStore.setItemAsync('analyticsConsent', String(false), {});
    } else {
      setEnabled(true);
      SecureStore.setItemAsync('analyticsConsent', String(true), {});
    }
    configure();
  };

  return (
    <ScrollView style={styles.container}>
      <Back />
      <Title title="usage:title" />
      <Markdown markdownStyles={markdownStyle} style={styles.content}>
        {t('usage:body')}
      </Markdown>
      <Spacing s={32} />
      <View style={styles.row}>
        <Text style={styles.label}>{t('usage:control:label')}</Text>
        <Text style={styles.status}>
          {enabled ? t('usage:control:on') : t('usage:control:off')}
        </Text>
        <Switch
          thumbColor={colors.white}
          onValueChange={toggleSwitch}
          value={enabled}
          style={styles.switch}
        />
      </View>
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
  content: {
    flex: 1
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  label: {
    ...text.medium,
    color: colors.darkGrey,
    fontWeight: 'bold',
    flex: 1
  },
  status: {
    ...text.medium,
    color: colors.black,
    marginRight: 10
  },
  switch: {
    alignSelf: 'flex-end'
  }
});

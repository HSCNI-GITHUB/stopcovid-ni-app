import React, {FC} from 'react';
import {StyleSheet, View, Image, TouchableWithoutFeedback} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';

import {ScreenNames} from '../../navigation';

const IconLogo = require('../../assets/images/icon-logo/image.png');
const IconMenu = require('../../assets/images/icon-menu/image.png');

export const Header: FC = () => {
  const navigation = useNavigation();
  const {t} = useTranslation();
  return (
    <View style={styles.container}>
      <Image source={IconLogo} accessibilityIgnoresInvertColors={false} />
      <TouchableWithoutFeedback
        accessibilityHint={t('settings:title')}
        accessibilityLabel={t('settings:titleHint')}
        onPress={() => navigation.navigate(ScreenNames.settings)}>
        <Image
          style={styles.settings}
          source={IconMenu}
          resizeMode="center"
          accessibilityIgnoresInvertColors={false}
        />
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 65,
    paddingLeft: 45,
    paddingRight: 45,
    paddingBottom: 25
  },
  settings: {
    width: 44,
    height: 44
  }
});

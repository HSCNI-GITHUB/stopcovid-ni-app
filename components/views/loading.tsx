import React, {FC} from 'react';
import {StyleSheet, Image, View} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {useTranslation} from 'react-i18next';
import {useSafeArea} from 'react-native-safe-area-context';

import Spacing from '../atoms/spacing';
import colors from '../../constants/colors';

export const Loading: FC = () => {
  const {t} = useTranslation();
  const insets = useSafeArea();
  return (
    <View
      style={[
        styles.container,
        {paddingBottom: insets.bottom, paddingTop: insets.top}
      ]}>
      <View style={styles.bg} />
      <Spacing s={50} />
      <Image
        style={styles.center}
        resizeMode="contain"
        source={require('../../assets/images/logo/logo.png')}
        accessible
        accessibilityRole="text"
        accessibilityHint={t('common:name')}
        accessibilityIgnoresInvertColors={false}
      />
      <Spacing s={64} />
      <Spinner animation="fade" visible overlayColor={'transparent'} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'flex-start'
  },
  bg: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    backgroundColor: colors.teal
  },
  center: {
    alignSelf: 'center'
  }
});

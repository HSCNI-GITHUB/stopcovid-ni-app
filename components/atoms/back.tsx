import React, {FC} from 'react';
import {View, Image, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';

const IconBack = require('../../assets/images/icon-back-black/image.png');

export const Back: FC = () => {
  const navigation = useNavigation();
  const {t} = useTranslation();
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback
        accessible
        accessibilityRole="button"
        accessibilityHint={t('common:back:hint')}
        accessibilityLabel={t('common:back:label')}
        onPress={() => navigation.goBack()}>
        <Image source={IconBack} accessibilityIgnoresInvertColors={false} />
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 44
  }
});

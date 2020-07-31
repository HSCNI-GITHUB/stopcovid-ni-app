import React, {FC} from 'react';
import {Text, StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';
import {text} from '../../theme';
import colors from '../../constants/colors';

interface Title {
  title: string;
}

export const Title: FC<Title> = ({title}) => {
  const {t} = useTranslation();
  return <Text style={styles.title}>{t(title)}</Text>;
};

const styles = StyleSheet.create({
  title: {
    ...text.large,
    marginBottom: 30,
    color: colors.darkGrey
  }
});

import React, {FC, useEffect, useRef} from 'react';
import {
  Text,
  StyleSheet,
  findNodeHandle,
  AccessibilityInfo
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {text} from '../../theme';
import colors from '../../constants/colors';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import {useApplication} from '../../providers/context';

interface Title {
  title: string;
  style?: object;
}

export const Title: FC<Title> = ({title, style}) => {
  const {t} = useTranslation();
  const focusStart = useRef<any>();

  const isFocused = useIsFocused();
  const {
    accessibility: {screenReaderEnabled}
  } = useApplication();

  useEffect(() => {
    if (screenReaderEnabled && focusStart.current) {
      const tag = findNodeHandle(focusStart.current);
      if (tag) {
        setTimeout(() => AccessibilityInfo.setAccessibilityFocus(tag), 250);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useFocusEffect(() => {
    if (screenReaderEnabled && isFocused && focusStart.current) {
      const tag = findNodeHandle(focusStart.current);
      if (tag) {
        setTimeout(() => AccessibilityInfo.setAccessibilityFocus(tag), 200);
      }
    }
  });

  return (
    <Text ref={focusStart} style={style || styles.title}>
      {t(title)}
    </Text>
  );
};

const styles = StyleSheet.create({
  title: {
    ...text.large,
    marginBottom: 30,
    color: colors.darkGrey
  }
});

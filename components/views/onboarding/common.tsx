import React, {useEffect} from 'react';
import {View, Text, StyleSheet, AccessibilityProps} from 'react-native';

import {useAccessibilityElement} from '../../../hooks';
import {SPACING_HORIZONTAL} from '../../../theme/layouts/shared';
import {text, scale} from '../../../theme';
import colors from '../../../constants/colors';

interface TitleProps extends AccessibilityProps {
  children: React.ReactNode;
  color?: string;
}

interface ModalTitleProps {
  children: React.ReactNode;
  narrow?: boolean;
}

export const Title: React.FC<TitleProps> = ({
  color,
  children,
  accessibilityHint
}) => {
  const {focusRef, focusAccessibleElement} = useAccessibilityElement();

  useEffect(focusAccessibleElement, [focusAccessibleElement]);

  return (
    <View style={[styles.titleWrapper, !!color && {borderColor: color}]}>
      <Text
        ref={focusRef}
        style={[styles.title, !!color && {color: color}]}
        accessibilityHint={accessibilityHint}>
        {children}
      </Text>
    </View>
  );
};

export const ModalTitle: React.FC<ModalTitleProps> = ({
  children,
  narrow = true
}) => {
  const {focusRef, focusAccessibleElement} = useAccessibilityElement();

  useEffect(focusAccessibleElement, [focusAccessibleElement]);

  return (
    <Text ref={focusRef} style={[styles.modalTitle, narrow && styles.narrow]}>
      {children}
    </Text>
  );
};

interface ContentProps {
  children: React.ReactNode;
}
export const Content: React.FC<ContentProps> = ({children}) => (
  <View style={styles.content}>{children}</View>
);

export const styles = StyleSheet.create({
  content: {
    paddingHorizontal: SPACING_HORIZONTAL
  },
  titleWrapper: {
    paddingHorizontal: SPACING_HORIZONTAL - 4,
    borderColor: text.mediumBold.color,
    borderLeftWidth: 4,
    borderStyle: 'solid'
  },
  title: {
    ...text.mediumBold,
    fontSize: scale(25)
  },
  narrow: {paddingHorizontal: 35},
  modalTitle: {
    ...text.large,
    color: colors.darkerGrey
  }
});

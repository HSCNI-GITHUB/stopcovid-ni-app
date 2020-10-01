import React, {FC, useRef, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  findNodeHandle,
  AccessibilityInfo,
  AccessibilityProps
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useIsFocused, useFocusEffect} from '@react-navigation/native';

import {ModalClose} from '../atoms/modal-close';
import Spacing from '../atoms/spacing';

import {text} from '../../theme';
import {Back} from '../atoms/back';
import colors from '../../constants/colors';
import {useApplication} from '../../providers/context';

interface ModalHeader extends Partial<AccessibilityProps> {
  icon?: any;
  heading?: string;
  color?: string;
  back?: boolean;
  type?: 'default' | 'inline';
  left?: boolean;
  action?: () => void;
  input?: boolean;
}

export const ModalHeader: FC<ModalHeader> = ({
  type = 'default',
  icon,
  heading,
  color,
  back = false,
  left = false,
  action,
  input = false,
  accessibilityHint
}) => {
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
      if (tag && !input) {
        setTimeout(() => AccessibilityInfo.setAccessibilityFocus(tag), 200);
      }
    }
  });

  return (
    <View
      style={[styles.container, type === 'inline' && styles.containerInline]}>
      <View
        style={[
          styles.row,
          back || type === 'inline' ? styles.spaceBetween : styles.end
        ]}>
        {type === 'default' ? (
          <>
            {back && <Back />}
            <ModalClose />
          </>
        ) : (
          <View style={styles.inline}>
            <View style={[styles.row, styles.header]}>
              <View style={styles.dot} />
              <Text ref={focusStart} style={styles.title}>
                {heading}
              </Text>
            </View>
            <ModalClose />
          </View>
        )}
      </View>
      {(icon || heading) && type === 'default' && (
        <View style={styles.content}>
          <Spacing s={20} />
          <View
            style={[
              styles.content,
              icon ? styles.column : styles.row,
              left ? styles.left : {}
            ]}>
            {icon && (
              <Image
                style={styles.icon}
                resizeMode="contain"
                resizeMethod="resize"
                source={icon}
                accessibilityIgnoresInvertColors={false}
              />
            )}
            {icon && heading && <Spacing s={16} />}
            {action && heading && (
              <TouchableWithoutFeedback onPress={action}>
                <Text
                  ref={focusStart}
                  style={[
                    styles.heading,
                    left && styles.leftHeading,
                    color ? {color} : {},
                    !back && !icon ? styles.marginTop : {}
                  ]}>
                  {t(heading)}
                </Text>
              </TouchableWithoutFeedback>
            )}
            {!action && heading && (
              <Text
                accessibilityHint={accessibilityHint}
                ref={focusStart}
                style={[
                  styles.heading,
                  left && styles.leftHeading,
                  color ? {color} : {},
                  !back && !icon ? styles.marginTop : {}
                ]}>
                {t(heading)}
              </Text>
            )}
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 120
  },
  containerInline: {
    paddingBottom: 30,
    minHeight: 'auto'
  },
  column: {
    flexDirection: 'column'
  },
  row: {
    flexDirection: 'row'
  },
  content: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  end: {
    justifyContent: 'flex-end'
  },
  spaceBetween: {
    justifyContent: 'space-between'
  },
  icon: {
    alignSelf: 'center',
    width: 25
  },
  heading: {
    ...text.large,
    textAlign: 'center',
    textAlignVertical: 'center',
    flex: 1,
    flexWrap: 'wrap'
  },
  leftHeading: {
    textAlign: 'left'
  },
  header: {
    alignItems: 'center'
  },
  inline: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  dot: {
    backgroundColor: colors.red,
    borderRadius: 15,
    width: 15,
    height: 15,
    marginRight: 15
  },
  title: {
    ...text.smallBold,
    color: colors.black
  },
  left: {
    textAlign: 'left',
    justifyContent: 'flex-start'
  },
  marginTop: {
    marginTop: 44
  }
});

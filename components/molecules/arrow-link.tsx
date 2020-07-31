import React, {FC} from 'react';
import {
  AccessibilityProps,
  Image,
  StyleSheet,
  Text,
  View,
  ViewStyle,
  TextStyle,
  TouchableWithoutFeedback
} from 'react-native';

import colors from '../../constants/colors';
import {ScreenNames} from '../../navigation';
const ArrowIcon = require('../../assets/images/icon-arrow/image.png');
const ArrowIconWhite = require('../../assets/images/icon-arrow-white/image.png');

interface ArrowLinkProps extends AccessibilityProps {
  navigation?: any;
  screen?: ScreenNames;
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
  invert?: boolean;
  onPress?: () => void;
}

export const ArrowLink: FC<ArrowLinkProps> = ({
  navigation,
  screen,
  onPress,
  accessibilityLabel,
  accessibilityHint,
  containerStyle = {},
  textStyle = {},
  invert = false
}) => (
  <TouchableWithoutFeedback
    onPress={onPress ? onPress : () => screen && navigation.navigate(screen)}
    accessibilityHint={accessibilityHint}
    accessibilityLabel={accessibilityLabel}>
    <View style={[styles.linkContainer, containerStyle]}>
      <Text style={[styles.button, textStyle]}>{accessibilityLabel}</Text>
      <Image
        source={invert ? ArrowIconWhite : ArrowIcon}
        accessibilityIgnoresInvertColors={false}
      />
    </View>
  </TouchableWithoutFeedback>
);

const styles = StyleSheet.create({
  button: {
    textAlign: 'left',
    justifyContent: 'flex-start',
    color: colors.black,
    marginRight: 10,
    fontWeight: 'bold'
  },
  linkContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});

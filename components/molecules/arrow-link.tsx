import React, {FC} from 'react';
import {
  AccessibilityProps,
  Image,
  StyleSheet,
  Text,
  View,
  ViewStyle,
  TextStyle,
  TouchableWithoutFeedback,
  ImageSourcePropType
} from 'react-native';
import * as WebBrowser from 'expo-web-browser';

import colors from '../../constants/colors';
import {text} from '../../theme';
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
  external?: string;
  arrowImage?: ImageSourcePropType;
}

const handleExternal = (link: string) => {
  WebBrowser.openBrowserAsync(link, {
    enableBarCollapsing: true,
    showInRecents: true
  });
};

export const ArrowLink: FC<ArrowLinkProps> = ({
  navigation,
  screen,
  onPress,
  accessibilityLabel,
  accessibilityHint,
  containerStyle = {},
  textStyle = {},
  invert = false,
  external,
  arrowImage
}) => {
  const action = external
    ? () => handleExternal(external)
    : onPress
    ? onPress
    : () => screen && navigation.navigate(screen);
  return (
    <TouchableWithoutFeedback
      onPress={action}
      accessibilityHint={accessibilityHint}
      accessibilityLabel={accessibilityLabel}>
      <View style={[styles.linkContainer, containerStyle]}>
        <Text style={[styles.button, textStyle]}>{accessibilityLabel}</Text>
        <Image
          source={arrowImage ? arrowImage : invert ? ArrowIconWhite : ArrowIcon}
          accessibilityIgnoresInvertColors={false}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  button: {
    ...text.smallBold,
    textAlign: 'left',
    justifyContent: 'flex-start',
    color: colors.black,
    marginRight: 10,
    textDecorationLine: 'underline'
  },
  linkContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});

import React, {useMemo, useState} from 'react';
import {
  StyleSheet,
  ViewStyle,
  Text,
  View,
  TouchableOpacity,
  Image
} from 'react-native';

import {baseStyles} from '../../theme';

export type ButtonTypes =
  | 'default'
  | 'link'
  | 'inverted'
  | 'back'
  | 'smallRound';

interface ButtonProps {
  type?: ButtonTypes;
  disabled?: boolean;
  onPress: () => void;
  style?: ViewStyle;
  width?: number | string;
  children: React.ReactNode;
  label?: string;
  hint?: string;
  textColor?: string;
  icon?: any;
  buttonStyle?: ViewStyle;
}

const Button: React.FC<ButtonProps> = ({
  type = 'default',
  disabled = false,
  onPress,
  style,
  width,
  children,
  hint,
  label,
  textColor,
  icon,
  buttonStyle
}) => {
  const [pressed, setPressed] = useState(false);

  const buttonColors = useMemo(() => {
    switch (type) {
      case 'back':
        return baseStyles.buttons.back;
      case 'default':
        return baseStyles.buttons.default;
      case 'inverted':
        return baseStyles.buttons.inverted;
      case 'link':
        return baseStyles.buttons.link;
      case 'smallRound':
        return baseStyles.buttons.smallRound;
      default:
        return baseStyles.buttons.default;
    }
  }, [type]);

  let backgroundColor = buttonColors.shadow;
  let foregroundColor = buttonColors.background;
  textColor = textColor || buttonColors.text;

  if (pressed) {
    foregroundColor = backgroundColor;
  } else if (disabled) {
    // this should be enough for the moment
    backgroundColor += '66';
    foregroundColor += '66';
  }

  const pressHandlers = disabled
    ? {}
    : {
        onPressIn: () => setPressed(true),
        onPressOut: () => setPressed(false),
        onPress
      };

  return (
    <View
      style={[
        styles.wrapper,
        {backgroundColor: backgroundColor},
        type === 'link' && styles.wrapperLink,
        type === 'back' && styles.wrapperBack,
        type === 'smallRound' && styles.wrapperSmallRound,
        !!width && {width},
        style
      ]}>
      <TouchableOpacity
        style={[
          styles.button,
          {backgroundColor: foregroundColor},
          type === 'link' && styles.buttonLink,
          type === 'back' && styles.buttonBack,
          type === 'smallRound' && styles.buttonSmallRound,
          buttonStyle
        ]}
        accessibilityRole="button"
        importantForAccessibility="yes"
        activeOpacity={1}
        accessibilityHint={hint}
        accessibilityLabel={label}
        {...pressHandlers}>
        {type === 'back' ? (
          <View>{children}</View>
        ) : (
          <View style={styles.row}>
            {icon && (
              <Image
                source={icon}
                style={styles.icon}
                accessibilityIgnoresInvertColors={false}
              />
            )}
            <Text style={[styles.text, {color: textColor}]}>{children}</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    minHeight: 75,
    justifyContent: 'flex-start',
    backgroundColor: baseStyles.buttons.default.shadow,
    borderRadius: 10
  },
  wrapperLink: {
    minHeight: 20,
    backgroundColor: 'transparent'
  },
  wrapperBack: {
    minHeight: 30,
    minWidth: 30,
    borderRadius: 15
  },
  wrapperSmallRound: {
    minHeight: 30,
    borderRadius: 15,
    alignSelf: 'center'
  },
  button: {
    minHeight: 75,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: baseStyles.buttons.default.background,
    borderRadius: 10,
    paddingHorizontal: 12
  },
  buttonLink: {
    minHeight: 20,
    backgroundColor: 'transparent'
  },
  buttonBack: {
    minWidth: 30,
    minHeight: 30,
    borderRadius: 15
  },
  buttonSmallRound: {
    minHeight: 30,
    borderRadius: 15,
    alignSelf: 'center'
  },
  text: {
    color: baseStyles.buttons.default.text,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 15,
    lineHeight: 20
  },
  row: {
    flexDirection: 'row'
  },
  icon: {
    marginRight: 10
  }
});

export default Button;

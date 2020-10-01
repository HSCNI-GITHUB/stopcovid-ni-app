import React, {useMemo, useState} from 'react';
import {
  StyleSheet,
  ViewStyle,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextProps
} from 'react-native';

import {baseStyles} from '../../theme';

interface ButtonColors {
  shadow: string;
  background: string;
  text: string;
  pressedText?: string;
  border?: string;
}

export type ButtonTypes =
  | 'primary'
  | 'secondary'
  | 'link'
  | 'inverted'
  | 'back'
  | 'smallRound';

export type ButtonVariants = 'default' | 'small';

interface ButtonProps {
  type?: ButtonTypes;
  variant?: ButtonVariants;
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
  textProps?: TextProps;
}

const Button: React.FC<ButtonProps> = ({
  type = 'primary',
  variant = 'default',
  disabled = false,
  onPress,
  style,
  width,
  children,
  hint,
  label,
  textColor,
  icon,
  buttonStyle,
  textProps = {}
}) => {
  const [pressed, setPressed] = useState(false);

  const buttonColors: ButtonColors = useMemo(() => {
    switch (type) {
      case 'primary':
        return baseStyles.buttons.primary;
      case 'secondary':
        return baseStyles.buttons.secondary;
      case 'inverted':
        return baseStyles.buttons.inverted;
      case 'link':
        return baseStyles.buttons.link;
      case 'back':
        return baseStyles.buttons.back;
      case 'smallRound':
        return baseStyles.buttons.smallRound;
      default:
        return baseStyles.buttons.primary;
    }
  }, [type]);

  const buttonVariant = useMemo(() => {
    switch (variant) {
      case 'default':
        return styles.variantDefault;
      case 'small':
        return styles.variantSmall;
      default:
        return styles.variantDefault;
    }
  }, [variant]);

  let backgroundColor = buttonColors.shadow;
  let foregroundColor = buttonColors.background;
  let borderColor = buttonColors.border;
  textColor = textColor || buttonColors.text;

  if (pressed) {
    foregroundColor = backgroundColor;
    if (buttonColors.pressedText) {
      textColor = buttonColors.pressedText;
    }
  } else if (disabled) {
    // this should be enough for the moment
    backgroundColor += '66';
    foregroundColor += '66';
    if (borderColor) {
      borderColor += '66';
    }
  }

  const pressHandlers = disabled
    ? {}
    : {
        onPressIn: () => setPressed(true),
        onPressOut: () => setPressed(false),
        onPress: () => {
          setPressed(false);
          onPress();
        }
      };

  return (
    <View
      style={[
        styles.wrapper,
        buttonVariant,
        type !== 'secondary' && {backgroundColor},
        type === 'link' && styles.wrapperLink,
        type === 'back' && styles.wrapperBack,
        type === 'smallRound' && styles.wrapperSmallRound,
        !!width && {width},
        style
      ]}>
      <TouchableOpacity
        style={[
          styles.button,
          buttonVariant,
          {
            backgroundColor:
              type === 'secondary' && disabled
                ? baseStyles.buttons.secondary.background
                : foregroundColor
          },
          !!borderColor && {
            borderColor,
            borderWidth: 1
          },
          type === 'link' && styles.buttonLink,
          type === 'back' && styles.buttonBack,
          type === 'smallRound' && styles.buttonSmallRound,
          buttonStyle
        ]}
        accessibilityRole="button"
        importantForAccessibility="yes"
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
            <Text style={[styles.text, {color: textColor}]} {...textProps}>
              {children}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  variantDefault: {
    minHeight: 75
  },
  variantSmall: {
    minHeight: 50
  },
  wrapper: {
    justifyContent: 'flex-start',
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
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10
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
    color: baseStyles.buttons.primary.text,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 15,
    lineHeight: 20
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  icon: {
    marginRight: 10
  }
});

export default Button;

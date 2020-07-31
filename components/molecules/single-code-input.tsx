import React, {useState, createRef, useEffect} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  ViewStyle,
  AccessibilityInfo,
  AccessibilityProps
} from 'react-native';

import colors from '../../constants/colors';
import {scale, text} from '../../theme';

interface SingleCodeInputProps extends AccessibilityProps {
  error?: boolean;
  style?: ViewStyle;
  count: number;
  disabled?: boolean;
  autoFocus?: boolean;
  onChange?: (value: string) => void;
}

export const SingleCodeInput: React.FC<SingleCodeInputProps> = ({
  style,
  disabled = false,
  autoFocus = false,
  onChange,
  error,
  count,
  accessibilityHint,
  accessibilityLabel
}) => {
  const [value, setValue] = useState<string>('');
  const inputRef = createRef<TextInput>();

  useEffect(() => {
    const isScreenReaderEnabled = (async function () {
      await AccessibilityInfo.isScreenReaderEnabled();
    })();
    if (autoFocus && !isScreenReaderEnabled) {
      inputRef.current?.focus();
    }
  }, [inputRef, autoFocus]);

  const onChangeTextHandler = (v: string) => {
    const validatedValue = v.replace(/[^a-zA-Z0-9]/g, '');
    setValue(validatedValue);

    if (!validatedValue) {
      return;
    }

    if (onChange) {
      onChange(validatedValue);
    }
  };

  const onFocusHandler = () => {
    if (error) {
      inputRef.current?.clear();
      inputRef.current?.focus();
      if (onChange) {
        onChange(value);
      }
    }
  };

  return (
    <View style={[styles.container, style]}>
      <TextInput
        ref={inputRef}
        selectTextOnFocus
        autoCapitalize="characters"
        style={[styles.input, error ? styles.errorBlock : styles.block]}
        maxLength={count}
        keyboardType="default"
        returnKeyType="done"
        editable={!disabled}
        value={value}
        onFocus={onFocusHandler}
        onChangeText={onChangeTextHandler}
        accessibilityLabel={accessibilityLabel}
        accessibilityHint={accessibilityHint}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  input: {
    height: 60,
    flex: 1,
    ...text.xxlargeBlack,
    textAlign: 'center',
    paddingHorizontal: 24,
    borderWidth: 1,
    letterSpacing: scale(10)
  },
  block: {
    color: colors.black,
    borderColor: colors.black
  },
  errorBlock: {
    color: colors.red,
    borderColor: colors.red
  }
});

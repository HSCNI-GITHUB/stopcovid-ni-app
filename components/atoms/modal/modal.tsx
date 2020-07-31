import React from 'react';
import {StyleSheet, Text, View, ViewStyle} from 'react-native';
import ReactNativeModal, {
  ModalProps as ReactNativeModalProps
} from 'react-native-modal';
import {useSafeArea} from 'react-native-safe-area-context';

import Button, {ButtonTypes} from '../button';
import colors from '../../../constants/colors';
import {text} from '../../../theme';
import {
  SPACING_BOTTOM,
  SPACING_HORIZONTAL
} from '../../../theme/layouts/shared';
import Spacing from '../spacing';
import {ModalClose} from '../modal-close';

type ModalButton = {
  label: string;
  action: () => void;
  hint: string;
  type?: ButtonTypes;
  buttonStyle?: ViewStyle;
};

export interface ModalProps extends Partial<ReactNativeModalProps> {
  title?: string;
  buttons?: Array<ModalButton>;
  isVisible?: boolean;
  closeButton?: boolean;
  onClose(): void;
}

const Modal: React.FC<ModalProps> = ({
  title,
  children,
  onClose,
  buttons,
  style,
  isVisible = true,
  closeButton = true,
  ...rest
}) => {
  const insets = useSafeArea();

  return (
    <View style={styles.wrapper}>
      <ReactNativeModal
        {...rest}
        isVisible={isVisible}
        style={styles.bottomModal}>
        <View
          style={[
            styles.contentContainer,
            {paddingBottom: insets.bottom},
            style
          ]}>
          {closeButton && (
            <View style={styles.closeHeader}>
              <ModalClose onPress={onClose} notification />
            </View>
          )}
          {title && <Text style={styles.title}>{title}</Text>}
          <Spacing s={24} />
          {children}
          <Spacing s={24} />
          {!!buttons &&
            buttons.map(({label, hint, action, type, buttonStyle}, index) => (
              <>
                <Button
                  type={type || 'inverted'}
                  label={label}
                  key={index}
                  onPress={() => {
                    action();
                    onClose();
                  }}
                  hint={hint}
                  buttonStyle={buttonStyle}>
                  {label}
                </Button>
                {index + 1 < buttons.length && <Spacing s={16} />}
              </>
            ))}
          <Spacing s={30} />
        </View>
      </ReactNativeModal>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {height: 0},
  closeHeader: {
    alignItems: 'flex-end',
    paddingVertical: 30
  },
  title: {
    ...text.large,
    color: colors.black
  },
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0
  },
  contentContainer: {
    paddingHorizontal: SPACING_HORIZONTAL,
    paddingBottom: SPACING_BOTTOM,
    backgroundColor: colors.white
  }
});

export default Modal;

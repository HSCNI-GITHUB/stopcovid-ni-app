import React, {createRef, Fragment, useEffect} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  ViewStyle,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TextInput,
  findNodeHandle,
  AccessibilityInfo
} from 'react-native';
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
  scrollable?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  title,
  children,
  onClose,
  buttons,
  style,
  isVisible = true,
  closeButton = true,
  scrollable = false,
  ...rest
}) => {
  const insets = useSafeArea();
  const titleRef = createRef<TextInput>();

  useEffect(() => {
    if (titleRef.current) {
      const tag = findNodeHandle(titleRef.current);
      tag &&
        setTimeout(
          () =>
            titleRef.current && AccessibilityInfo.setAccessibilityFocus(tag),
          250
        );
    }
  }, [titleRef]);

  const ViewType = scrollable ? ScrollView : View;
  const TouchableType = scrollable
    ? TouchableOpacity
    : TouchableWithoutFeedback;

  return (
    <View style={styles.wrapper}>
      <ReactNativeModal
        swipeDirection={['down']}
        propagateSwipe={true}
        onSwipeComplete={onClose}
        onBackButtonPress={onClose}
        onBackdropPress={onClose}
        {...rest}
        isVisible={isVisible}
        style={styles.bottomModal}>
        <View
          style={[
            styles.contentContainer,
            {paddingBottom: insets.bottom},
            style
          ]}>
          <ViewType>
            <TouchableType>
              <>
                {closeButton && (
                  <View style={styles.closeHeader}>
                    <ModalClose onPress={onClose} notification />
                  </View>
                )}
                {title && (
                  <Text ref={titleRef} style={styles.title}>
                    {title}
                  </Text>
                )}
                <Spacing s={24} />
                {children}
                <Spacing s={24} />
                {!!buttons &&
                  buttons.map(
                    ({label, hint, action, type, buttonStyle}, index) => (
                      <Fragment key={`${label}-${index}`}>
                        <Button
                          type={type || 'inverted'}
                          label={label}
                          key={index}
                          onPress={async () => {
                            await action();
                            onClose();
                          }}
                          hint={hint}
                          buttonStyle={buttonStyle}>
                          {label}
                        </Button>
                        {index + 1 < buttons.length && <Spacing s={16} />}
                      </Fragment>
                    )
                  )}
                <Spacing s={30} />
              </>
            </TouchableType>
          </ViewType>
        </View>
      </ReactNativeModal>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    height: 0
  },
  closeHeader: {
    alignItems: 'flex-end',
    paddingBottom: 30
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
    flexGrow: 0,
    paddingHorizontal: SPACING_HORIZONTAL,
    paddingBottom: SPACING_BOTTOM,
    backgroundColor: colors.white,
    paddingTop: 30
  }
});

export default Modal;

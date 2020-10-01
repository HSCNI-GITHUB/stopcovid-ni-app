import React, {FC, MutableRefObject} from 'react';
import {ScrollView, StyleSheet, View, ViewStyle} from 'react-native';
import NavBar from '../../components/molecules/onboarding-navbar';
import {Scrollable} from './scrollable';
import colors from '../../constants/colors';

const ONBOARDING_STEPS = 5;

interface OnboardingWithNavbarProps {
  goBack(): void;
  canGoBack: boolean;
  activeSection: number;
  hideProgress?: boolean;
  backgroundColor?: string;
  scrollableStyle?: ViewStyle;
  contentContainerStyle?: ViewStyle;
  scrollViewRef?: MutableRefObject<ScrollView | null>;
  darkNavbar: boolean;
}

const OnboardingWithNavbar: FC<OnboardingWithNavbarProps> = ({
  canGoBack,
  goBack,
  children,
  activeSection,
  hideProgress = false,
  backgroundColor,
  contentContainerStyle,
  scrollableStyle,
  scrollViewRef,
  darkNavbar
}) => (
  <View
    style={[
      styles.container,
      {backgroundColor: backgroundColor || colors.darkerGrey}
    ]}>
    {!hideProgress && (
      <NavBar
        canGoBack={canGoBack}
        goBack={goBack}
        sections={ONBOARDING_STEPS}
        activeSection={activeSection}
        dark={darkNavbar}
      />
    )}
    <Scrollable
      scrollableStyle={scrollableStyle}
      scrollViewRef={scrollViewRef}
      contentContainerStyle={contentContainerStyle}>
      {children}
    </Scrollable>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default OnboardingWithNavbar;

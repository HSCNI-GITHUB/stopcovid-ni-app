import React, {FC, MutableRefObject} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  RefreshControl,
  ViewStyle
} from 'react-native';
import {useSafeArea} from 'react-native-safe-area-context';

import {SPACING_BOTTOM} from './shared';

import Spacing from '../../components/atoms/spacing';
import {Heading} from '../../components/atoms/heading';

interface LayoutProps {
  toast?: React.ReactNode;
  heading?: string;
  headingShort?: boolean;
  backgroundColor?: string;
  refresh?: {
    refreshing: boolean;
    onRefresh: () => void;
  };
  scrollViewRef?: MutableRefObject<ScrollView | null>;
  safeArea?: boolean;
  children: React.ReactNode;
  contentContainerStyle?: ViewStyle;
  scrollableStyle?: ViewStyle;
}

export const Scrollable: FC<LayoutProps> = ({
  toast,
  heading,
  headingShort = false,
  backgroundColor,
  refresh,
  scrollViewRef,
  safeArea = true,
  children,
  contentContainerStyle,
  scrollableStyle = {}
}) => {
  const insets = useSafeArea();
  const refreshControl = refresh && <RefreshControl {...refresh} />;

  return (
    <View style={[styles.container, !!backgroundColor && {backgroundColor}]}>
      <ScrollView
        ref={scrollViewRef}
        keyboardShouldPersistTaps="always"
        style={scrollableStyle}
        contentContainerStyle={[
          {paddingBottom: (safeArea ? insets.bottom : 0) + SPACING_BOTTOM},
          contentContainerStyle
        ]}
        refreshControl={refreshControl}>
        {toast && (
          <>
            {toast}
            <Spacing s={8} />
          </>
        )}
        {heading && (
          <Heading lineWidth={headingShort ? 75 : undefined} text={heading} />
        )}
        {children}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

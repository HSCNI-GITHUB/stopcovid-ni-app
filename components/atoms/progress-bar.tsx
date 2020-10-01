import React from 'react';
import {StyleSheet, View} from 'react-native';
import colors from '../../constants/colors';

interface ProgressBarProps {
  style?: any;
  sections: number;
  activeSection: number;
  dark: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  dark,
  style,
  sections = 1,
  activeSection = 1
}) => (
  <View style={[styles.container, style]}>
    {Array.from(Array(sections)).map((section, i) => (
      <View
        key={`${section}-${i}`}
        style={[
          styles.dot,
          i === 0 && styles.dotFirst,
          i < activeSection
            ? dark
              ? styles.dark
              : styles.dotActive
            : dark
            ? styles.darkDotInactive
            : styles.dotInactive
        ]}
      />
    ))}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    marginLeft: 12.5
  },
  dotFirst: {
    marginLeft: 0
  },
  dotActive: {
    backgroundColor: colors.white
  },
  dotInactive: {
    backgroundColor: 'rgba(255,255,255,0.1)'
  },
  darkDotInactive: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)'
  },
  dark: {
    backgroundColor: colors.darkerGrey
  }
});

export default ProgressBar;

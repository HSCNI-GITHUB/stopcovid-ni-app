import React, {FC} from 'react';
import {View, StyleSheet} from 'react-native';

import {SPACING_HORIZONTAL} from '../../theme/layouts/shared';
import colors from '../../constants/colors';

interface UnderlineProps {
  width?: number;
  color?: string;
}

const Underline: FC<UnderlineProps> = ({
  width = 2,
  color = colors.darkerGrey
}) => (
  <View style={styles.container}>
    <View style={[styles.line, {flex: width, backgroundColor: color}]} />
    <View style={[styles.line, {flex: 4 - width}]} />
  </View>
);

export default Underline;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 4,
    height: 4,
    width: '100%',
    paddingHorizontal: SPACING_HORIZONTAL,
    marginTop: 10
  },
  line: {
    flexDirection: 'row',
    backgroundColor: 'transparent'
  }
});

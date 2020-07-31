import React from 'react';
import {StyleSheet, View} from 'react-native';

import colors from '../../constants/colors';

const Divider: React.FC = () => <View style={styles.divider} />;

const styles = StyleSheet.create({
  divider: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: colors.white
  }
});

export default Divider;

import React from 'react';
import {View, Image, ImageProps, StyleSheet} from 'react-native';

const Illustration: React.FC<ImageProps> = (props) => (
  <View style={styles.illustrationWrapper}>
    <Image
      accessibilityIgnoresInvertColors={false}
      accessible={props.accessible || true}
      {...props}
    />
  </View>
);

const styles = StyleSheet.create({
  illustrationWrapper: {
    alignItems: 'center'
  }
});

export default Illustration;

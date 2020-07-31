import React, {FC} from 'react';
import {
  StyleSheet,
  View,
  ViewStyle,
  Image,
  Text,
  TouchableWithoutFeedback
} from 'react-native';
import * as WebBrowser from 'expo-web-browser';

import colors from '../../constants/colors';
import {text} from '../../theme';
const IconNote = require('../../assets/images/icon-note/image.png');
const IconNoteGreen = require('../../assets/images/icon-note-green/image.png');

interface CardProps {
  style?: ViewStyle;
  content: string;
  link: string;
  inverted?: boolean;
}

const ActionCard: FC<CardProps> = ({
  style,
  content,
  link,
  inverted = false
}) => {
  const handle = () => {
    WebBrowser.openBrowserAsync(link, {
      enableBarCollapsing: true,
      showInRecents: true
    });
  };
  return (
    <TouchableWithoutFeedback onPress={handle}>
      <View style={[styles.container, style, inverted && styles.inverted]}>
        <View style={[styles.left, inverted && styles.invertedBg]}>
          <Image
            accessibilityIgnoresInvertColors={false}
            source={inverted ? IconNoteGreen : IconNote}
            style={styles.note}
            resizeMethod="resize"
            resizeMode="contain"
          />
        </View>
        <View style={styles.flex}>
          <Text style={[styles.text, inverted && styles.inverted]}>
            {content}
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  inverted: {
    color: colors.white,
    borderColor: colors.white
  },
  invertedBg: {backgroundColor: colors.white},
  container: {
    flexDirection: 'row',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: colors.darkGreen,
    borderRadius: 10
  },
  left: {
    backgroundColor: colors.darkGreen,
    justifyContent: 'center',
    paddingVertical: 31,
    paddingLeft: 30,
    paddingRight: 24,
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10
  },
  note: {
    alignSelf: 'center'
  },
  flex: {
    flex: 1
  },
  text: {
    ...text.smallBold,
    paddingLeft: 20,
    paddingVertical: 30,
    paddingRight: 30,
    color: colors.darkGreen,
    fontWeight: 'bold'
  }
});

export default ActionCard;

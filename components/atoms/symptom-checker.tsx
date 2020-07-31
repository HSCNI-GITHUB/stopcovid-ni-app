import React, {FC} from 'react';
import {StyleSheet, View, Image, TouchableWithoutFeedback} from 'react-native';
import {useTranslation} from 'react-i18next';
import * as WebBrowser from 'expo-web-browser';

import colors from '../../constants/colors';
import {text} from '../../theme';
import Markdown from './markdown';

const SymptomCheckerImage = require('../../assets/images/symptoms/image.png');

export const SymptomCheckerMessage: FC = () => {
  const {t} = useTranslation();
  const handle = () => {
    WebBrowser.openBrowserAsync(t('links:b'), {
      enableBarCollapsing: true,
      showInRecents: true
    });
  };

  return (
    <TouchableWithoutFeedback onPress={handle}>
      <View style={styles.container}>
        <Image
          width={135}
          height={130}
          source={SymptomCheckerImage}
          accessibilityIgnoresInvertColors={false}
        />
        <View style={styles.symptomMessage}>
          <Markdown markdownStyles={markdownStyles}>
            {t('symptomChecker:message')}
          </Markdown>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const markdownStyles = StyleSheet.create({
  text: {
    ...text.smallBody,
    color: colors.white,
    lineHeight: 20
  },
  // @ts-ignore
  strong: {
    ...text.smallBody,
    ...text.defaultBold
  }
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.darkGrey,
    alignItems: 'center',
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 10,
    flex: 1,
    flexDirection: 'row',
    marginLeft: 45,
    marginRight: 45,
    borderColor: colors.darkGrey
  },
  symptomMessage: {
    paddingVertical: 20,
    paddingRight: 0,
    flex: 1
  }
});

import React, {FC} from 'react';
import {
  ScrollView,
  Text,
  StyleSheet,
  View,
  Image,
  Platform,
  TouchableWithoutFeedback
} from 'react-native';
import {useTranslation} from 'react-i18next';
import * as WebBrowser from 'expo-web-browser';

import {ModalHeader} from '../molecules/modal-header';
import Spacing from '../atoms/spacing';
import colors from '../../constants/colors';
import Markdown from '../atoms/markdown';
import {text} from '../../theme';
import {ArrowLink} from '../molecules/arrow-link';
import PushNotification from 'react-native-push-notification';

const NotWell = require('../../assets/images/close-contact-not-well/image.png');

interface CloseContactProps {}

export const CloseContact: FC<CloseContactProps> = () => {
  const {t} = useTranslation();
  const handleExternal = (link: string) => {
    WebBrowser.openBrowserAsync(link, {
      enableBarCollapsing: true,
      showInRecents: true
    });
  };
  PushNotification.setApplicationIconBadgeNumber(0);

  return (
    <ScrollView style={styles.container}>
      <ModalHeader type="inline" heading={t('closeContact:title')} />
      <Text style={styles.warning}>{t('closeContact:warning')}</Text>
      <Spacing s={32} />
      <Text style={styles.text}>{t('closeContact:body1')}</Text>
      <Spacing s={24} />
      <View>
        <Text style={styles.textSmall}>{t('closeContact:body2')}</Text>
      </View>
      <Spacing s={24} />
      <View>
        <ArrowLink
          accessibilityHint={t('closeContact:link1Hint')}
          accessibilityLabel={t('closeContact:link1')}
          onPress={() => handleExternal(t('links:c'))}
        />
      </View>
      <Spacing s={24} />
      <View>
        <ArrowLink
          accessibilityHint={t('closeContact:link2Hint')}
          accessibilityLabel={t('closeContact:link2')}
          onPress={() => handleExternal(t('links:d'))}
        />
      </View>
      <Spacing s={24} />
      <View>
        <ArrowLink
          accessibilityHint={t('closeContact:link3Hint')}
          accessibilityLabel={t('closeContact:link3')}
          onPress={() => handleExternal(t('links:k'))}
        />
      </View>
      <Spacing s={32} />
      <TouchableWithoutFeedback onPress={() => handleExternal(t('links:b'))}>
        <View style={styles.whiteBox}>
          <Image source={NotWell} accessibilityIgnoresInvertColors={false} />
          <Markdown style={styles.centerFlex} markdownStyles={markdownStyles}>
            {t('closeContact:notWell')}
          </Markdown>
          <Spacing s={50} />
        </View>
      </TouchableWithoutFeedback>
      <Spacing s={50} />
    </ScrollView>
  );
};

const markdownStyles = StyleSheet.create({
  text: {
    ...text.small,
    color: colors.darkGrey,
    lineHeight: 18
  },
  // @ts-ignore
  strong: {
    ...text.defaultBold
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 65 : 30,
    paddingLeft: 45,
    paddingRight: 45
  },
  text: {
    ...text.medium,
    color: colors.darkGrey,
    lineHeight: 30
  },
  textSmall: {
    ...text.small,
    color: colors.darkGrey
  },
  warning: {
    ...text.heading,
    fontFamily: 'aktiv-bold',
    color: colors.red
  },
  centerFlex: {flex: 1, alignSelf: 'center'},
  whiteBox: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 10,
    paddingRight: 30,
    flexDirection: 'row'
  }
});

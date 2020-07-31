import React, {FC} from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  Platform
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {StackNavigationProp} from '@react-navigation/stack';

import {ModalHeader} from '../molecules/modal-header';
import colors from '../../constants/colors';
import Spacing from '../atoms/spacing';
import {text} from '../../theme';
import Markdown from '../atoms/markdown';
import {NoteLink} from '../atoms/note-link';
import {ArrowLink} from '../molecules/arrow-link';
import {ScreenNames} from '../../navigation';

const CommentIcon = require('../../assets/images/icon-comment/image.png');
const AboutIllustration = require('../../assets/images/about-illustration/image.png');
const IconBell = require('../../assets/images/icon-bell-black/image.png');
const IconEye = require('../../assets/images/icon-eye-black/image.png');
const IconKey = require('../../assets/images/icon-key-black/image.png');
const IconJar = require('../../assets/images/icon-jar/image.png');

interface AboutProps {
  navigation: StackNavigationProp<any>;
}

export const About: FC<AboutProps> = ({navigation}) => {
  const {t} = useTranslation();

  return (
    <ScrollView style={styles.container}>
      <ModalHeader
        icon={CommentIcon}
        heading="about:heading"
        color={colors.darkerGrey}
      />
      <Spacing s={34} />
      <View style={styles.content}>
        <Image
          source={AboutIllustration}
          accessibilityIgnoresInvertColors={false}
        />
        <Spacing s={43} />
        <Text style={styles.subheading}>{t('about:subheading')}</Text>
        <Spacing s={43} />
        <View style={styles.column}>
          <View style={styles.row}>
            <View style={styles.iconWrapper}>
              <Image
                source={IconBell}
                accessibilityIgnoresInvertColors={false}
              />
            </View>
            <View style={styles.column}>
              <Markdown markdownStyles={markdownStyles}>
                {t('onboarding:yourData:view:textBell')}
              </Markdown>
            </View>
          </View>
          <Spacing s={24} />
          <View style={styles.row}>
            <View style={styles.iconWrapper}>
              <Image
                source={IconJar}
                accessibilityIgnoresInvertColors={false}
              />
            </View>
            <View style={styles.column}>
              <Markdown markdownStyles={markdownStyles}>
                {t('onboarding:yourData:view:textUnion')}
              </Markdown>
            </View>
          </View>
          <Spacing s={50} />
          <Text style={styles.subheading}>
            {t('onboarding:privacy:view:title')}
          </Text>
          <Spacing s={34} />
          <View style={styles.row}>
            <View style={styles.iconWrapper}>
              <Image
                source={IconKey}
                accessibilityIgnoresInvertColors={false}
              />
            </View>
            <View style={styles.column}>
              <Markdown markdownStyles={markdownStyles}>
                {t('onboarding:privacy:view:textKey')}
              </Markdown>
              <ArrowLink
                screen={ScreenNames.dataPolicy}
                navigation={navigation}
                accessibilityHint={t('onboarding:privacy:view:linkHint')}
                accessibilityLabel={t('onboarding:privacy:view:link')}
                textStyle={styles.scamsLink}
              />
              <Markdown markdownStyles={markdownStyles}>
                {t('onboarding:privacy:view:textKey1')}
              </Markdown>
            </View>
          </View>
          <Spacing s={24} />
          <View style={styles.row}>
            <View style={styles.iconWrapper}>
              <Image
                source={IconEye}
                accessibilityIgnoresInvertColors={false}
              />
            </View>
            <View style={styles.column}>
              <Markdown markdownStyles={markdownStyles}>
                {t('onboarding:privacy:view:textEye')}
              </Markdown>
            </View>
          </View>
        </View>
        <Spacing s={50} />
        <Text style={styles.subheading}>
          {t('onboarding:whyUse:view:title')}
        </Text>
        <Spacing s={24} />
        <Text style={[styles.viewText, styles.text]}>
          {t('onboarding:whyUse:view:main')}
        </Text>
        <Spacing s={24} />
        <Markdown markdownStyles={markdownStyles}>
          {t('onboarding:whyUse:view:text')}
        </Markdown>
        <Spacing s={37} />
        <NoteLink link="links:f" text="about:link" />
        <Spacing s={37} />
      </View>
      <Spacing s={80} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 65 : 30,
    paddingLeft: 45,
    paddingRight: 45
  },
  content: {
    flex: 1,
    alignItems: 'center'
  },
  subheading: {
    ...text.large,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: colors.darkGrey
  },
  column: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  },
  row: {
    flex: 1,
    flexDirection: 'row'
  },
  divider: {
    borderBottomColor: colors.darkGrey,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    height: 1,
    width: '100%'
  },
  iconWrapper: {
    width: 80,
    paddingLeft: 15,
    paddingTop: 7
  },
  centeredRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    flex: 1,
    width: '100%'
  },
  body: {
    ...text.medium,
    color: colors.darkerGrey,
    textAlign: 'center'
  },
  status: {
    ...text.medium,
    marginRight: 5
  },
  text: {
    color: colors.darkerGrey
  },
  viewText: {
    ...text.medium
  },
  moreText: {
    ...text.small
  },
  scamsLink: {
    paddingVertical: 25
  }
});

const markdownStyles = StyleSheet.create({
  text: {
    ...text.small,
    color: colors.black
  },
  // @ts-ignore
  strong: {
    ...text.smallBold,
    color: colors.black
  },
  h1: {
    lineHeight: 20
  }
});

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
import {Video} from '../atoms/video';
import {text} from '../../theme';
import Markdown from '../atoms/markdown';
import {NoteLink} from '../atoms/note-link';
import {ArrowLink} from '../molecules/arrow-link';
import {SPACING_HORIZONTAL} from '../../theme/layouts/shared';
import {useApplication, UserAgeGroup} from '../../providers/context';

const CommentIcon = require('../../assets/images/icon-comment/image.png');
const ageGroup1AlertAndroid = require('../../assets/images/notification/android/age-group-1/image.png');
const ageGroup2AlertAndroid = require('../../assets/images/notification/android/age-group-2/image.png');
const ageGroup3AlertAndroid = require('../../assets/images/notification/android/age-group-3/image.png');
const ageGroup1AlertIos = require('../../assets/images/notification/ios/age-group-1/image.png');
const ageGroup2AlertIos = require('../../assets/images/notification/ios/age-group-2/image.png');
const ageGroup3AlertIos = require('../../assets/images/notification/ios/age-group-3/image.png');
const MessageIllustration = require('../../assets/images/message-illustration/image.png');
const IOSMessage = require('../../assets/images/message/ios/image.png');
const AndroidMessage = require('../../assets/images/message/android/image.png');
const PinIllustration = require('../../assets/images/pin-illustration/image.png');
const LockIllustration = require('../../assets/images/lock-illustration/image.png');

interface AboutProps {
  navigation: StackNavigationProp<any>;
}

const getImageSource = (ageGroup?: UserAgeGroup) => {
  if (ageGroup === UserAgeGroup.ageGroup1) {
    return Platform.OS === 'ios' ? ageGroup1AlertIos : ageGroup1AlertAndroid;
  } else if (ageGroup === UserAgeGroup.ageGroup2) {
    return Platform.OS === 'ios' ? ageGroup2AlertIos : ageGroup2AlertAndroid;
  } else {
    return Platform.OS === 'ios' ? ageGroup3AlertIos : ageGroup3AlertAndroid;
  }
};

export const About: FC<AboutProps> = ({navigation}) => {
  const {t} = useTranslation();
  const {user: {ageGroup} = {}} = useApplication();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inner}>
        <ModalHeader
          icon={CommentIcon}
          heading="about:heading"
          color={colors.darkerGrey}
        />
        <Spacing s={34} />
        <Video videoId={t('links:x')} />
      </View>
      <Spacing s={43} />
      <View style={styles.center}>
        <Text style={styles.subheading}>{t('about:subheading')}</Text>
      </View>
      <Spacing s={43} />
      <View style={styles.inner}>
        <Markdown markdownStyles={markdownStyles}>{t('about:intro')}</Markdown>
      </View>
      <View style={Platform.OS === 'ios' ? {} : styles.androidImage}>
        <Image
          resizeMode={Platform.OS === 'ios' ? 'cover' : 'contain'}
          style={styles.iosImage}
          source={getImageSource(ageGroup)}
          accessible
          accessibilityIgnoresInvertColors={false}
          accessibilityHint={t('about:notificationAlt')}
        />
      </View>
      <Spacing s={34} />
      <View style={styles.center}>
        <Text style={styles.subheading}>{t('about:message:title')}</Text>
        <Spacing s={40} />
        <Image
          source={MessageIllustration}
          accessible
          accessibilityIgnoresInvertColors={false}
          accessibilityHint={t('about:message:messageIllustrationAlt')}
        />
      </View>
      <Spacing s={30} />
      <View style={styles.inner}>
        <Markdown markdownStyles={markdownStyles}>
          {t('about:message:intro')}
        </Markdown>
      </View>
      <View style={Platform.OS === 'ios' ? {} : styles.androidImage}>
        <Image
          resizeMode={Platform.OS === 'ios' ? 'cover' : 'contain'}
          style={styles.iosImage}
          source={Platform.OS === 'ios' ? IOSMessage : AndroidMessage}
          accessible
          accessibilityIgnoresInvertColors={false}
          accessibilityHint={t(`about:message:messageAlt:${Platform.OS}`)}
        />
      </View>
      <Spacing s={30} />
      <View style={styles.inner}>
        <Markdown markdownStyles={markdownStyles}>
          {t('about:message:content')}
        </Markdown>
        <ArrowLink
          external={t('about:privacy:linkAddress')}
          navigation={navigation}
          accessibilityHint={t('about:privacy:linkHint')}
          accessibilityLabel={t('about:privacy:link')}
          containerStyle={styles.arrowContainer}
          textStyle={styles.arrowLink}
        />
        <Spacing s={24} />
        <Markdown markdownStyles={markdownStyles}>
          {t('about:message:abroad')}
        </Markdown>
      </View>
      <Spacing s={10} />
      <View style={styles.center}>
        <Text style={styles.subheading}>{t('about:privacy:title')}</Text>
      </View>
      <Spacing s={30} />
      <View style={styles.inner}>
        <Markdown markdownStyles={markdownStyles}>
          {t('about:privacy:section1')}
        </Markdown>
      </View>
      <View style={styles.center}>
        <Image
          source={PinIllustration}
          accessible
          accessibilityIgnoresInvertColors={false}
          accessibilityHint={t('about:privacy:pinAlt')}
        />
      </View>
      <View style={styles.inner}>
        <Markdown markdownStyles={markdownStyles}>
          {t('about:privacy:section2')}
        </Markdown>
      </View>
      <View style={styles.center}>
        <Image
          source={LockIllustration}
          accessible
          accessibilityIgnoresInvertColors={false}
          accessibilityHint={t('about:privacy:lockAlt')}
        />
      </View>
      <View style={styles.inner}>
        <Markdown markdownStyles={markdownStyles}>
          {t('about:privacy:section3')}
        </Markdown>
        <ArrowLink
          external={t('links:k')}
          navigation={navigation}
          accessibilityHint={t('about:privacy:readMore')}
          accessibilityLabel={t('about:privacy:readMore')}
          containerStyle={styles.arrowContainer}
          textStyle={styles.arrowLink}
        />
        <Spacing s={50} />
      </View>
      <View style={styles.center}>
        <Text style={styles.subheading}>{t('about:whyUse:title')}</Text>
      </View>
      <Spacing s={24} />
      <View style={styles.inner}>
        <Markdown markdownStyles={markdownStyles}>
          {t('about:whyUse:content')}
        </Markdown>
        <Spacing s={37} />
        <NoteLink link="links:f" text="about:link" />
      </View>
      <Spacing s={117} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 65 : 30
  },
  inner: {
    paddingHorizontal: SPACING_HORIZONTAL
  },
  center: {
    flex: 1,
    alignItems: 'center'
  },
  androidImage: {
    paddingHorizontal: 40
  },
  iosImage: {
    width: '100%'
  },
  subheading: {
    flex: 1,
    ...text.large,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: colors.darkGrey,
    width: '76.5%'
  },
  text: {
    color: colors.darkerGrey
  },
  arrowLink: {
    textDecorationLine: 'underline'
  },
  arrowContainer: {
    alignSelf: 'flex-start'
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
  },
  block: {
    marginBottom: 20
  }
});

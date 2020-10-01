import React, {FC, Fragment} from 'react';
import {
  ScrollView,
  Text,
  StyleSheet,
  View,
  Platform,
  Image
} from 'react-native';
import {useTranslation} from 'react-i18next';
import * as WebBrowser from 'expo-web-browser';
import PushNotification from 'react-native-push-notification';

import {ModalHeader} from '../molecules/modal-header';
import Spacing from '../atoms/spacing';
import colors from '../../constants/colors';
import Markdown from '../atoms/markdown';
import {scale, text} from '../../theme';
import {ArrowLink} from '../molecules/arrow-link';
import {useAgeGroupTranslation} from '../../hooks';
import {SPACING_HORIZONTAL} from '../../theme/layouts/shared';

const IconHome = require('../../assets/images/icon-home/image.png');
const IconDoctor = require('../../assets/images/icon-doctor/image.png');
const IconFlask = require('../../assets/images/icon-flask/image.png');
const IconPeople = require('../../assets/images/icon-people/image.png');
const IconPhone = require('../../assets/images/icon-phone/image.png');
const IconArrow = require('../../assets/images/icon-arrow-blue/image.png');

interface CloseContactProps {}

export const CloseContact: FC<CloseContactProps> = () => {
  const {t} = useTranslation();
  const {getTranslation} = useAgeGroupTranslation();
  const handleExternal = (link: string) => {
    WebBrowser.openBrowserAsync(link, {
      enableBarCollapsing: true,
      showInRecents: true
    });
  };
  PushNotification.setApplicationIconBadgeNumber(0);

  const steps = [
    {
      icon: IconHome,
      link: t('links:d')
    },
    {
      icon: IconDoctor,
      link: t('links:b')
    },
    {
      icon: IconFlask,
      link: t('links:h')
    },
    {
      icon: IconPeople
    },
    {
      icon: IconPhone
    }
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={{flexGrow: 1}}>
      <View style={styles.contentContainer}>
        <ModalHeader type="inline" heading={t('closeContact:title')} />
        <Text style={styles.warning}>
          {getTranslation('closeContact:warning')}
        </Text>
        <Spacing s={32} />
        <Markdown markdownStyles={markdownStyles}>
          {getTranslation('closeContact:body1')}
        </Markdown>
        <Spacing s={24} />
      </View>
      <View style={[styles.contentContainer, styles.nextSteps]}>
        <Spacing s={32} />
        <Markdown markdownStyles={introMarkdownStyles}>
          {getTranslation('closeContact:nextSteps:intro')}
        </Markdown>
        <Spacing s={24} />

        {steps.map((step, i) => (
          <Fragment key={`step-${i}`}>
            <View style={styles.media}>
              <View style={styles.mediaImage}>
                <Image
                  source={step.icon}
                  accessibilityIgnoresInvertColors={false}
                />
              </View>
              <View>
                <Markdown markdownStyles={nextStepsMarkdownStyles}>
                  {i === 0 || i === 4
                    ? getTranslation(`closeContact:nextSteps:step${i + 1}:text`)
                    : t(`closeContact:nextSteps:step${i + 1}:text`)}
                </Markdown>
                {step.link && (
                  <ArrowLink
                    external={step.link}
                    textStyle={styles.mediaLink}
                    accessibilityLabel={t(
                      `closeContact:nextSteps:step${i + 1}:link`
                    )}
                    accessibilityHint={t(
                      `closeContact:nextSteps:step${i + 1}:link`
                    )}
                    arrowImage={IconArrow}
                  />
                )}
              </View>
            </View>
            <Spacing s={30} />
          </Fragment>
        ))}

        <View style={styles.moreInformation}>
          <Text style={styles.moreInformationTitle}>
            {t('closeContact:moreInfo')}
          </Text>
          <Spacing s={24} />
          <ArrowLink
            accessibilityHint={t('closeContact:link1Hint')}
            accessibilityLabel={t('closeContact:link1')}
            onPress={() => handleExternal(t('links:e'))}
          />
          <Spacing s={16} />
          <ArrowLink
            accessibilityHint={t('closeContact:link2Hint')}
            accessibilityLabel={t('closeContact:link2')}
            onPress={() => handleExternal(t('links:c'))}
          />
          <Spacing s={16} />
          <ArrowLink
            accessibilityHint={t('closeContact:link3Hint')}
            accessibilityLabel={t('closeContact:link3')}
            onPress={() => handleExternal(t('links:g'))}
          />
          <Spacing s={16} />
          <ArrowLink
            accessibilityHint={t('closeContact:link4Hint')}
            accessibilityLabel={t('closeContact:link4')}
            onPress={() => handleExternal(t('links:k'))}
          />
        </View>
        <Spacing s={24} />
        <Text style={styles.updated}>{t('closeContact:updated')}</Text>
        <Spacing s={50} />
      </View>
    </ScrollView>
  );
};

const markdownStyles = StyleSheet.create({
  text: {
    ...text.medium,
    color: colors.darkGrey
  },
  h1: {
    lineHeight: 20
  },
  // @ts-ignore
  strong: {
    ...text.mediumBold,
    color: colors.darkGrey
  }
});

const introMarkdownStyles = StyleSheet.create({
  h1: {
    ...text.mediumBold,
    lineHeight: scale(35),
    color: colors.black
  },
  h2: {
    lineHeight: 10
  },
  text: {
    ...text.small,
    lineHeight: scale(20),
    color: colors.black
  }
});

const nextStepsMarkdownStyles = StyleSheet.create({
  h2: {
    ...text.smallBold,
    lineHeight: scale(20),
    color: colors.red,
    marginBottom: 10
  },
  text: {
    ...text.small,
    lineHeight: scale(20),
    color: colors.black
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 65 : 30
  },
  contentContainer: {
    paddingHorizontal: SPACING_HORIZONTAL
  },
  media: {
    flexDirection: 'row',
    paddingRight: 30
  },
  mediaImage: {
    minWidth: 44
  },
  mediaLink: {
    ...text.xsmall,
    ...text.defaultBold,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: colors.blue
  },
  warning: {
    ...text.heading,
    color: colors.red
  },
  nextSteps: {
    backgroundColor: colors.white,
    flex: 1,
    paddingBottom: Platform.OS === 'ios' ? 65 : 30
  },
  moreInformation: {
    paddingVertical: 32,
    paddingLeft: 36,
    backgroundColor: colors.lightestYellow,
    borderLeftWidth: 5,
    borderLeftColor: colors.darkYellow
  },
  moreInformationTitle: {
    ...text.medium,
    color: colors.black
  },
  updated: {
    ...text.small,
    color: 'rgba(0, 0, 0, 0.5);'
  }
});

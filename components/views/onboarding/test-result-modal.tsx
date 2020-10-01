import React from 'react';
import {View, ScrollView, StyleSheet, Platform} from 'react-native';
import {useTranslation} from 'react-i18next';
import {StackNavigationProp} from '@react-navigation/stack';
import {useSafeArea} from 'react-native-safe-area-context';

import Illustration from '../../atoms/illustration';
import Markdown from '../../atoms/markdown';
import Spacing from '../../atoms/spacing';
import colors from '../../../constants/colors';
import {text} from '../../../theme';
import {ModalClose} from '../../atoms/modal-close';
import {ArrowLink} from '../../molecules/arrow-link';
import {ModalTitle, styles as commonStyles} from './common';

const ModalIllustrationSource = require('../../../assets/images/test-result-modal-illustration/image.png');
const AndroidMessageSource = require('../../../assets/images/message/android/image.png');
const IosMessageSource = require('../../../assets/images/message/ios/image.png');

interface TestResultModalProps {
  navigation: StackNavigationProp<any>;
}

export const TestResultModal: React.FC<TestResultModalProps> = ({
  navigation
}) => {
  const {t} = useTranslation();
  const insets = useSafeArea();
  return (
    <View
      style={[
        styles.modal,
        {marginTop: insets.top + (Platform.OS === 'android' ? 25 : 5)}
      ]}>
      <View style={styles.header}>
        <ModalClose onPress={() => navigation.goBack()} />
      </View>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainerStyle}>
        <ModalTitle>
          {t('onboarding:testResult:accessibility:howToAddResultLabel')}
        </ModalTitle>
        <Spacing s={20} />
        <Illustration
          source={ModalIllustrationSource}
          accessibilityHint={t(
            'onboarding:testResult:accessibility:modalIllustrationAlt'
          )}
        />
        <Spacing s={20} />
        <Markdown
          markdownStyles={modalMarkdownStyles}
          style={commonStyles.narrow}>
          {t('onboarding:testResult:modal:content')}
        </Markdown>
        <Spacing s={32} />
        <Illustration
          resizeMethod="resize"
          resizeMode="stretch"
          style={styles.alertImg}
          source={
            Platform.OS === 'ios' ? IosMessageSource : AndroidMessageSource
          }
          accessibilityHint={t(
            'onboarding:testResult:accessibility:messageIllustrationAlt'
          )}
        />
        <Spacing s={32} />
        <Markdown
          markdownStyles={modalMarkdownStyles}
          style={commonStyles.narrow}>
          {t('onboarding:testResult:modal:content1')}
        </Markdown>
        <Spacing s={20} />
        <ArrowLink
          containerStyle={commonStyles.narrow}
          external={t('onboarding:testResult:modal:linkAddress')}
          accessibilityHint={t('onboarding:testResult:modal:linkHint')}
          accessibilityLabel={t('onboarding:testResult:modal:link')}
        />
        <Spacing s={20} />
        <Markdown
          markdownStyles={modalMarkdownStyles}
          style={commonStyles.narrow}>
          {t('onboarding:testResult:modal:content2')}
        </Markdown>
        <Spacing s={50} />
      </ScrollView>
    </View>
  );
};

const modalMarkdownStyles = StyleSheet.create({
  text: {
    ...text.small,
    color: colors.black
  },
  strong: {
    ...text.smallBold,
    color: colors.black
  }
});

const styles = StyleSheet.create({
  modal: {
    backgroundColor: colors.onboardingModals.green,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    flex: 1
  },
  container: {flex: 1},
  contentContainerStyle: {
    flexGrow: 1
  },
  alertImg: {
    width: '100%'
  },
  header: {
    padding: 40,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  }
});

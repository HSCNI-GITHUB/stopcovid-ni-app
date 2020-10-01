import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {StackNavigationProp} from '@react-navigation/stack';

import Button from '../../atoms/button';
import Spacing from '../../atoms/spacing';
import Illustration from '../../atoms/illustration';
import {scale, text} from '../../../theme';
import Markdown from '../../atoms/markdown';
import colors from '../../../constants/colors';
import {Content, styles as commonStyles} from './common';
import {ScreenNames} from '../../../navigation';
import {useAccessibilityElement} from '../../../hooks';

const IllustrationSource = require('../../../assets/images/permissions-illustration/image.png');

interface PrivacyProps {
  handleNext(): void;

  navigation: StackNavigationProp<any>;
}

const PrivacyInfo: React.FC<PrivacyProps> = ({handleNext, navigation}) => {
  const {t} = useTranslation();
  const {focusRef, focusAccessibleElement} = useAccessibilityElement();

  useEffect(focusAccessibleElement, [focusAccessibleElement]);

  return (
    <>
      <View style={styles.container}>
        <Illustration
          source={IllustrationSource}
          accessibilityHint={t(
            'onboarding:privacy:accessibility:illustrationAlt'
          )}
        />
        <Spacing s={24} />
        <View
          ref={focusRef}
          style={[commonStyles.titleWrapper, {borderColor: colors.darkerGrey}]}
          accessibilityHint={t('onboarding:privacy:view:titleA11y')}>
          <Markdown markdownStyles={titleMarkdownStyles}>
            {t('onboarding:privacy:view:title')}
          </Markdown>
        </View>
        <Spacing s={24} />
        <Content>
          <Markdown markdownStyles={markdownStyles}>
            {t('onboarding:privacy:view:text')}
          </Markdown>
        </Content>
      </View>
      <Content>
        <Spacing s={24} />
        <Button
          textColor={colors.darkerGrey}
          variant="small"
          type="secondary"
          onPress={() => navigation.navigate(ScreenNames.privacyModal)}
          hint={t('onboarding:privacy:accessibility:moreHint')}
          label={t('onboarding:privacy:accessibility:moreLabel')}>
          {t('onboarding:privacy:accessibility:moreLabel')}
        </Button>
        <Spacing s={10} />
        <Button
          variant="small"
          onPress={handleNext}
          hint={t('onboarding:privacy:accessibility:nextHint')}
          label={t('onboarding:privacy:accessibility:nextLabel')}>
          {t('common:next:label')}
        </Button>
        <Spacing s={50} />
      </Content>
    </>
  );
};

const markdownStyles = StyleSheet.create({
  text: {
    ...text.small,
    color: colors.darkerGrey
  },
  strong: {
    ...text.smallBold,
    color: colors.darkerGrey
  }
});

const titleMarkdownStyles = StyleSheet.create({
  text: {
    ...text.mediumBold,
    color: colors.darkerGrey,
    fontSize: scale(25)
  },
  u: {
    textDecorationLine: 'underline'
  }
});

const styles = StyleSheet.create({
  container: {flex: 1},
  narrow: {paddingHorizontal: 35},
  modal: {
    backgroundColor: colors.onboardingModals.orange
  },
  title: {color: colors.darkerGrey}
});

export default PrivacyInfo;

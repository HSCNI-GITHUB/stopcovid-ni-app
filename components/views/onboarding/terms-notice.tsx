import React, {FC, useState} from 'react';
import {StyleSheet, View, Alert} from 'react-native';
import {useTranslation} from 'react-i18next';
import {StackNavigationProp} from '@react-navigation/stack';

import Button from '../../atoms/button';
import Spacing from '../../atoms/spacing';
import Markdown from '../../atoms/markdown';
import {Content, Title} from './common';
import {text} from '../../../theme';
import colors from '../../../constants/colors';
import {ArrowLink} from '../../molecules/arrow-link';

interface TermsNoticeProps {
  handleNext(): void;
  navigation: StackNavigationProp<any>;
}

const TermsNotice: FC<TermsNoticeProps> = ({handleNext}) => {
  const {t} = useTranslation();
  const [pressed, setPressed] = useState(false);

  const handleNo = () => {
    setPressed(true);
    Alert.alert(
      t('onboarding:termsNotice:confirm:title'),
      t('onboarding:termsNotice:confirm:description'),
      [
        {
          text: t('common:close:label'),
          style: 'cancel',
          onPress: () => setPressed(false)
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Spacing s={48} />
      <Title accessibilityHint={t('onboarding:termsNotice:view:title')}>
        {t('onboarding:termsNotice:view:title')}
      </Title>
      <Spacing s={24} />
      <Content>
        <Markdown markdownStyles={markdownStyles}>
          {t('onboarding:termsNotice:view:content')}
        </Markdown>
        <Spacing s={18} />
        <ArrowLink
          external={t('links:k')}
          accessibilityHint={t('onboarding:termsNotice:view:readMoreHint')}
          accessibilityLabel={t('onboarding:termsNotice:view:readMore')}
          textStyle={styles.termsLink}
          invert
        />
        <Spacing s={18} />
        <Markdown markdownStyles={markdownStyles}>
          {t('onboarding:termsNotice:view:agreement:content')}
        </Markdown>
        <Spacing s={18} />
        <Button
          variant="small"
          onPress={handleNext}
          hint={t('onboarding:termsNotice:view:agreement:yes:buttonHint')}
          label={t('onboarding:termsNotice:view:agreement:yes:buttonLabel')}>
          {t('onboarding:termsNotice:view:agreement:yes:buttonLabel')}
        </Button>
        <Spacing s={10} />
        <Button
          type="secondary"
          variant="small"
          disabled={pressed}
          onPress={handleNo}
          hint={t('common:no:hint')}
          label={t('common:no:label')}>
          {t('common:no:label')}
        </Button>
      </Content>
    </View>
  );
};

const markdownStyles = StyleSheet.create({
  text: {
    ...text.small
  },
  strong: {
    ...text.smallBold
  }
});

const styles = StyleSheet.create({
  container: {flex: 1},
  termsLink: {
    color: colors.white
  }
});

export default TermsNotice;

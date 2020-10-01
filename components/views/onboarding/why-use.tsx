import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useTranslation} from 'react-i18next';

import Button from '../../atoms/button';
import Illustration from '../../atoms/illustration';
import {text} from '../../../theme';
import Spacing from '../../atoms/spacing';
import Markdown from '../../atoms/markdown';
import {Title, Content} from './common';

const IllustrationSource = require('../../../assets/images/why-use-illustration/image.png');

interface WhyUseProps {
  handleNext(): void;
}

const WhyUse: React.FC<WhyUseProps> = ({handleNext}) => {
  const {t} = useTranslation();

  return (
    <>
      <View style={styles.container}>
        <Illustration
          source={IllustrationSource}
          accessibilityHint={t(
            'onboarding:whyUse:accessibility:illustrationAlt'
          )}
        />
        <Spacing s={24} />
        <Title>{t('onboarding:whyUse:view:title')}</Title>
        <Spacing s={24} />
        <Content>
          <Markdown markdownStyles={markdownStyles}>
            {t('onboarding:whyUse:view:text')}
          </Markdown>
        </Content>
      </View>
      <Content>
        <Spacing s={24} />
        <Button
          variant="small"
          onPress={handleNext}
          hint={t('onboarding:whyUse:accessibility:nextHint')}
          label={t('onboarding:whyUse:accessibility:nextLabel')}>
          {t('common:next:label')}
        </Button>
        <Spacing s={50} />
      </Content>
    </>
  );
};

const markdownStyles = StyleSheet.create({
  text: {
    ...text.small
  },
  // @ts-ignore
  strong: {
    ...text.defaultBold
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default WhyUse;

import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {StackNavigationProp} from '@react-navigation/stack';

import Button from '../../atoms/button';
import Spacing from '../../atoms/spacing';
import Illustration from '../../atoms/illustration';
import {text} from '../../../theme';
import Markdown from '../../atoms/markdown';
import {Content, Title} from './common';
import {ScreenNames} from '../../../navigation';

const IllustrationSource = require('../../../assets/images/test-result-illustration/image.png');

interface TestResultProps {
  handleNext(): void;
  navigation: StackNavigationProp<any>;
}

const TestResult: React.FC<TestResultProps> = ({handleNext, navigation}) => {
  const {t} = useTranslation();

  return (
    <>
      <View style={styles.container}>
        <Illustration
          source={IllustrationSource}
          accessibilityHint={t(
            'onboarding:testResult:accessibility:illustrationAlt'
          )}
        />
        <Spacing s={24} />
        <Title>{t('onboarding:testResult:view:title')}</Title>
        <Spacing s={24} />
        <Content>
          <Markdown markdownStyles={markdownStyles}>
            {t('onboarding:testResult:view:text')}
          </Markdown>
        </Content>
      </View>
      <Content>
        <Spacing s={24} />
        <Button
          variant="small"
          type="secondary"
          onPress={() => navigation.navigate(ScreenNames.testResultModal)}
          hint={t('onboarding:testResult:accessibility:howToAddResultHint')}
          label={t('onboarding:testResult:accessibility:howToAddResultLabel')}>
          {t('onboarding:testResult:accessibility:howToAddResultLabel')}
        </Button>
        <Spacing s={10} />
        <Button
          variant="small"
          onPress={handleNext}
          hint={t('onboarding:testResult:accessibility:nextHint')}
          label={t('onboarding:testResult:accessibility:nextLabel')}>
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
  strong: {
    ...text.smallBold
  }
});

const styles = StyleSheet.create({
  container: {flex: 1},
  narrow: {paddingHorizontal: 35},
  alertImg: {
    width: '100%'
  }
});

export default TestResult;

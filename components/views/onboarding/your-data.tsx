import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {StackNavigationProp} from '@react-navigation/stack';

import Button from '../../atoms/button';
import Spacing from '../../atoms/spacing';
import Illustration from '../../atoms/illustration';
import Markdown from '../../atoms/markdown';
import {Content, Title} from './common';
import {text} from '../../../theme';
import {ScreenNames} from '../../../navigation';

const IllustrationSource = require('../../../assets/images/close-contact-illustration/image.png');

interface YourDataProps {
  handleNext(): void;
  navigation: StackNavigationProp<any>;
}

const YourData: FC<YourDataProps> = ({handleNext, navigation}) => {
  const {t} = useTranslation();

  return (
    <>
      <View style={styles.container}>
        <Illustration
          source={IllustrationSource}
          accessibilityHint={t(
            'onboarding:yourData:accessibility:illustrationAlt'
          )}
        />
        <Spacing s={24} />
        <Title>{t('onboarding:yourData:view:title')}</Title>
        <Spacing s={24} />
        <Content>
          <Markdown markdownStyles={markdownStyles}>
            {t('onboarding:yourData:view:text')}
          </Markdown>
        </Content>
      </View>
      <Content>
        <Spacing s={24} />
        <Button
          variant="small"
          type="secondary"
          onPress={() => navigation.navigate(ScreenNames.yourDataModal)}
          hint={t('onboarding:yourData:accessibility:howWorksHint')}
          label={t('onboarding:yourData:accessibility:howWorksLabel')}>
          {t('onboarding:yourData:accessibility:howWorksLabel')}
        </Button>
        <Spacing s={10} />
        <Button
          variant="small"
          onPress={handleNext}
          hint={t('onboarding:yourData:accessibility:nextHint')}
          label={t('onboarding:yourData:accessibility:nextLabel')}>
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
  container: {flex: 1}
});

export default YourData;

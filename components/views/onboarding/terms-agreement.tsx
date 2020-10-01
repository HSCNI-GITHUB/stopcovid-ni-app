import React, {FC, useState} from 'react';
import {Text, StyleSheet, View, Image, Alert} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';

import Button from '../../atoms/button';
import Spacing from '../../atoms/spacing';
import {text} from '../../../theme';
import colors from '../../../constants/colors';
import Markdown from '../../atoms/markdown';
import {ScreenNames} from '../../../navigation';
import {Title, Content} from './common';
import {useAgeGroupTranslation} from '../../../hooks';

const OptOutIcon = require('../../../assets/images/opt-out-icon/image.png');

interface PrivacyProps {
  handleNext(): void;
  disabled: boolean;
}

const PrivacyAgreement: FC<PrivacyProps> = ({handleNext, disabled}) => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const {getTranslation} = useAgeGroupTranslation();
  const [pressed, setPressed] = useState(false);

  const handleNo = () => {
    setPressed(true);
    Alert.alert(
      t('onboarding:agreement:confirm:title'),
      t('onboarding:agreement:confirm:description'),
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
      <Spacing s={24} />
      <Content>
        <Markdown markdownStyles={markdownStyles}>
          {t('onboarding:agreement:view:textBell')}
        </Markdown>
      </Content>
      <Spacing s={48} />
      <Title
        accessibilityHint={getTranslation('onboarding:agreement:view:title')}>
        {getTranslation('onboarding:agreement:view:title')}
      </Title>
      <Content>
        <Spacing s={40} />
        <View style={styles.row}>
          <View style={styles.iconWrapper}>
            <Image
              source={OptOutIcon}
              accessibilityIgnoresInvertColors={false}
            />
          </View>
          <View style={styles.column}>
            <Markdown markdownStyles={optOutMarkdownStyles}>
              {t('onboarding:agreement:view:optOut')}
            </Markdown>
          </View>
        </View>
        <Spacing s={24} />
        <Text style={styles.moreText}>{t('onboarding:agreement:view:tc')}</Text>
        <Spacing s={34} />
        <View>
          <Button
            variant="small"
            type="secondary"
            disabled={disabled || pressed}
            onPress={() => navigation.navigate(ScreenNames.terms)}
            hint={t('onboarding:agreement:view:tcLinkHint')}
            label={t('onboarding:agreement:view:tcLink')}>
            {t('onboarding:agreement:view:tcLink')}
          </Button>
          <Spacing s={15} />
          <Button
            variant="small"
            disabled={disabled || pressed}
            onPress={() => {
              setPressed(true);
              handleNext();
              setTimeout(() => setPressed(false), 1000);
            }}
            hint={t('onboarding:agreement:accessibility:yesHint')}
            label={t('onboarding:agreement:accessibility:yesLabel')}>
            {t('common:yes:label')}
          </Button>
          <Spacing s={15} />
          <Button
            variant="small"
            disabled={disabled || pressed}
            type="secondary"
            onPress={handleNo}
            hint={t('onboarding:agreement:accessibility:noHint')}
            label={t('onboarding:agreement:accessibility:noLabel')}>
            {t('common:no:label')}
          </Button>
        </View>
      </Content>
      <Spacing s={48} />
    </View>
  );
};

const markdownStyles = StyleSheet.create({
  text: {
    fontSize: 15,
    lineHeight: 25,
    color: colors.white
  }
});

const optOutMarkdownStyles = StyleSheet.create({
  text: {
    ...text.small,
    color: colors.lightBlue
  },
  // @ts-ignore
  strong: {
    ...text.smallBold,
    color: colors.lightBlue
  }
});

const styles = StyleSheet.create({
  container: {flex: 1},
  column: {flex: 1, flexDirection: 'column'},
  row: {flexDirection: 'row'},
  iconWrapper: {width: 50, paddingTop: 15},
  moreText: {
    ...text.small
  },
  termsLink: {
    color: colors.white
  }
});

export default PrivacyAgreement;

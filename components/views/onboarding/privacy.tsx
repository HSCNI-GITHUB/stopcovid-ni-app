import React, {FC} from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {useTranslation} from 'react-i18next';

import Button from '../../atoms/button';
import Spacing from '../../atoms/spacing';
import {text} from '../../../theme';
import Markdown from '../../atoms/markdown';
import {ArrowLink} from '../../molecules/arrow-link';
import {ScreenNames} from '../../../navigation';
import {StackNavigationProp} from '@react-navigation/stack';
import colors from '../../../constants/colors';

const IconKey = require('../../../assets/images/icon-key/icon-key.png');
const IconEye = require('../../../assets/images/icon-eye/icon-eye.png');

interface PrivacyProps {
  handleNext(): void;

  navigation: StackNavigationProp<any>;
  disabled: boolean;
}

const PrivacyInfo: FC<PrivacyProps> = ({handleNext, disabled, navigation}) => {
  const {t} = useTranslation();

  return (
    <>
      <View style={styles.container}>
        <Spacing s={24} />
        <View style={styles.row}>
          <View style={styles.iconWrapper}>
            <Image source={IconKey} accessibilityIgnoresInvertColors={false} />
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
              invert
            />
            <Markdown markdownStyles={markdownStyles}>
              {t('onboarding:privacy:view:textKey1')}
            </Markdown>
          </View>
        </View>
        <Spacing s={24} />
        <View style={styles.row}>
          <View style={styles.iconWrapper}>
            <Image source={IconEye} accessibilityIgnoresInvertColors={false} />
          </View>
          <View style={styles.column}>
            <Markdown markdownStyles={markdownStyles}>
              {t('onboarding:privacy:view:textEye')}
            </Markdown>
          </View>
        </View>
        <Spacing s={48} />
      </View>
      <View>
        <Button
          disabled={disabled}
          type="default"
          onPress={handleNext}
          hint={t('common:next:hint')}
          label={t('common:next:label')}>
          {t('common:next:label')}
        </Button>
      </View>
      <Spacing s={50} />
    </>
  );
};

const markdownStyles = StyleSheet.create({
  h1: {
    lineHeight: 20
  },
  text: {
    ...text.small
  },
  // @ts-ignore
  strong: {
    ...text.smallBold
  }
});

const styles = StyleSheet.create({
  container: {flex: 1},
  column: {flex: 1, flexDirection: 'column'},
  row: {flexDirection: 'row'},
  iconWrapper: {width: 80, paddingLeft: 15, paddingTop: 15},
  scamsLink: {
    color: colors.white,
    paddingVertical: 25
  }
});

export default PrivacyInfo;

import React, {FC} from 'react';
import {StyleSheet, ScrollView, Text, Image, Platform} from 'react-native';
import {useSafeArea} from 'react-native-safe-area-context';
import {useTranslation} from 'react-i18next';
import {StackNavigationProp} from '@react-navigation/stack';
import * as WebBrowser from 'expo-web-browser';

import Button from '../atoms/button';
import colors from '../../constants/colors';
import Spacing from '../atoms/spacing';
import {ModalHeader} from '../molecules/modal-header';
import {SPACING_BOTTOM} from '../../theme/layouts/shared';
import {text} from '../../theme';
import {ScreenNames} from '../../navigation';
import ActionCard from '../molecules/action-card';

const IconUnionGreen = require('../../assets/images/icon-union-green/image.png');
const Logo = require('../../assets/images/test-view-logo/image.png');
const IconPlus = require('../../assets/images/icon-plus/image.png');

interface TestsProps {
  navigation: StackNavigationProp<any>;
}

export const Tests: FC<TestsProps> = ({navigation}) => {
  const {t} = useTranslation();
  const insets = useSafeArea();

  const handleAddTestResult = () => navigation.navigate(ScreenNames.testsAdd);

  const bookATest = () => {
    WebBrowser.openBrowserAsync(t('links:h'), {
      enableBarCollapsing: true,
      showInRecents: true
    });
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[
        styles.contentContainer,
        {paddingBottom: insets.bottom + SPACING_BOTTOM}
      ]}>
      <ModalHeader
        heading="tests:heading"
        color={colors.darkGreen}
        icon={IconUnionGreen}
      />
      <Spacing s={50} />
      <Image
        source={Logo}
        style={styles.logo}
        accessibilityIgnoresInvertColors={false}
      />
      <Spacing s={68} />
      <Text style={styles.viewText}>{t('tests:content')}</Text>
      <Spacing s={25} />
      <Button
        onPress={handleAddTestResult}
        icon={IconPlus}
        label={t('tests:addTestResult')}
        hint={t('tests:addTestResultHint')}
        type="inverted"
        buttonStyle={styles.addTest}
        style={styles.addTest}>
        {t('tests:addTestResult')}
      </Button>
      <Spacing s={16} />
      <Button
        onPress={bookATest}
        label={t('tests:bookTest')}
        hint={t('tests:bookTestHint')}
        style={styles.background}
        buttonStyle={styles.bookTest}
        textColor={colors.darkGreen}>
        {t('tests:bookTest')}
      </Button>
      <Spacing s={54} />
      <ActionCard content={t('tests:view:tellMore')} link={t('links:j')} />
      <Spacing s={54} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  logo: {alignSelf: 'center'},
  container: {
    flex: 1
  },
  contentContainer: {
    flexGrow: 1,
    paddingTop: Platform.OS === 'ios' ? 65 : 30,
    paddingLeft: 45,
    paddingRight: 45
  },
  viewText: {
    ...text.medium,
    color: colors.lightBlack,
    textAlign: 'center'
  },
  moreInfo: {
    alignSelf: 'flex-start'
  },
  addTest: {
    width: '100%',
    color: colors.white,
    backgroundColor: colors.darkGreen
  },
  background: {
    backgroundColor: 'transparent'
  },
  bookTest: {
    backgroundColor: 'transparent',
    borderColor: colors.darkGreen,
    borderStyle: 'solid',
    borderWidth: 1
  }
});

import React, {FC} from 'react';
import {StyleSheet, View, Image} from 'react-native';

import Button from '../atoms/button';
import ProgressBar from '../atoms/progress-bar';
import {SPACING_HORIZONTAL} from '../../theme/layouts/shared';
import {useTranslation} from 'react-i18next';

const IconBack = require('../../assets/images/back/back.png');

const SPACING_VERTICAL = 56;

interface NavBarProps {
  goBack(): void;
  dark: boolean;
  sections: number;
  activeSection: number;
  canGoBack: boolean;
}

const NavBar: FC<NavBarProps> = ({
  goBack,
  sections,
  activeSection,
  canGoBack,
  dark
}) => {
  const {t} = useTranslation();
  return (
    <View style={styles.container}>
      {canGoBack ? (
        <Button
          style={styles.back}
          onPress={goBack}
          type="back"
          hint={t('common:back:hint')}
          label={t('common:back:label')}>
          <Image
            style={styles.iconSize}
            source={IconBack}
            accessibilityIgnoresInvertColors={false}
          />
        </Button>
      ) : (
        <View style={styles.back} />
      )}
      <ProgressBar
        dark={dark}
        style={styles.progressBar}
        sections={sections}
        activeSection={activeSection}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: SPACING_VERTICAL,
    paddingBottom: 20,
    paddingHorizontal: SPACING_HORIZONTAL,
    alignItems: 'center'
  },
  back: {
    width: 30,
    height: 30,
    position: 'absolute',
    left: SPACING_HORIZONTAL,
    top: SPACING_VERTICAL
  },
  progressBar: {
    height: 30
  },
  iconSize: {
    width: 16,
    height: 8
  }
});

export default NavBar;

import React, {FC} from 'react';
import {StyleSheet, View, Image, Dimensions} from 'react-native';

import Button from '../atoms/button';
import ProgressBar from '../atoms/progress-bar';
import {SPACING_HORIZONTAL} from '../../theme/layouts/shared';
import {useTranslation} from 'react-i18next';

const IconBack = require('../../assets/images/back/back.png');
const WaveBlack = require('../../assets/images/wave-black/image.png');

interface NavBarProps {
  goBack(): void;

  sections: number;
  activeSection: number;
  canGoBack: boolean;
}

const width = Dimensions.get('window').width;
const WAVE_WIDTH = 375;
const WAVE_HEIGHT = 133;

const NavBar: FC<NavBarProps> = ({
  goBack,
  sections,
  activeSection,
  canGoBack
}) => {
  const {t} = useTranslation();
  return (
    <>
      <View style={styles.wave}>
        <Image
          source={WaveBlack}
          accessibilityIgnoresInvertColors={false}
          style={{width, height: (width * WAVE_HEIGHT) / WAVE_WIDTH}}
          width={width}
          height={(width * WAVE_HEIGHT) / WAVE_WIDTH}
          resizeMode="contain"
        />
      </View>
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
          style={styles.progressBar}
          sections={sections}
          activeSection={activeSection}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 56,
    paddingBottom: 47,
    paddingHorizontal: SPACING_HORIZONTAL,
    alignItems: 'center',
    position: 'absolute',
    zIndex: 20
  },
  back: {
    width: 30,
    height: 30,
    marginRight: 24
  },
  progressBar: {
    flex: 1
  },
  iconSize: {
    width: 16,
    height: 8
  },
  wave: {
    position: 'absolute',
    zIndex: 10
  }
});

export default NavBar;

import React, {FC} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Image,
  Dimensions,
  Platform
} from 'react-native';
import {useSafeArea} from 'react-native-safe-area-context';
import {useTranslation} from 'react-i18next';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';

import Button from '../atoms/button';
import colors from '../../constants/colors';
import Spacing from '../atoms/spacing';
import {ModalHeader} from '../molecules/modal-header';
import {SPACING_BOTTOM} from '../../theme/layouts/shared';
import {text} from '../../theme';
import Markdown from '../atoms/markdown';
import {ScreenNames} from '../../navigation';
import ActionCard from '../molecules/action-card';
import {useSettings} from '../../providers/settings';

const WaveBackground = require('../../assets/images/wave-green/image.png');

type ParamList = {
  'tests.result': {
    dontShare?: boolean;
  };
};

interface TestsResultProps {
  navigation: StackNavigationProp<any>;
  route: RouteProp<ParamList, 'tests.result'>;
  dontShare?: boolean;
}

const {width} = Dimensions.get('window');

const WAVE_WIDTH = 375;
const WAVE_HEIGHT = 220;

export const TestsResult: FC<TestsResultProps> = ({navigation, route}) => {
  const {t} = useTranslation();
  const {isolationParagraph} = useSettings();
  const insets = useSafeArea();

  const dontShare = route.params && route.params.dontShare;

  const handleDone = () => navigation.navigate(ScreenNames.dashboard);

  const handleResubmit = () => navigation.goBack();

  return (
    <>
      <Image
        style={[
          styles.wave,
          {width, height: (width * WAVE_HEIGHT) / WAVE_WIDTH}
        ]}
        width={width}
        height={(width * WAVE_HEIGHT) / WAVE_WIDTH}
        source={WaveBackground}
        accessibilityIgnoresInvertColors={false}
        resizeMode="contain"
      />
      <ScrollView
        style={[
          styles.container,
          {paddingBottom: insets.bottom + SPACING_BOTTOM}
        ]}
        contentContainerStyle={[
          styles.contentContainer,
          {paddingBottom: insets.bottom + SPACING_BOTTOM}
        ]}>
        <ModalHeader
          heading={dontShare ? undefined : 'tests:result:heading'}
          color={colors.white}
          left
        />
        <Spacing s={40} />
        <View style={styles.top}>
          <Text style={styles.text}>{isolationParagraph}</Text>
          <Spacing s={28} />
          {dontShare ? (
            <Markdown markdownStyles={markdownSmallStyle}>
              {t('tests:result:label2dontShare')}
            </Markdown>
          ) : (
            <Markdown markdownStyles={markdownStyle}>
              {t('tests:result:label2')}
            </Markdown>
          )}
          <Spacing s={28} />
          <ActionCard
            inverted
            content={t('tests:view:tellMore')}
            link={t('links:j')}
          />
          <Spacing s={28} />
        </View>
        {dontShare && (
          <>
            <Button
              onPress={handleResubmit}
              label={t('tests:result:resubmitLabel')}
              hint={t('tests:result:resubmitHint')}
              type="inverted"
              style={styles.button}>
              {t('tests:result:resubmitLabel')}
            </Button>
            <Spacing s={45} />
          </>
        )}
        <Button
          onPress={handleDone}
          label={t('tests:result:doneLabel')}
          hint={t('tests:result:doneHint')}
          type={dontShare ? 'link' : 'inverted'}
          textColor={dontShare ? colors.white : ''}
          style={styles.button}>
          {t('common:done')}
        </Button>
        <Spacing s={50} />
      </ScrollView>
    </>
  );
};

const markdownStyle = StyleSheet.create({
  text: {
    ...text.medium,
    color: colors.white
  },
  strong: {
    ...text.mediumBold,
    color: colors.white
  }
});

const markdownSmallStyle = StyleSheet.create({
  text: {
    ...text.small,
    color: colors.white
  },
  // @ts-ignore
  strong: {
    ...text.smallBold,
    color: colors.white
  }
});

const styles = StyleSheet.create({
  top: {flex: 1},
  container: {
    flex: 1
  },
  contentContainer: {
    flexGrow: 1,
    paddingTop: Platform.OS === 'ios' ? 65 : 30,
    paddingLeft: 45,
    paddingRight: 45
  },
  text: {
    ...text.medium,
    color: colors.white
  },
  button: {
    borderColor: colors.black,
    width: '100%'
  },
  wave: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0
  }
});

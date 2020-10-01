import React, {FC} from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Share,
  Platform
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {TFunction} from 'i18next';

import {ModalHeader} from '../molecules/modal-header';
import colors from '../../constants/colors';
import Spacing from '../atoms/spacing';
import Illustration from '../atoms/illustration';
import {text} from '../../theme';
import Button from '../atoms/button';
import {useApplication} from '../../providers/context';
import {TrackerAreaChart} from '../molecules/area-chart';

const CommunityIcon = require('../../assets/images/icon-community-white/image.png');
const CommunityIllustration = require('../../assets/images/community-illustration/image.png');

export const shareApp = async (t: TFunction) => {
  const url = t('links:l');
  try {
    await Share.share(
      {
        title: t('common:shareMessage'),
        message: Platform.OS === 'android' ? t('common:shareUrl') : undefined,
        url
      },
      {
        subject: t('common:name'),
        dialogTitle: t('common:name')
      }
    );
  } catch (error) {}
};

export const Community: FC = () => {
  const {t} = useTranslation();
  const {data} = useApplication();

  let appRegistrationsCount = 0;
  if (data?.installs.length) {
    appRegistrationsCount = data.installs[data.installs.length - 1][1];
  }

  return (
    <ScrollView style={styles.container}>
      <ModalHeader
        icon={CommunityIcon}
        heading="community:heading"
        color={colors.white}
      />
      <Spacing s={34} />
      <View style={styles.content}>
        <Illustration
          source={CommunityIllustration}
          accessibilityIgnoresInvertColors={false}
          accessibilityHint={t('community:accessibility:illustrationAlt')}
        />
        <Spacing s={43} />
        <Text style={styles.body}>{t('community:body')}</Text>
        <Spacing s={26} />
        <Button
          onPress={() => shareApp(t)}
          style={styles.button}
          type="inverted"
          label={t('common:share')}
          hint={t('common:shareHint')}>
          {t('common:share')}
        </Button>
        <Spacing s={26} />
        {data && (
          <View style={styles.module}>
            <View style={styles.paddingHorizontal}>
              <Text style={[styles.text, styles.heading]}>
                {t('community:figures')}
              </Text>
              <Spacing s={10} />
              <View style={styles.row}>
                <Text style={[styles.status, styles.text, styles.heading]}>
                  {new Intl.NumberFormat('en-GB').format(appRegistrationsCount)}
                </Text>
              </View>
              <Spacing s={30} />
              <TrackerAreaChart
                data={data.installs}
                hint={t('community:registrationsHint')}
                lineColor={colors.white}
                gradientEnd={colors.white}
                intervalsCount={5}
              />
            </View>
          </View>
        )}
        <Spacing s={20} />
      </View>
      <Spacing s={80} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 65 : 30,
    paddingLeft: 45,
    paddingRight: 45
  },
  content: {
    flex: 1,
    alignItems: 'center'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    flex: 1,
    width: '100%'
  },
  body: {
    ...text.largeBody,
    color: colors.white,
    textAlign: 'center'
  },
  heading: {
    fontWeight: 'bold'
  },
  paddingHorizontal: {
    paddingHorizontal: 26
  },
  status: {
    ...text.medium,
    marginRight: 5
  },
  text: {
    color: colors.white
  },
  module: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: colors.white,
    borderRadius: 10,
    flex: 1,
    paddingVertical: 26,
    width: '100%'
  },
  button: {
    width: '100%'
  }
});

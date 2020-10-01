import React from 'react';
import {View, ScrollView, StyleSheet, Platform} from 'react-native';
import {useTranslation} from 'react-i18next';
import {StackNavigationProp} from '@react-navigation/stack';
import {useSafeArea} from 'react-native-safe-area-context';

import Illustration from '../../atoms/illustration';
import Markdown from '../../atoms/markdown';
import Spacing from '../../atoms/spacing';
import {Video} from '../../atoms/video';
import {useApplication, UserAgeGroup} from '../../../providers/context';
import colors from '../../../constants/colors';
import {text} from '../../../theme';
import {ModalClose} from '../../atoms/modal-close';
import {ModalTitle, styles as commonStyles} from './common';

const ModalIllustrationSource = require('../../../assets/images/close-contact-modal-illustration/image.png');
const ageGroup1AlertAndroid = require('../../../assets/images/notification/android/age-group-1/image.png');
const ageGroup2AlertAndroid = require('../../../assets/images/notification/android/age-group-2/image.png');
const ageGroup3AlertAndroid = require('../../../assets/images/notification/android/age-group-3/image.png');

const ageGroup1AlertIos = require('../../../assets/images/notification/ios/age-group-1/image.png');
const ageGroup2AlertIos = require('../../../assets/images/notification/ios/age-group-2/image.png');
const ageGroup3AlertIos = require('../../../assets/images/notification/ios/age-group-3/image.png');

const getImageSource = (ageGroup?: UserAgeGroup) => {
  if (ageGroup === UserAgeGroup.ageGroup1) {
    return Platform.OS === 'ios' ? ageGroup1AlertIos : ageGroup1AlertAndroid;
  } else if (ageGroup === UserAgeGroup.ageGroup2) {
    return Platform.OS === 'ios' ? ageGroup2AlertIos : ageGroup2AlertAndroid;
  } else {
    return Platform.OS === 'ios' ? ageGroup3AlertIos : ageGroup3AlertAndroid;
  }
};

interface YourDataModalProps {
  navigation: StackNavigationProp<any>;
}

export const YourDataModal: React.FC<YourDataModalProps> = ({navigation}) => {
  const {t} = useTranslation();
  const {user: {ageGroup} = {}} = useApplication();
  const insets = useSafeArea();

  return (
    <View
      style={[
        styles.modal,
        {marginTop: insets.top + (Platform.OS === 'android' ? 25 : 5)}
      ]}>
      <View style={styles.header}>
        <ModalClose onPress={() => navigation.goBack()} />
      </View>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainerStyle}>
        <ModalTitle>
          {t('onboarding:yourData:accessibility:howWorksLabel')}
        </ModalTitle>
        <Illustration
          source={ModalIllustrationSource}
          accessibilityHint={t(
            'onboarding:yourData:accessibility:modalIllustrationAlt'
          )}
        />
        <Markdown
          markdownStyles={modalMarkdownStyles}
          style={commonStyles.narrow}>
          {t('onboarding:yourData:modal:content')}
        </Markdown>
        <Spacing s={32} />
        <Illustration
          resizeMethod="resize"
          resizeMode="stretch"
          style={styles.alertImg}
          source={getImageSource(ageGroup)}
          accessibilityHint={t(
            'onboarding:yourData:accessibility:notificationIllustrationAlt'
          )}
        />
        <Spacing s={32} />
        <View style={commonStyles.narrow}>
          <Video videoId={t('links:x')} />
        </View>
        <Spacing s={60} />
      </ScrollView>
    </View>
  );
};

const modalMarkdownStyles = StyleSheet.create({
  text: {
    ...text.small,
    color: colors.black
  },
  strong: {
    ...text.smallBold,
    color: colors.black
  },
  block: {
    marginBottom: 20
  }
});

const styles = StyleSheet.create({
  modal: {
    backgroundColor: colors.onboardingModals.pink,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    flex: 1
  },
  container: {flex: 1},
  contentContainerStyle: {
    flexGrow: 1
  },
  alertImg: {
    width: '100%'
  },
  header: {
    padding: 40,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  }
});

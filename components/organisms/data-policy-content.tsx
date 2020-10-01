import React, {FC} from 'react';
import {View} from 'react-native';

import {useSettings} from '../../providers/settings';
import Markdown from '../atoms/markdown';
import {markdownStyles} from '../views/terms';
import {ModalTitle} from '../views/onboarding/common';
import {useTranslation} from 'react-i18next';

export const DataPolicyContent: FC = () => {
  const {dpinText} = useSettings();
  const {t} = useTranslation();

  return (
    <View>
      <ModalTitle narrow={false}>{t('dataPolicy:title')}</ModalTitle>
      <Markdown markdownStyles={markdownStyles}>{dpinText}</Markdown>
    </View>
  );
};

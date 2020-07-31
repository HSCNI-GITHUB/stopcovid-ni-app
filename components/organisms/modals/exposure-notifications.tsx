import React, {FC} from 'react';
import {useTranslation} from 'react-i18next';
import {Platform, StyleSheet} from 'react-native';
import {
  useExposure,
  StatusState,
  StatusType
} from '@nearform/react-native-exposure-notification-service';

import Markdown from '../../atoms/markdown';
import Modal, {ModalProps} from '../../atoms/modal';
import colors from '../../../constants/colors';
import {goToSettingsAction} from '../../molecules/go-to-settings';

export const ExposureNotificationsModal: FC<ModalProps> = (props) => {
  const {t} = useTranslation();
  const {status, askPermissions} = useExposure();
  const ensUnknown = status.state === StatusState.unknown;
  const ensDisabled = status.state === StatusState.disabled;

  return (
    <Modal
      {...props}
      title={t('modals:exposureNotifications:title')}
      buttons={
        ensUnknown
          ? [
              {
                action: async () => await askPermissions(),
                hint: t('common:turnOnBtnHint'),
                label: t('common:turnOnBtnLabel')
              }
            ]
          : [
              {
                action: () => goToSettingsAction(false, askPermissions, true),
                hint: ensDisabled
                  ? t('common:turnOnBtnHint')
                  : Platform.OS === 'android'
                  ? t('common:turnOnBtnHint')
                  : t('common:goToSettingsHint'),
                label: ensDisabled
                  ? t('common:turnOnBtnLabel')
                  : Platform.OS === 'android'
                  ? t('common:turnOnBtnLabel')
                  : t('common:goToSettings')
              }
            ]
      }>
      <Markdown markdownStyles={modalMarkdownStyles}>
        {ensUnknown
          ? t('modals:exposureNotifications:turnOn')
          : t(`modals:exposureNotifications:instructions${Platform.OS}`)}
      </Markdown>
    </Modal>
  );
};

const modalMarkdownStyles = StyleSheet.create({
  text: {
    color: colors.black
  }
});

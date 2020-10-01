import React, {FC} from 'react';
import {useTranslation} from 'react-i18next';
import {Platform, StyleSheet} from 'react-native';
import {
  useExposure,
  StatusState
} from 'react-native-exposure-notification-service';

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
                hint: t('modals:exposureNotifications:turnOnBtnHint'),
                label: t('modals:exposureNotifications:turnOnBtnLabel')
              }
            ]
          : [
              {
                action: () => goToSettingsAction(false, askPermissions, true),
                hint: ensDisabled
                  ? t('modals:exposureNotifications:turnOnBtnHint')
                  : Platform.OS === 'android'
                  ? t('modals:exposureNotifications:turnOnBtnHint')
                  : t('modals:exposureNotifications:goToSettingsHint'),
                label: ensDisabled
                  ? t('modals:exposureNotifications:turnOnBtnLabel')
                  : Platform.OS === 'android'
                  ? t('modals:exposureNotifications:turnOnBtnLabel')
                  : t('modals:exposureNotifications:goToSettings')
              }
            ]
      }>
      <Markdown
        style={modalMarkdownStyles.container}
        markdownStyles={modalMarkdownStyles}>
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
  },
  container: {
    marginBottom: 60
  }
});

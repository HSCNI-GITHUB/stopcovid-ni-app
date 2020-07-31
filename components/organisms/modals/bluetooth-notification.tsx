import React, {FC} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet} from 'react-native';

import Markdown from '../../atoms/markdown';
import Modal from '../../atoms/modal';
import colors from '../../../constants/colors';
import {ModalProps} from '../../atoms/modal';
import {goToSettingsAction} from '../../molecules/go-to-settings';

export const BluetoothNotificationsModal: FC<ModalProps> = (props) => {
  const {t} = useTranslation();
  return (
    <Modal
      {...props}
      title={t('modals:bluetoothNotifications:title')}
      buttons={[
        {
          action: goToSettingsAction,
          hint: t('modals:bluetoothNotifications:btnLabel'),
          label: t('modals:bluetoothNotifications:btnLabel')
        }
      ]}>
      <Markdown markdownStyles={modalMarkdownStyles}>
        {t('modals:bluetoothNotifications:instructions')}
      </Markdown>
    </Modal>
  );
};

const modalMarkdownStyles = StyleSheet.create({
  text: {
    color: colors.black
  }
});

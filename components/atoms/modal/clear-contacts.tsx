import React, {FC} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet} from 'react-native';
import {useExposure} from '@nearform/react-native-exposure-notification-service';

import Markdown from '../markdown';
import Modal from '.';
import colors from '../../../constants/colors';
import {ModalProps} from '.';
import {text} from '../../../theme';
import Spacing from '../spacing';

export const ClearContactsModal: FC<ModalProps> = (props) => {
  const {t} = useTranslation();
  const {deleteExposureData, getCloseContacts} = useExposure();
  return (
    <Modal
      {...props}
      closeButton={false}
      buttons={[
        {
          action: async () => {
            try {
              await deleteExposureData();
              await getCloseContacts();
            } catch (e) {
              console.log('Error deleting exposure data', e);
            }
          },
          hint: t('modals:clearContacts:okBtnHint'),
          label: t('modals:clearContacts:okBtnLabel')
        },
        {
          action: () => {},
          hint: t('modals:clearContacts:cancelBtnHint'),
          label: t('modals:clearContacts:cancelBtnLabel'),
          type: 'default',
          buttonStyle: {
            borderColor: colors.black,
            borderWidth: 1
          }
        }
      ]}>
      <Markdown markdownStyles={modalMarkdownStyles}>
        {t('modals:clearContacts:instructions')}
      </Markdown>
      <Spacing s={30} />
    </Modal>
  );
};

const modalMarkdownStyles = StyleSheet.create({
  text: {
    ...text.medium,
    color: colors.black,
    textAlign: 'center'
  }
});

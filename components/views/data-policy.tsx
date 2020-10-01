import React, {FC} from 'react';
import {StyleSheet, ScrollView, View, Platform} from 'react-native';

import {useApplication} from '../../providers/context';
import {Back} from '../atoms/back';
import {ModalClose} from '../atoms/modal-close';

import {DataPolicyContent} from '../organisms/data-policy-content';

export const DataPolicy: FC = () => {
  const {user} = useApplication();

  return (
    <ScrollView style={styles.container}>
      {user && <Back />}
      {!user && (
        <View style={styles.modalClose}>
          <ModalClose />
        </View>
      )}
      <DataPolicyContent />
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
  back: {
    marginBottom: 44
  },
  modalClose: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginBottom: 44
  }
});

import React, {FC} from 'react';
import {StyleSheet, ScrollView, View, Platform} from 'react-native';

import {useApplication} from '../../providers/context';
import {Title} from '../atoms/title';
import {Back} from '../atoms/back';
import {ModalClose} from '../atoms/modal-close';
import {useSettings} from '../../providers/settings';
import Markdown from '../atoms/markdown';
import Spacing from '../atoms/spacing';
import {markdownStyles} from './terms';

export const DataPolicy: FC = () => {
  const {user} = useApplication();
  const {dpinText} = useSettings();

  return (
    <ScrollView style={styles.container}>
      {user && <Back />}
      {!user && (
        <View style={styles.modalClose}>
          <ModalClose />
        </View>
      )}
      <Title title="dataPolicy:title" />
      <View>
        <Markdown markdownStyles={markdownStyles}>{dpinText}</Markdown>
      </View>
      <Spacing s={100} />
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

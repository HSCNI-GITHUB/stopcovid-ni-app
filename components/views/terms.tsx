import React, {FC} from 'react';
import {StyleSheet, ScrollView, View, Platform} from 'react-native';

import {useApplication} from '../../providers/context';
import {Title} from '../atoms/title';
import {Back} from '../atoms/back';
import {ModalClose} from '../atoms/modal-close';
import {useSettings} from '../../providers/settings';
import Markdown from '../atoms/markdown';
import {text} from '../../theme';
import Spacing from '../atoms/spacing';

export const Terms: FC = () => {
  const {user} = useApplication();
  const {tandcText} = useSettings();
  return (
    <ScrollView style={styles.container}>
      {user && <Back />}
      {!user && (
        <View style={styles.modalClose}>
          <ModalClose />
        </View>
      )}
      <Title title="terms:title" />
      <View>
        <Markdown markdownStyles={markdownStyles}>{tandcText}</Markdown>
      </View>
      <Spacing s={100} />
    </ScrollView>
  );
};

export const markdownStyles = StyleSheet.create({
  text: {
    ...text.default,
    lineHeight: 25
  },
  h1: {
    ...text.heading,
    marginBottom: 20
  },
  h2: {
    ...text.heading,
    marginBottom: 20
  },
  h3: {
    ...text.heading,
    marginBottom: 20
  },
  h4: {
    ...text.heading,
    marginBottom: 20
  },
  h5: {
    ...text.heading,
    marginBottom: 20
  },
  h6: {
    ...text.heading,
    marginBottom: 20
  },
  // @ts-ignore
  strong: {
    ...text.defaultBold
  },
  list: {
    marginBottom: 20
  },
  listItemContent: {
    ...text.default,
    marginBottom: 20
  },
  listItemBullet: {
    ...text.default,
    marginRight: 10
  },
  listItemNumber: {
    ...text.default,
    marginRight: 10
  }
});

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

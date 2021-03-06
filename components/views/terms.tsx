import React, {FC, useEffect, useState} from 'react';
import {StyleSheet, ScrollView, View, Platform} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

import {useApplication} from '../../providers/context';
import {Title} from '../atoms/title';
import {Back} from '../atoms/back';
import {ModalClose} from '../atoms/modal-close';
import {useSettings} from '../../providers/settings';
import Markdown from '../atoms/markdown';
import {text} from '../../theme';
import Spacing from '../atoms/spacing';
import colors from '../../constants/colors';

export const Terms: FC = () => {
  const {user} = useApplication();
  const {tandcText} = useSettings();
  const [initialRender, setInitialRender] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setInitialRender(false);
  }, []);
  useEffect(() => {
    if (!initialRender) {
      setLoading(false);
    }
  }, [initialRender]);

  return (
    <>
      <ScrollView style={styles.container}>
        {user && <Back />}
        {!user && (
          <View style={styles.modalClose}>
            <ModalClose />
          </View>
        )}
        <Title title="terms:title" />
        {!loading && (
          <View>
            <Markdown markdownStyles={markdownStyles}>{tandcText}</Markdown>
          </View>
        )}
        <Spacing s={100} />
        {loading && (
          <Spinner
            animation="fade"
            visible
            overlayColor={'rgba(0, 0, 0, 0.5)'}
          />
        )}
      </ScrollView>
    </>
  );
};

export const markdownStyles = StyleSheet.create({
  text: {
    ...text.largeBody,
    color: colors.black
  },
  h1: {
    ...text.largeBody,
    marginVertical: 20
  },
  h2: {
    ...text.largeBody,
    marginVertical: 20
  },
  h3: {
    ...text.largeBody,
    marginVertical: 20
  },
  h4: {
    ...text.largeBody,
    marginVertical: 20
  },
  h5: {
    ...text.largeBody,
    marginVertical: 20
  },
  h6: {
    ...text.largeBody,
    marginVertical: 20
  },
  // @ts-ignore
  strong: {
    ...text.defaultBold
  },
  list: {
    marginVertical: 20
  },
  listItemContent: {
    ...text.default,
    flexDirection: 'row',
    flexShrink: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginBottom: 20
  },
  listItemBullet: {
    ...text.default,
    width: 4,
    height: 4,
    backgroundColor: 'black',
    borderRadius: 2,
    marginRight: 10,
    marginTop: 12
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
  },
  accessibilityView: {
    ...StyleSheet.absoluteFillObject
  }
});

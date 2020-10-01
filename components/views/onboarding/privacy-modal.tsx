import React from 'react';
import {View, ScrollView, StyleSheet, Platform} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useSafeArea} from 'react-native-safe-area-context';

import colors from '../../../constants/colors';
import {ModalClose} from '../../atoms/modal-close';
import {DataPolicyContent} from '../../organisms/data-policy-content';

interface PrivacyModalProps {
  navigation: StackNavigationProp<any>;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({navigation}) => {
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
        <DataPolicyContent />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  modal: {
    backgroundColor: colors.onboardingModals.orange,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    flex: 1
  },
  container: {flex: 1},
  contentContainerStyle: {
    flexGrow: 1,
    paddingHorizontal: 35
  },
  header: {
    padding: 40,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  }
});

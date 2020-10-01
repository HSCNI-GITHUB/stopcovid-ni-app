import React, {FC, useState} from 'react';
import {ScrollView, StyleSheet, Text, View, Platform} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {format, isToday, isTomorrow} from 'date-fns';
import {useExposure} from 'react-native-exposure-notification-service';
import {useSafeArea} from 'react-native-safe-area-context';

import {ModalClose} from '../atoms/modal-close';
import {text} from '../../theme';
import colors from '../../constants/colors';
import Spacing from '../atoms/spacing';
import Button from '../atoms/button';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {useReminder} from '../../providers/reminder';
import {ModalTitle} from './onboarding/common';
import {ScreenNames} from '../../navigation';

const getClosestInterval = (interval: number) => {
  const ms = 1000 * 60 * interval;
  return new Date(Math.ceil(new Date().getTime() / ms) * ms);
};

// const getIntervalData = (interval: number) => {
//   const current = getClosestInterval(interval);
//   const times = [];
//   const intervals = 24 * (60 / interval);
//   for (let i = 0; i < intervals; i++) {
//     const value = current.setMinutes(current.getMinutes() + interval);
//     times.push({
//       value,
//       label: format(value, 'HH:mm')
//     });
//   }
//   return times;
// };

export const Pause: FC = () => {
  const navigation = useNavigation();
  const {t} = useTranslation();
  const {pause} = useExposure();
  const [selectedInterval, setSelectedInterval] = useState<Date>(
    getClosestInterval(15)
  );
  const [show, setShow] = useState(false);
  const {setReminder, getReminderDate} = useReminder();
  const insets = useSafeArea();

  const reminderDate = getReminderDate(selectedInterval);
  const date = `${format(reminderDate, 'HH:mm')} ${
    isToday(reminderDate)
      ? t('common:today')
      : isTomorrow(reminderDate)
      ? t('common:tomorrow')
      : ''
  }`;

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
        style={styles.view}
        contentContainerStyle={styles.contentContainerStyle}>
        <ModalTitle>{t('pause:title')}</ModalTitle>
        <Spacing s={24} />
        <Text style={styles.body}>{t('pause:body')}</Text>
        <Spacing s={24} />
        <Text style={styles.body}>{t('pause:label')}</Text>
        <Spacing s={24} />
        <TouchableWithoutFeedback onPress={() => setShow(true)}>
          <View style={styles.dropdown}>
            <Text>{date}</Text>
          </View>
        </TouchableWithoutFeedback>
        <DateTimePickerModal
          isVisible={show}
          mode="time"
          date={selectedInterval}
          onConfirm={(e) => {
            setShow(false);
            setSelectedInterval(e);
          }}
          onCancel={() => setShow(false)}
          headerTextIOS={t('pause:modalHeader')}
        />
        <Spacing s={18} />
        <Button
          buttonStyle={styles.buttonStyle}
          type="primary"
          textColor={colors.white}
          onPress={() => {
            pause();
            setReminder(selectedInterval);
            navigation.navigate(ScreenNames.tracing, {
              previous: ScreenNames.pause
            });
          }}>
          {t('pause:button')}
        </Button>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  modal: {
    backgroundColor: colors.white,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    flex: 1
  },
  view: {
    flex: 1
  },
  header: {
    padding: 40,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  contentContainerStyle: {
    flexGrow: 1,
    paddingLeft: 45,
    paddingRight: 45,
    paddingBottom: 40
  },
  title: {
    ...text.large,
    color: colors.darkerGrey
  },
  body: {
    ...text.medium,
    color: colors.darkerGrey
  },
  textContainer: {
    flex: 1
  },
  buttonContainer: {
    justifyContent: 'flex-end'
  },
  buttonStyle: {
    backgroundColor: colors.darkGreen,
    borderColor: colors.darkGreen,
    borderStyle: 'solid',
    borderWidth: 1,
    flexDirection: 'row'
  },
  dropdown: {
    borderColor: colors.darkGreen,
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    marginBottom: 0
  },
  pickerContainer: {
    overflow: 'hidden'
  },
  picker: {
    width: '100%',
    height: 600,
    marginTop: -70
  },
  itemStyle: {
    color: colors.darkGreen
  }
});

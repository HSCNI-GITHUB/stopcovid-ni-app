import React, {createContext, useContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {useTranslation} from 'react-i18next';
import PushNotification from 'react-native-push-notification';
import {addDays} from 'date-fns';

interface State {
  paused: string | null;
  checked: boolean;
}

interface ReminderContextValue extends State {
  setReminder: (date: Date) => void;
  deleteReminder: () => void;
  cancelReminder: () => void;
  getReminderDate: (date: Date) => Date;
}

const initialState = {
  paused: null,
  checked: false
};

export const ReminderContext = createContext(
  initialState as ReminderContextValue
);

export interface API {
  children: any;
}

const REMINDER_KEY = 'ni.reminder';
const REMINDER_ID = 12345;

export const Provider = ({children}: API) => {
  const [state, setState] = useState<State>(initialState);
  const {t} = useTranslation();

  useEffect(() => {
    AsyncStorage.getItem(REMINDER_KEY).then((paused) =>
      setState({
        paused,
        checked: true
      })
    );
  }, []);

  const cancelReminder = () =>
    PushNotification.cancelLocalNotifications({id: String(REMINDER_ID)});

  const deleteReminder = () => {
    PushNotification.cancelLocalNotifications({id: String(REMINDER_ID)});
    AsyncStorage.removeItem(REMINDER_KEY);
    setState({
      ...state,
      paused: null
    });
  };

  const getReminderDate = (date: Date) => {
    const currentDate = new Date();
    return date < currentDate ? addDays(date, 1) : date;
  };

  const setReminder = (date: Date) => {
    const notificationDate = getReminderDate(date);
    const timestamp = String(notificationDate.getTime());
    AsyncStorage.setItem(REMINDER_KEY, timestamp);

    PushNotification.localNotificationSchedule({
      id: REMINDER_ID,
      title: t('reminder:title'),
      message: t('reminder:message'),
      date: notificationDate,
      repeatType: 'hour',
      // @ts-ignore
      allowWhileIdle: true
    });

    setState({
      ...state,
      paused: timestamp
    });
  };

  const value: ReminderContextValue = {
    ...state,
    setReminder,
    deleteReminder,
    cancelReminder,
    getReminderDate
  };

  return (
    <ReminderContext.Provider value={value}>
      {children}
    </ReminderContext.Provider>
  );
};

export const ReminderProvider = Provider;

export const useReminder = () => useContext(ReminderContext);

import React, {FC, useEffect} from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  Platform,
  ImageStyle
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
import {
  useExposure,
  StatusState
} from 'react-native-exposure-notification-service';
import {format, isToday, isTomorrow} from 'date-fns';

import {ModalHeader} from '../molecules/modal-header';

import colors from '../../constants/colors';
import Spacing from '../atoms/spacing';
import {text} from '../../theme';
import Markdown from '../atoms/markdown';
import Illustration from '../atoms/illustration';
import {ScreenNames} from '../../navigation';
import GoToSettings from '../molecules/go-to-settings';
import Button from '../atoms/button';
import {useReminder} from '../../providers/reminder';
import {SPACING_HORIZONTAL} from '../../theme/layouts/shared';
import {useAccessibilityElement} from '../../hooks';

const TracingIcon = require('../../assets/images/tracing-active/image.png');
const IconTracingActive = require('../../assets/images/icon-tracing-active-big/image.png');
const IconTracingInactive = require('../../assets/images/icon-tracing-inactive-big/image.png');
const TracingIllustration = require('../../assets/images/tracing-illustration/image.png');
const IconPaused = require('../../assets/images/icon-paused/image.png');

type RouteParams = {
  params: {
    previous?: ScreenNames;
  };
};

export const Tracing: FC = () => {
  const {checked, paused, deleteReminder} = useReminder();
  const {t} = useTranslation();
  const navigation = useNavigation();
  const {params} = useRoute<RouteProp<RouteParams, 'params'>>();
  const {enabled, status, contacts, start} = useExposure();
  const tracingActive = enabled && status.state === StatusState.active;
  const pauseDate = new Date(Number(paused));
  const {focusRef, focusAccessibleElement} = useAccessibilityElement();

  useEffect(() => {
    if (params?.previous === ScreenNames.pause) {
      focusAccessibleElement();
    }
  }, [params, focusAccessibleElement]);

  if (!checked) {
    return <ScrollView style={styles.container} />;
  }

  const renderActive = () => (
    <>
      <Text style={[styles.text, styles.heading, styles.active]}>
        {t('tracing:status:heading')}
      </Text>
      <Spacing s={20} />
      <View style={styles.row}>
        <Image
          style={styles.moduleImage as ImageStyle}
          source={IconTracingActive}
          accessibilityIgnoresInvertColors={false}
        />
        <Text
          style={[styles.text, styles.heading, styles.status, styles.active]}>
          {t('tracing:status:active')}
        </Text>
      </View>
      <Spacing s={20} />
      <Text style={[styles.text]}>{t('tracing:message')}</Text>
    </>
  );

  const renderInactive = () => (
    <>
      <Text style={[styles.text, styles.heading, styles.notActive]}>
        {t('tracing:status:heading')}
      </Text>
      <Spacing s={20} />
      <View style={styles.row}>
        <Image
          style={styles.moduleImage as ImageStyle}
          source={IconTracingInactive}
          accessibilityIgnoresInvertColors={false}
        />
        <Text
          style={[
            styles.text,
            styles.heading,
            styles.status,
            styles.notActive
          ]}>
          {t('tracing:status:inactive')}
        </Text>
      </View>
      <Spacing s={20} />
      <Markdown markdownStyles={inactiveMarkdownStyles}>
        {t('tracing:inactiveMessage')}
      </Markdown>
      <Spacing s={20} />
      <Text style={styles.bold}>{t('tracing:turnOn1')}</Text>
      <Spacing s={20} />
      <Text style={styles.bold}>{t('tracing:turnOn2')}</Text>
      <Spacing s={20} />
      <GoToSettings />
      <Spacing s={40} />
      <Text style={styles.text}>{t('tracing:inactiveMessage1')}</Text>
    </>
  );

  const pausedReminderTime = `${format(pauseDate, 'HH:mm')} ${
    isToday(pauseDate)
      ? t('common:today')
      : isTomorrow(pauseDate)
      ? t('common:tomorrow')
      : ''
  }`;

  const renderPaused = () => (
    <>
      <Text style={[styles.text, styles.heading, styles.notActive]}>
        {t('tracing:status:heading')}
      </Text>
      <Spacing s={20} />
      <View style={styles.row}>
        <View>
          <Image
            style={styles.moduleImage as ImageStyle}
            source={IconPaused}
            accessibilityIgnoresInvertColors={false}
          />
        </View>
        <View>
          <Text
            style={[
              styles.text,
              styles.heading,
              styles.status,
              styles.notActive
            ]}>
            {t('tracing:paused:title')}
          </Text>
          <Text style={styles.reminder}>
            {t('tracing:paused:reminder')}{' '}
            <Text style={[styles.reminder, styles.underline]}>
              {pausedReminderTime}
            </Text>
          </Text>
        </View>
      </View>
      <Spacing s={20} />
      <Markdown markdownStyles={inactiveMarkdownStyles}>
        {t('tracing:paused:text')}
      </Markdown>
    </>
  );

  return (
    <ScrollView style={styles.container}>
      <ModalHeader
        icon={TracingIcon}
        heading={'tracing:heading'}
        accessibilityHint={
          paused
            ? t('tracing:paused:heading', {time: pausedReminderTime})
            : t('tracing:heading')
        }
        color={colors.darkGreen}
      />
      <Spacing s={34} />
      <View style={styles.content}>
        {contacts && contacts.length > 0 && (
          <>
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate(ScreenNames.closeContact)}>
              <View style={[styles.module, styles.notification]}>
                <Text
                  style={[
                    styles.text,
                    styles.heading,
                    styles.notificationHeading
                  ]}>
                  {t('tracing:notificationTitle')}
                </Text>
                <Spacing s={26} />
                <Markdown markdownStyles={markdownStyles}>
                  {t('tracing:notificationBody')}
                </Markdown>
              </View>
            </TouchableWithoutFeedback>
            <Spacing s={55} />
          </>
        )}
        <Illustration
          source={TracingIllustration}
          accessibilityIgnoresInvertColors={false}
          accessibilityHint={t('tracing:accessibility:illustrationAlt')}
        />
        <Spacing s={43} />
        <Text style={styles.body}>{t('tracing:body')}</Text>
        <Spacing s={34} />
        <View
          ref={focusRef}
          accessibilityHint={
            paused
              ? t('tracing:paused:heading', {time: pausedReminderTime})
              : t('tracing:heading')
          }
          style={[
            styles.module,
            tracingActive && !paused ? styles.active : styles.notActive
          ]}>
          {paused
            ? renderPaused()
            : tracingActive
            ? renderActive()
            : renderInactive()}
        </View>
        <Spacing s={20} />
        {!paused && enabled && (
          <Button
            type="secondary"
            textColor={colors.darkGreen}
            onPress={() => navigation.navigate(ScreenNames.pause)}
            style={styles.button}
            buttonStyle={styles.buttonStyle}>
            {t('tracing:buttonLabel')}
          </Button>
        )}

        {paused && (
          <Button
            type="inverted"
            style={styles.button}
            onPress={async () => {
              await start();
              deleteReminder();
            }}>
            {t('tracing:paused:buttonLabel')}
          </Button>
        )}
      </View>
      <Spacing s={120} />
    </ScrollView>
  );
};

const inactiveMarkdownStyles = StyleSheet.create({
  text: {
    ...text.default,
    color: colors.black,
    fontSize: 15,
    lineHeight: 25
  },
  // @ts-ignore
  strong: {
    ...text.defaultBold
  }
});

const markdownStyles = StyleSheet.create({
  text: {
    ...text.default,
    color: colors.black,
    fontSize: 25,
    lineHeight: 35
  },
  // @ts-ignore
  strong: {
    ...text.defaultBold
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 65 : 30,
    paddingLeft: 45,
    paddingRight: 45
  },
  content: {
    flex: 1,
    alignItems: 'center'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  body: {
    ...text.medium,
    color: colors.darkGreen,
    textAlign: 'center'
  },
  heading: {
    fontWeight: 'bold'
  },
  active: {
    ...text.defaultBold,
    color: colors.darkGreen,
    borderColor: colors.darkGreen
  },
  notActive: {
    ...text.defaultBold,
    color: colors.black,
    borderColor: colors.black
  },
  // @ts-ignore
  status: {
    ...text.defaultBold,
    fontSize: 25,
    lineHeight: 30
  },
  text: {
    ...text.xsmall,
    lineHeight: 20
  },
  module: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 10,
    flex: 1,
    padding: 30,
    width: '100%'
  },
  moduleImage: {
    marginRight: 11,
    width: 41,
    height: 41
  },
  notification: {
    borderColor: colors.red,
    backgroundColor: colors.white
  },
  // @ts-ignore
  notificationHeading: {
    color: colors.red,
    ...text.defaultBold,
    fontSize: 15,
    lineHeight: 25
  },
  bold: {
    fontWeight: 'bold'
  },
  button: {
    width: '100%'
  },
  buttonStyle: {
    backgroundColor: 'transparent',
    borderColor: colors.darkGreen,
    borderStyle: 'solid',
    borderWidth: 1
  },
  reminder: {
    ...text.defaultBold,
    color: colors.red,
    paddingRight: SPACING_HORIZONTAL
  },
  underline: {
    textDecorationColor: colors.red,
    textDecorationLine: 'underline'
  }
});

import React, {FC} from 'react';
import {StyleSheet, View, Animated} from 'react-native';
import {
  useExposure,
  StatusState
} from 'react-native-exposure-notification-service';

import colors from '../../constants/colors';
import {Tile} from './tile';
import Spacing from '../atoms/spacing';
import {ScreenNames} from '../../navigation';
import {useReminder} from '../../providers/reminder';

const TracingIcon = require('../../assets/images/tracing/image.png');
const InactiveTracingIcon = require('../../assets/images/tracing-inactive/white/image.png');
const ContactTracingIcon = require('../../assets/images/tracing-contact/image.png');
const CommentIcon = require('../../assets/images/icon-comment/image.png');
const CommunityIcon = require('../../assets/images/icon-community-white/image.png');
const JarIcon = require('../../assets/images/icon-jar/image.png');
const PausedIcon = require('../../assets/images/grid-paused/image.png');

interface Grid {
  onboarded: Boolean;
  stage: Number;
  opacity: Animated.Value;
  onboardingCallback?: () => void;
}

export const Grid: FC<Grid> = ({
  onboarded,
  stage,
  opacity,
  onboardingCallback
}) => {
  const {contacts, enabled, status} = useExposure();
  const {paused} = useReminder();
  const hasContact = contacts && contacts.length > 0;
  const active = enabled && status.state === StatusState.active;

  const tracingIcon = hasContact
    ? ContactTracingIcon
    : paused
    ? PausedIcon
    : active
    ? TracingIcon
    : InactiveTracingIcon;

  const tracingLabel = hasContact
    ? 'dashboard:tracing:contact'
    : paused
    ? 'dashboard:tracing:paused'
    : 'dashboard:tracing:label';

  const tracingHint = hasContact
    ? 'dashboard:tracing:contact'
    : paused
    ? 'dashboard:tracing:pausedHint'
    : active
    ? 'dashboard:tracing:active'
    : 'dashboard:tracing:inactive';

  const tracingBackground = hasContact
    ? colors.red
    : paused
    ? colors.lightGray
    : active
    ? colors.darkGreen
    : colors.black;

  if (!onboarded) {
    return (
      <Animated.View style={[styles.container, {opacity}]}>
        <View style={styles.column}>
          {stage === 0 && (
            <Tile
              backgroundColor={tracingBackground}
              label={tracingLabel}
              hint={tracingHint}
              accessibilityHint={`dashboard:tourButtons:screen${stage}`}
              image={tracingIcon}
              minHeight={195}
              link={ScreenNames.tracing}
              onboardingCallback={onboardingCallback}
            />
          )}
          {stage === 2 && (
            <Tile
              accessibilityHint={`dashboard:tourButtons:screen${stage}`}
              backgroundColor={colors.cream}
              label="dashboard:about:label"
              invertText
              image={CommentIcon}
              link={ScreenNames.about}
              onboardingCallback={onboardingCallback}
            />
          )}
          {stage === 1 && (
            <Tile
              backgroundColor={colors.blue}
              accessibilityHint={`dashboard:tourButtons:screen${stage}`}
              label="dashboard:community:label"
              image={CommunityIcon}
              link={ScreenNames.community}
              onboardingCallback={onboardingCallback}
            />
          )}
          {stage === 3 && (
            <Tile
              accessibilityHint={`dashboard:tourButtons:screen${stage}`}
              backgroundColor={colors.grassGreen}
              label="dashboard:test:label"
              invertText
              image={JarIcon}
              minHeight={195}
              link={ScreenNames.tests}
              onboardingCallback={onboardingCallback}
            />
          )}
        </View>
        <View style={styles.spacer} />
        <View style={styles.column} />
      </Animated.View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.column}>
        <Tile
          backgroundColor={tracingBackground}
          label={tracingLabel}
          hint={hasContact ? undefined : tracingHint}
          image={tracingIcon}
          minHeight={195}
          link={ScreenNames.tracing}
          additionalLabel={
            hasContact ? 'dashboard:tracing:contactHint' : undefined
          }
        />
        <Spacing s={15} />
        <Tile
          backgroundColor={colors.cream}
          label="dashboard:about:label"
          invertText
          image={CommentIcon}
          link={ScreenNames.about}
        />
      </View>
      <View style={styles.spacer} />
      <View style={styles.column}>
        <Tile
          backgroundColor={colors.blue}
          label="dashboard:community:label"
          image={CommunityIcon}
          link={ScreenNames.community}
        />
        <Spacing s={15} />
        <Tile
          backgroundColor={colors.grassGreen}
          label="dashboard:test:label"
          invertText
          image={JarIcon}
          minHeight={195}
          link={ScreenNames.tests}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    paddingLeft: 45,
    paddingRight: 45
  },
  column: {
    flex: 1,
    flexDirection: 'column'
  },
  spacer: {
    width: 15
  }
});

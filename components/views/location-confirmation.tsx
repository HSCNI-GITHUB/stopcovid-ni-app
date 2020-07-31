import React, {FC, useRef, useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  Animated,
  Alert,
  findNodeHandle,
  AccessibilityInfo
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {StackNavigationProp} from '@react-navigation/stack';

import Spacing from '../atoms/spacing';
import Button from '../atoms/button';
import colors from '../../constants/colors';
import {ScreenNames} from '../../navigation';
import {text} from '../../theme';

const LogoImage = require('../../assets/images/logo/logo.png');
const OnboardingGroup = require('../../assets/images/onboarding-group/image.png');
const MapBackground = require('../../assets/images/map/image.png');
const WaveBackground = require('../../assets/images/wave/image.png');

interface LocationConfirmationProps {
  navigation: StackNavigationProp<any>;
}

const {width, height} = Dimensions.get('window');
const MAP_WIDTH = 357;
const MAP_HEIGHT = 655;

const WAVE_WIDTH = 375;
const WAVE_HEIGHT = 332;

const GROUP_WIDTH = 301;
const GROUP_HEIGHT = 293;

export const LocationConfirmation: FC<LocationConfirmationProps> = ({
  navigation
}) => {
  const {t} = useTranslation();
  const position = useRef(new Animated.Value(height + 100)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const group = useRef(new Animated.Value(0)).current;
  const ref = useRef<any>();
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    Animated.stagger(200, [
      Animated.timing(opacity, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true
      }),
      Animated.timing(group, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true
      }),
      Animated.timing(position, {
        toValue: 2,
        duration: 700,
        useNativeDriver: true
      })
    ]).start();
  });

  useEffect(() => {
    if (ref.current) {
      const tag = findNodeHandle(ref.current);
      if (tag) {
        setTimeout(() => AccessibilityInfo.setAccessibilityFocus(tag), 200);
      }
    }
  });

  const handleNo = () => {
    setPressed(true);
    Alert.alert(
      t('locationConfirmation:noAlert:title'),
      t('locationConfirmation:noAlert:body'),
      [
        {
          text: t('locationConfirmation:noAlert:action'),
          style: 'default',
          onPress: () => {
            setPressed(false);
          }
        }
      ]
    );
  };

  return (
    <>
      <View
        ref={ref}
        style={styles.background}
        accessible={true}
        accessibilityHint={t('viewNames:location')}>
        <Animated.Image
          style={[
            styles.map,
            {width, height: (width * MAP_HEIGHT) / MAP_WIDTH},
            opacity
          ]}
          width={width}
          height={(width * MAP_HEIGHT) / MAP_WIDTH}
          source={MapBackground}
          accessibilityIgnoresInvertColors={false}
          resizeMode="contain"
        />
      </View>
      <View testID="welcome" style={[styles.container]}>
        <View style={styles.layer}>
          <Image
            source={LogoImage}
            accessibilityIgnoresInvertColors={false}
            resizeMode="center"
          />
        </View>
        <View style={styles.group}>
          <Animated.Image
            style={{
              width,
              height: (width * GROUP_HEIGHT) / GROUP_WIDTH,
              opacity: group
            }}
            width={width}
            height={(width * GROUP_HEIGHT) / GROUP_WIDTH}
            source={OnboardingGroup}
            accessibilityIgnoresInvertColors={false}
            resizeMode="center"
          />
        </View>
        <Animated.View
          style={(styles.bottom, {transform: [{translateY: position}]})}>
          <View style={styles.bottomContainer}>
            <Image
              style={[
                styles.wave,
                {width, height: (width * WAVE_HEIGHT) / WAVE_WIDTH}
              ]}
              width={width}
              height={(width * WAVE_HEIGHT) / WAVE_WIDTH}
              source={WaveBackground}
              accessibilityIgnoresInvertColors={false}
              resizeMode="contain"
            />
            <Spacing s={20} />
            <Text style={styles.notice}>
              {t('locationConfirmation:notice')}
            </Text>
            <Spacing s={20} />
            <Text style={styles.viewText}>
              {t('locationConfirmation:description')}
            </Text>
            <Spacing s={20} />
            <Text style={styles.notice}>
              {t('locationConfirmation:question')}
            </Text>
            <Spacing s={38} />
            <Button
              disabled={pressed}
              type="inverted"
              onPress={() => {
                setPressed(true);
                navigation.replace(ScreenNames.onboarding);
              }}
              hint={t('common:yes:hint')}
              label={t('common:yes:label')}>
              {t('common:yes:label')}
            </Button>
            <Spacing s={24} />
            <Button
              disabled={pressed}
              type="link"
              onPress={handleNo}
              hint={t('common:no:hint')}
              label={t('common:no:label')}>
              {t('common:no:label')}
            </Button>
            <Spacing s={24} />
          </View>
        </Animated.View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    zIndex: 10
  },
  notice: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 20,
    lineHeight: 30,
    textAlign: 'center'
  },
  viewText: {
    ...text.small,
    color: colors.black,
    textAlign: 'center'
  },
  bottom: {
    backgroundColor: colors.white,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 20,
    width: '100%'
  },
  bottomContainer: {
    paddingHorizontal: 45,
    paddingBottom: 30,
    backgroundColor: colors.white
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 10,
    backgroundColor: colors.teal,
    flex: 1,
    justifyContent: 'flex-end'
  },
  layer: {
    position: 'relative',
    zIndex: 20,
    paddingTop: 60,
    alignItems: 'center'
  },
  wave: {
    position: 'absolute',
    top: -40,
    left: 0,
    right: 0,
    height: 400
  },
  map: {
    right: 18
  },
  group: {
    flex: 1
  }
});

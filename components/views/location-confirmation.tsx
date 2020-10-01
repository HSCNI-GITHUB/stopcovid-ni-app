import React, {FC, useRef, useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Animated,
  Alert,
  ScrollView,
  Platform
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {StackNavigationProp} from '@react-navigation/stack';

import Spacing from '../atoms/spacing';
import Button from '../atoms/button';
import {ScreenNames} from '../../navigation';
import {text} from '../../theme';
import {useAccessibilityElement} from '../../hooks';

const LogoImage = require('../../assets/images/logo/logo.png');
const Illustration = require('../../assets/images/location-illustration/image.png');

interface LocationConfirmationProps {
  navigation: StackNavigationProp<any>;
}

export const LocationConfirmation: FC<LocationConfirmationProps> = ({
  navigation
}) => {
  const {t} = useTranslation();
  const {focusRef, focusAccessibleElement} = useAccessibilityElement(200);
  const opacity = useRef(new Animated.Value(0)).current;
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    Animated.stagger(200, [
      Animated.timing(opacity, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true
      })
    ]).start();
  });

  useEffect(focusAccessibleElement, [focusAccessibleElement]);

  const handleNo = () => {
    setPressed(true);
    Alert.alert(
      t(`locationConfirmation:noAlert:title:${Platform.OS}`),
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
        ref={focusRef}
        accessible
        accessibilityHint={t('viewNames:location')}
        style={styles.accessibilityView}
      />
      <ScrollView testID="welcome" style={styles.container}>
        <View style={[styles.center, styles.logoContainer]}>
          <Image
            source={LogoImage}
            accessibilityIgnoresInvertColors={false}
            resizeMode="center"
          />
        </View>
        <View style={[styles.center, styles.group]}>
          <Animated.Image
            style={{
              opacity
            }}
            source={Illustration}
            accessible
            accessibilityHint={t('locationConfirmation:illustrationHint')}
            accessibilityIgnoresInvertColors={false}
            resizeMode="center"
          />
        </View>
        <Spacing s={34} />
        <Text style={styles.notice}>{t('locationConfirmation:notice')}</Text>
        <Spacing s={25} />
        <Text style={styles.viewText}>
          {t('locationConfirmation:description')}
        </Text>
        <Spacing s={25} />
        <Text style={styles.notice}>{t('locationConfirmation:question')}</Text>
        <Spacing s={38} />
        <Button
          disabled={pressed}
          variant="small"
          onPress={() => {
            navigation.push(ScreenNames.onboarding);
          }}
          hint={t('common:yes:hint')}
          label={t('common:yes:label')}>
          {t('common:yes:label')}
        </Button>
        <Spacing s={10} />
        <Button
          type="secondary"
          variant="small"
          disabled={pressed}
          onPress={handleNo}
          hint={t('common:no:hint')}
          label={t('common:no:label')}>
          {t('common:no:label')}
        </Button>
        <Spacing s={24} />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 45
  },
  notice: {
    ...text.medium,
    textAlign: 'center'
  },
  viewText: {
    ...text.small,
    textAlign: 'center'
  },
  center: {alignItems: 'center'},
  logoContainer: {
    paddingTop: 60
  },
  group: {
    paddingTop: 30
  },
  accessibilityView: {
    ...StyleSheet.absoluteFillObject
  }
});

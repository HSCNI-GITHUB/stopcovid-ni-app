import React, {FC, useRef, useEffect, useState} from 'react';
import {StyleSheet, View, Text, Image, Animated, Alert} from 'react-native';
import {useTranslation} from 'react-i18next';
import {StackNavigationProp} from '@react-navigation/stack';

import Spacing from '../atoms/spacing';
import Button from '../atoms/button';
import {text} from '../../theme';
import {ScreenNames} from '../../navigation';
import {useApplication, UserAgeGroup} from '../../providers/context';
import {useAccessibilityElement} from '../../hooks';

const LogoImage = require('../../assets/images/logo/logo.png');

interface AgeConfirmationProps {
  navigation: StackNavigationProp<any>;
}

export const AgeConfirmation: FC<AgeConfirmationProps> = ({navigation}) => {
  const {t} = useTranslation();
  const {setContext} = useApplication();
  const {focusRef, focusAccessibleElement} = useAccessibilityElement(200);
  const opacity = useRef(new Animated.Value(0)).current;
  const opacity1 = useRef(new Animated.Value(0)).current;
  const opacity2 = useRef(new Animated.Value(0)).current;
  const opacity3 = useRef(new Animated.Value(0)).current;
  const opacity4 = useRef(new Animated.Value(0)).current;
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    Animated.stagger(100, [
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true
      }),
      Animated.timing(opacity1, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true
      }),
      Animated.timing(opacity2, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true
      }),
      Animated.timing(opacity3, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true
      }),
      Animated.timing(opacity4, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true
      })
    ]).start();
  });

  useEffect(() => focusAccessibleElement(), [focusAccessibleElement]);

  const handleUnder = () => {
    setPressed(true);
    Alert.alert(
      t('ageRequirement:underAlert:title'),
      t('ageRequirement:underAlert:body'),
      [
        {
          text: t('ageRequirement:underAlert:action'),
          style: 'default',
          onPress: () => {
            setPressed(false);
          }
        }
      ]
    );
  };

  const handleAgeGroupClick = async (ageGroup: UserAgeGroup) => {
    await setContext({
      user: {
        ageGroup
      }
    });
  };

  return (
    <>
      <View
        ref={focusRef}
        accessible
        accessibilityHint={t('viewNames:age')}
        style={styles.accessibilityView}
      />
      <View testID="welcome" style={styles.stretch}>
        <View style={styles.logoContainer}>
          <Image
            source={LogoImage}
            accessibilityIgnoresInvertColors={false}
            resizeMode="center"
          />
        </View>
        <View style={[styles.stretch, styles.content]}>
          <Animated.View style={{opacity}}>
            <Text style={[styles.notice]} accessibilityRole="header">
              {t('ageRequirement:notice')}
            </Text>
          </Animated.View>
          <Spacing s={38} />
          <Animated.View style={{opacity: opacity1}}>
            <Button
              variant="small"
              disabled={pressed}
              onPress={async () => {
                await handleAgeGroupClick(UserAgeGroup.ageGroup1);
                navigation.replace(ScreenNames.locationConfirmation);
              }}
              hint={t('ageRequirement:button:ageGroup1:hint')}
              label={t('ageRequirement:button:ageGroup1:label')}>
              {t('ageRequirement:button:ageGroup1:label')}
            </Button>
          </Animated.View>
          <Spacing s={20} />
          <Animated.View style={{opacity: opacity2}}>
            <Button
              variant="small"
              disabled={pressed}
              onPress={async () => {
                await handleAgeGroupClick(UserAgeGroup.ageGroup2);
                navigation.push(ScreenNames.ageSorting);
              }}
              hint={t('ageRequirement:button:ageGroup2:hint')}
              label={t('ageRequirement:button:ageGroup2:label')}>
              {t('ageRequirement:button:ageGroup2:label')}
            </Button>
          </Animated.View>
          <Spacing s={20} />
          <Animated.View style={{opacity: opacity3}}>
            <Button
              variant="small"
              disabled={pressed}
              onPress={async () => {
                await handleAgeGroupClick(UserAgeGroup.ageGroup3);
                navigation.push(ScreenNames.ageSorting);
              }}
              hint={t('ageRequirement:button:ageGroup3:hint')}
              label={t('ageRequirement:button:ageGroup3:label')}>
              {t('ageRequirement:button:ageGroup3:label')}
            </Button>
          </Animated.View>
          <Spacing s={20} />
          <Animated.View style={{opacity: opacity4}}>
            <Button
              type="secondary"
              variant="small"
              disabled={pressed}
              onPress={handleUnder}
              hint={t('ageRequirement:button:under:hint')}
              label={t('ageRequirement:button:under:label')}>
              {t('ageRequirement:button:under:label')}
            </Button>
          </Animated.View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  stretch: {
    flex: 1
  },
  logoContainer: {
    position: 'absolute',
    width: '100%',
    paddingTop: 60,
    alignItems: 'center'
  },
  content: {
    justifyContent: 'center',
    paddingHorizontal: 45
  },
  notice: {
    ...text.medium,
    textAlign: 'center'
  },
  accessibilityView: {
    ...StyleSheet.absoluteFillObject
  }
});

import React, {FC, useRef, useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Animated,
  ScrollView
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';

import Spacing from '../atoms/spacing';
import Button from '../atoms/button';
import {ScreenNames} from '../../navigation';
import {text} from '../../theme';
import {useAgeGroupTranslation, useAccessibilityElement} from '../../hooks';
import {useApplication, UserAgeGroup} from '../../providers/context';
import colors from '../../constants/colors';

const LogoImage = require('../../assets/images/logo/logo.png');
const AgeGroup2Illustration = require('../../assets/images/age-sorting-age-group-2-illustration/image.png');
const AgeGroup3Illustration = require('../../assets/images/age-sorting-age-group-3-illustration/image.png');

interface AgeSortingProps {
  navigation: StackNavigationProp<any>;
}

export const AgeSorting: FC<AgeSortingProps> = ({navigation}) => {
  const {user} = useApplication();
  const {focusRef, focusAccessibleElement} = useAccessibilityElement(200);
  const opacity = useRef(new Animated.Value(0)).current;
  const [pressed, setPressed] = useState(false);
  const {getTranslation} = useAgeGroupTranslation();

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

  const handleBack = () => {
    setPressed(true);
    navigation.pop();
  };

  return (
    <>
      <View
        ref={focusRef}
        accessible
        accessibilityHint={getTranslation('viewNames:ageSorting')}
        style={styles.accessibilityView}
      />
      <View
        style={[
          styles.bg,
          user?.ageGroup === UserAgeGroup.ageGroup2
            ? styles.ageGroup2
            : styles.ageGroup3
        ]}
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
            source={
              user?.ageGroup === UserAgeGroup.ageGroup2
                ? AgeGroup2Illustration
                : AgeGroup3Illustration
            }
            accessible
            accessibilityHint={getTranslation('ageSorting:illustrationHint')}
            accessibilityIgnoresInvertColors={false}
            resizeMode="center"
          />
        </View>
        <Spacing s={55} />
        <Text style={styles.notice}>{getTranslation('ageSorting:notice')}</Text>
        <Spacing s={25} />
        <Text style={styles.viewText}>
          {getTranslation('ageSorting:description')}
        </Text>
        <Spacing s={38} />
        <Button
          disabled={pressed}
          variant="small"
          onPress={() => {
            setPressed(true);
            navigation.reset({
              routes: [{name: ScreenNames.locationConfirmation}]
            });
          }}
          label={getTranslation('ageSorting:nextLabel')}>
          {getTranslation('ageSorting:nextLabel')}
        </Button>
        <Spacing s={10} />
        <Button
          type="secondary"
          variant="small"
          disabled={pressed}
          onPress={handleBack}
          label={getTranslation('ageSorting:backLabel')}>
          {getTranslation('ageSorting:backLabel')}
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
  },
  bg: {
    ...StyleSheet.absoluteFillObject
  },
  ageGroup2: {
    backgroundColor: colors.teal
  },
  ageGroup3: {
    backgroundColor: colors.darkRed
  }
});

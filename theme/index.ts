import {Dimensions} from 'react-native';

import getTextStyles from './text';
import {getBaseStyles} from './base-styles';

const SCREEN_HEIGHT = Dimensions.get('window').height;
export const SCREEN_WIDTH = Dimensions.get('window').width;
const REF_HEIGHT = 667;

const text = getTextStyles(scale);
const baseStyles = getBaseStyles();

function scale(value: number): number {
  const ratio = value / REF_HEIGHT;
  return Math.min(Math.round(ratio * SCREEN_HEIGHT), value);
}

export {scale, baseStyles, text};

import {useRef, useCallback} from 'react';
import {AccessibilityInfo, findNodeHandle} from 'react-native';
import {useIsFocused} from '@react-navigation/native';

import {useApplication} from '../providers/context';

export function useAccessibilityElement(timeout = 250) {
  const {
    accessibility: {screenReaderEnabled}
  } = useApplication();
  const focusRef = useRef<any>();
  const isFocused = useIsFocused();

  const focusAccessibleElement = useCallback(() => {
    if (screenReaderEnabled && focusRef.current && isFocused) {
      const tag = findNodeHandle(focusRef.current);
      if (tag) {
        const id = setTimeout(
          () => AccessibilityInfo.setAccessibilityFocus(tag),
          timeout
        );
        return () => clearTimeout(id);
      }
    }
  }, [screenReaderEnabled, timeout, isFocused]);

  return {focusRef, focusAccessibleElement};
}

import React from 'react';
import {NavigationContainerRef} from '@react-navigation/native';

export const isMountedRef = React.createRef<boolean>();

export const navigationRef = React.createRef<NavigationContainerRef>();

export enum ScreenNames {
  dashboard = 'dashboard',
  ageConfirmation = 'ageConfirmation',
  locationConfirmation = 'locationConfirmation',
  ageSorting = 'ageSorting',
  tracing = 'tracing',
  about = 'about',
  community = 'community',
  settings = 'settings',
  onboarding = 'onboarding',
  closeContact = 'closeContact',
  tests = 'tests',
  testsAdd = 'testsAdd',
  testsResult = 'testsResult',
  terms = 'terms',
  dataPolicy = 'dataPolicy',
  usage = 'usage',
  leave = 'leave',
  debug = 'debug',
  askPermissions = 'permissions-info',
  pause = 'pause',
  yourDataModal = 'yourDataModal',
  testResultModal = 'testResultModal',
  privacyModal = 'privacyModal'
}

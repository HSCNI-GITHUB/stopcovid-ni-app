import colors from '../constants/colors';

export default (scale: (v: number) => number) => ({
  default: {
    fontFamily: 'aktiv',
    fontSize: scale(16),
    color: colors.black
  },
  defaultBold: {
    fontFamily: 'aktiv-bold',
    fontWeight: 'bold'
  },
  xsmall: {
    fontFamily: 'aktiv',
    fontSize: scale(13)
  },
  small: {
    fontFamily: 'aktiv',
    fontSize: scale(15),
    lineHeight: scale(25),
    color: colors.white
  },
  smallBold: {
    fontFamily: 'aktiv-bold',
    fontWeight: 'bold',
    fontSize: scale(15),
    lineHeight: scale(25),
    color: colors.white
  },
  medium: {
    fontFamily: 'aktiv',
    fontSize: scale(20),
    lineHeight: scale(30),
    color: colors.white
  },
  mediumBold: {
    fontFamily: 'aktiv-bold',
    fontSize: scale(20),
    lineHeight: scale(30),
    color: colors.white
  },
  large: {
    fontFamily: 'aktiv',
    fontSize: scale(30),
    color: colors.white
  },
  xxlargeBlack: {
    fontFamily: 'aktiv',
    fontSize: scale(32),
    lineHeight: scale(42),
    letterSpacing: -0.65,
    color: colors.lightBlack
  },
  heading: {
    fontFamily: 'aktiv',
    fontSize: scale(30),
    lineHeight: scale(40),
    letterSpacing: -0.02
  },
  largeBody: {
    fontFamily: 'aktiv',
    fontSize: scale(20),
    lineHeight: scale(30)
  },
  smallBody: {
    fontFamily: 'aktiv',
    fontSize: scale(15),
    lineHeight: scale(25)
  },
  aktiv: {
    fontFamily: 'aktiv'
  }
});

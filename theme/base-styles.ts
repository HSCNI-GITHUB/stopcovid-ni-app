import colors from '../constants/colors';

export const getBaseStyles = () => ({
  label: {
    color: colors.black
  },
  error: {
    color: colors.red
  },
  buttons: {
    back: {
      shadow: colors.lightBlack,
      background: colors.white,
      text: colors.black
    },
    link: {
      shadow: colors.lightBlack,
      background: 'transparent',
      text: colors.black
    },
    inverted: {
      shadow: colors.lightBlack,
      text: colors.white,
      background: colors.black
    },
    default: {
      shadow: colors.lightBlack,
      text: colors.black,
      background: colors.white
    },
    smallRound: {
      shadow: colors.lightBlack,
      text: colors.white,
      background: colors.darkGreen
    }
  }
});

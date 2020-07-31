import React from 'react';
import {StyleSheet} from 'react-native';
import M from 'react-native-easy-markdown';

import colors from '../../constants/colors';

interface Markdown {
  style?: object;
  markdownStyles?: object;
}

const Markdown: React.FC<Markdown> = ({
  style,
  markdownStyles = {},
  children
}) => {
  const combinedStyles = {
    ...localMarkdownStyles,
    ...markdownStyles
  };

  return (
    <M markdownStyles={combinedStyles} style={style}>
      {children}
    </M>
  );
};

const localMarkdownStyles = StyleSheet.create({
  strong: {
    fontWeight: 'bold'
  },
  link: {
    fontWeight: 'bold',
    color: colors.teal
  },
  block: {
    marginBottom: 8
  },
  list: {
    fontSize: 20
  },
  listItem: {
    fontSize: 20,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  listItemContent: {
    lineHeight: 30,
    fontSize: 20,
    flexDirection: 'row',
    flexShrink: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  listItemNumber: {
    lineHeight: 30,
    fontSize: 20,
    marginRight: 10
  }
});

export default Markdown;

import React, {FC, useState} from 'react';
import YoutubePlayer from 'react-native-youtube-iframe';
import * as WebBrowser from 'expo-web-browser';
import {useTranslation} from 'react-i18next';

interface VideoProps {
  videoId: string;
}

export const Video: FC<VideoProps> = ({videoId}) => {
  const [playing, setPlaying] = useState(false);
  const {t} = useTranslation();

  return (
    <YoutubePlayer
      play={playing}
      onChangeState={(event) => {
        if (event === 'playing') {
          setPlaying(true);
        }
      }}
      height={185}
      videoId={videoId}
      webViewProps={{
        accessible: true,
        accessibilityLabel: t('common:youtubeEmbedHint'),
        androidLayerType: 'hardware',
        onShouldStartLoadWithRequest: (request) => {
          if (
            // the url react-native-youtube-iframe uses
            request.url.includes('about:blank') ||
            // the url of the YouTube embed
            request.url.includes(`embed/${videoId}`)
          ) {
            return true;
          } else {
            setPlaying(false);
            WebBrowser.openBrowserAsync(request.url, {
              enableBarCollapsing: true,
              showInRecents: true
            });

            return false;
          }
        },
        startInLoadingState: true
      }}
      // a required prop in react-native-youtube-iframe
      initialPlayerParams={{}}
    />
  );
};

import {View, Text, StyleSheet, Pressable} from 'react-native';

import * as React from 'react';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {theme} from '../utils/theme';
const Sound = require('react-native-sound');
Sound.setCategory('Playback');
export default function SoundCard({
  sound,
  selectedSound,
  setSelectedSound,
  chosenSound,
  setChosenSound,
}) {
  const [playing, setPlaying] = React.useState();
  // play audio

  // var audio = new Sound(sound.url, Sound.MAIN_BUNDLE, error => {
  //   if (error) {
  //     console.log('failed to load the sound', error);
  //     return;
  //   }
  //   // if loaded successfully
  //   console.log(
  //     'duration in seconds: ' +
  //       audio.getDuration() +
  //       'number of channels: ' +
  //       audio.getNumberOfChannels(),
  //   );
  // });

  // React.useEffect(() => {
  //   audio.setVolume(1);
  //   return () => {
  //     audio.release();
  //   };
  // }, []);
  // const playPause = () => {
  //   // let prevAudio = new Sound(chosenSound, Sound.MAIN_BUNDLE, error => {
  //   //   if (error) {
  //   //     console.log('failed to load the sound', error);
  //   //     return;
  //   //   }
  //   //   // if loaded successfully
  //   //   prevAudio.stop();
  //   // });

  //   setChosenSound(sound.url);
  //   if (audio.isPlaying()) {
  //     audio.pause();
  //     setPlaying(false);
  //   } else {
  //     setPlaying(true);
  //     audio.play(success => {
  //       if (success) {
  //         setPlaying(false);
  //         console.log('successfully finished playing');
  //       } else {
  //         setPlaying(false);
  //         console.log('playback failed due to audio decoding errors');
  //       }
  //     });
  //   }
  // };

  return (
    // <Pressable onPress={playPause}>
    <Pressable onPress={() => setChosenSound(sound.url)}>
      <View
        style={
          chosenSound == sound.url ? styles.r_card_selected : styles.r_card
        }>
        <View style={{flex: 6}}>
          <Text
            style={
              chosenSound == sound.url
                ? styles.selected_r_title
                : styles.r_title
            }>
            {sound.name}
          </Text>
        </View>

        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>
            <Ionicons
              name={playing ? 'pause-circle-outline' : 'play-circle-outline'}
              size={30}
              color={
                chosenSound == sound.url ? theme.color.white : theme.color.black
              }
            />
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  r_card: {
    width: '100%',
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
    padding: 16,
    backgroundColor: theme.color.light,
  },
  r_card_selected: {
    width: '100%',
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
    padding: 16,
    backgroundColor: theme.color.primary,
  },
  selected_r_title: {
    fontSize: 16,
    color: theme.color.white,
  },
  r_title: {
    fontSize: 16,
    color: theme.color.black,
  },
});

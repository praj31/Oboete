import React, {useState} from 'react';
import {View, Text, Button, TextInput} from 'react-native';

const F = () => {

  return (
    <>
      <View>
      <Text>New Reminder</Text>
        <TextInput
          value={'Hugo'}
          maxLength={40}
        />
      </View>
    </>
  );
};

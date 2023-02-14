import React from 'react'
import { View ,Text} from 'react-native'

const ListReminder = ({navigation}) => {

    const message = navigation.getParam('reminderData');
    console.log(message);
  return (
    <View>
        <Text>ListReminder</Text>
    </View>
  )
}

export default ListReminder
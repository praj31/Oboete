import * as React from 'react'
import { Pressable, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { theme } from '../utils/theme'
import { useNavigation } from '@react-navigation/native';

export default function HeaderRight() {
    const navigation = useNavigation()
    return <View style={{ flexDirection: 'row' }}>
        <Pressable style={{ marginLeft: 12, padding: 4 }} onPress={() => navigation.navigate('Archive')}>
            <Icon name='trash-bin-outline' size={20} color={theme.color.white} />
        </Pressable>
        <Pressable style={{ marginLeft: 12, padding: 4 }} onPress={() => navigation.navigate('Settings')}>
            <Icon name='settings-outline' size={20} color={theme.color.white} />
        </Pressable>
    </View>
}
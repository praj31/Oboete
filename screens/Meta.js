import * as React from 'react'
import { View, Text } from "react-native";
import { globalStyles } from "../styles/global";
import { generateGreetings } from '../utils/greeting';
import { theme } from '../utils/theme';

export default function Meta() {
    return <View style={globalStyles.container}>
        <View style={globalStyles.header}>
            <Text style={globalStyles.greetings}>{generateGreetings()}</Text>
            <Text style={{ color: theme.color.white, marginTop: 12, marginLeft: 16, opacity: 0.9 }}>Reminders about reminders.</Text>
        </View>
    </View>
}
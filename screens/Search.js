import * as React from 'react'
import { View, Text, TextInput } from "react-native";
import { globalStyles } from "../styles/global";
import { formStyles } from '../styles/form';

export default function Search() {
    return <View style={globalStyles.container}>
        <View style={globalStyles.header}>
            <TextInput style={formStyles.searchbar} placeholder='Search a reminder by title or description' autoFocus />
        </View>
    </View>
}
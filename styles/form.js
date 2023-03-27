import { StyleSheet } from "react-native";
import { theme } from "../utils/theme";

export const formStyles = StyleSheet.create({
    label: {
        color: theme.color.gray,
        marginBottom: 8
    },
    textinput: {
        width: '100%',
        backgroundColor: theme.color.light,
        paddingVertical: 14,
        paddingHorizontal: 10,
        borderRadius: 8,
        marginBottom: 16,
        color: theme.color.black
    },
    actionBtn: {
        paddingVertical: 16,
        paddingHorizontal: 12,
        alignItems: 'center',
        borderRadius: 8,
        marginBottom: 16
    },
    primaryBtn: {
        backgroundColor: theme.color.primary,
    },
    secondaryBtn: {
        borderWidth: 1,
        borderColor: theme.color.primary
    },
    selectBtn: {
        marginVertical: 12,
        alignItems: 'flex-start',
    },
    baseFont: {
        fontSize: 16,
    },
    smallFont: {
        marginVertical: 6,
        fontSize: 12,
        opacity: 0.9
    },
    fontWhite: {
        color: theme.color.white,
    },
    fontBlack: {
        color: theme.color.black,
    },
})
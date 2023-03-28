import { StyleSheet } from "react-native";
import { theme } from "../utils/theme";

export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        backgroundColor: theme.color.white,
    },
    header: {
        width: '100%',
        backgroundColor: theme.color.primary,
        height: 144,
        marginBottom: 32
    },
    inner: {
        width: '100%',
        paddingHorizontal: 16
    },
    imgContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 144
    },
    image: {
        width: 144,
        height: 144,
    },
    prompt: {
        fontSize: 16,
        fontStyle: 'italic',
        marginTop: 16,
        color: theme.color.gray,
    },
    loader: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
        height: 50,
    },
    greetings: {
        fontSize: 32,
        fontWeight: 'bold',
        color: theme.color.white,
        marginLeft: 16,
        marginRight: 16,
        marginTop: 36
    }
});
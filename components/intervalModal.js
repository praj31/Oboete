import * as React from "react";
import {useTranslation} from "react-i18next";
import {
    View,
    Text,
    Pressable,
    TextInput,
    ScrollView,
    StyleSheet
} from "react-native";
import {Picker} from '@react-native-picker/picker';
import {formStyles} from "../styles/form";
import Modal from 'react-native-modal'
import {theme} from "../utils/theme";

export default function IntervalModal({interval, setInterval}) {
    const {t} = useTranslation()
    const [isModalVisible,
        setModalVisible] = React.useState(false)

    const cancelButtonClick = () => {
        setModalVisible(false)
    }
    return (
        <View style={{
            flex: 1,
            marginRight: 10
        }}>
            <Text style={formStyles.label}>Interval</Text>
            <Pressable onPress={() => setModalVisible(!isModalVisible)}>
                <TextInput
                    value={interval}
                    style={formStyles.textinput}
                    editable={false}
                    keyboardType="numeric"
                    onChangeText={setInterval}/>
            </Pressable>
            <Modal
                isVisible={isModalVisible}
                swipeDirection={'down'}
                onSwipeComplete={() => cancelButtonClick()}
                propagateSwipe={true}
                animationInTiming={300}
                animationOutTiming={300}
                onBackButtonPress={cancelButtonClick}
                style={{
                margin: 0,
                justifyContent: 'flex-end'
            }}>
                <View
                    style={{
                    backgroundColor: theme.color.white,
                    borderRadius: 24,
                    height: '70%'
                }}>
                    <View
                        style={{
                        flex: 1,
                        alignItems: 'center',
                        marginBottom: 16,
                        marginTop: 12
                    }}>
                        <View
                            style={{
                            width: 36,
                            height: 8,
                            backgroundColor: theme.color.gray,
                            borderRadius: 12
                        }}></View>
                    </View>
                    <ScrollView
                        showsVerticalScrollIndicator={true}
                        showsHorizontalScrollIndicator={true}
                        style={{
                        paddingHorizontal: 16,
                        marginBottom: 12,
                        height: '100%'
                    }}>
                        <Pressable 
                        onPress={() => setInterval("5")}
                        >
                            <View
                                style={interval == '5'
                                ? styles.r_card_selected
                                : styles.r_card}>
                                <View
                                    style={{
                                    flex: 6
                                }}>
                                    <Text
                                        style={interval == '5'
                                        ? styles.selected_r_title
                                        : styles.r_title}
                                        
                                        >5</Text>
                                </View>

                                <View
                                    style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}></View>
                            </View>
                        </Pressable>
                        <Pressable 
                        onPress={() => setInterval("10")}
                        >
                            <View
                                style={interval == '10'
                                ? styles.r_card_selected
                                : styles.r_card}>
                                <View
                                    style={{
                                    flex: 6
                                }}>
                                    <Text
                                        style={interval == '10'
                                        ? styles.selected_r_title
                                        : styles.r_title}
                                        
                                        >10</Text>
                                </View>

                                <View
                                    style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}></View>
                            </View>
                        </Pressable>
                        <Pressable 
                        onPress={() => setInterval("15")}
                        >
                            <View
                                style={interval == '15'
                                ? styles.r_card_selected
                                : styles.r_card}>
                                <View
                                    style={{
                                    flex: 6
                                }}>
                                    <Text
                                        style={interval == '15'
                                        ? styles.selected_r_title
                                        : styles.r_title}
                                        
                                        >15</Text>
                                </View>

                                <View
                                    style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}></View>
                            </View>
                        </Pressable>
                        <Pressable 
                        onPress={() => setInterval("20")}
                        >
                            <View
                                style={interval == '20'
                                ? styles.r_card_selected
                                : styles.r_card}>
                                <View
                                    style={{
                                    flex: 6
                                }}>
                                    <Text
                                        style={interval == '20'
                                        ? styles.selected_r_title
                                        : styles.r_title}
                                        
                                        >20</Text>
                                </View>

                                <View
                                    style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}></View>
                            </View>
                        </Pressable>
                        <Pressable>
                
            </Pressable>
            <View style={{ flex: 1, marginLeft: 4 }}>
              <Text style={formStyles.label}>Add Custom(max 60)</Text>
              <TextInput
                value={interval}
                inputMode="numeric"
                style={formStyles.textinput}
                keyboardType="numeric"
                onChangeText={(i)=>{
                    if(i<=60){
                        setInterval(i)
                    }
                }}
              />
            </View>
                    </ScrollView>
                </View>
            </Modal>
        </View>
    
    )
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
        backgroundColor: theme.color.light
    },
    r_card_selected: {
        width: '100%',
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 4,
        padding: 16,
        backgroundColor: theme.color.primary
    },
    selected_r_title: {
        fontSize: 16,
        color: theme.color.white
    },
    r_title: {
        fontSize: 16,
        color: theme.color.black
    }
});

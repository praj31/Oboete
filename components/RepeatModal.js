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

export default function RepeatModal({repeat, setRepeat}) {
    const {t} = useTranslation()
    const [isModalVisible,
        setModalVisible] = React.useState(false)

    const cancelButtonClick = () => {
        setModalVisible(false)
    }
    return (
        <View style={{
            flex: 1,
            marginLeft: 10
        }}>
            <Text style={formStyles.label}>Repeat</Text>
            <Pressable onPress={() => setModalVisible(!isModalVisible)}>
                <TextInput
                    value={repeat}
                    style={formStyles.textinput}
                    editable={false}
                    placeholder="0"
                    keyboardType="numeric"
                    onChangeText={setRepeat}/>
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
                        marginTop:12,
                        height: '100%'
                    }}>
                        <Text style={formStyles.label}>Choose Frequency</Text>
                        <Pressable 
                        onPress={() => setRepeat("1")}
                        >
                            <View
                                style={repeat == '1'
                                ? styles.r_card_selected
                                : styles.r_card}>
                                <View
                                    style={{
                                    flex: 6
                                }}>
                                    <Text
                                        style={repeat == '1'
                                        ? styles.selected_r_title
                                        : styles.r_title}
                                        
                                        >1</Text>
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
                        onPress={() => setRepeat("2")}
                        >
                            <View
                                style={repeat == '2'
                                ? styles.r_card_selected
                                : styles.r_card}>
                                <View
                                    style={{
                                    flex: 6
                                }}>
                                    <Text
                                        style={repeat == '2'
                                        ? styles.selected_r_title
                                        : styles.r_title}
                                        
                                        >2</Text>
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
                        onPress={() => setRepeat("3")}
                        >
                            <View
                                style={repeat == '3'
                                ? styles.r_card_selected
                                : styles.r_card}>
                                <View
                                    style={{
                                    flex: 6
                                }}>
                                    <Text
                                        style={repeat == '3'
                                        ? styles.selected_r_title
                                        : styles.r_title}
                                        
                                        >3</Text>
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
                        onPress={() => setRepeat("4")}
                        >
                            <View
                                style={repeat == '4'
                                ? styles.r_card_selected
                                : styles.r_card}>
                                <View
                                    style={{
                                    flex: 6
                                }}>
                                    <Text
                                        style={repeat == '4'
                                        ? styles.selected_r_title
                                        : styles.r_title}
                                        
                                        >4</Text>
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
            <View style={{ flex: 1, marginLeft: 4,marginTop: 12, }}>
              <Text style={formStyles.label}>Custom(max 10)</Text>
              <TextInput
                value={repeat}
                inputMode="numeric"
                style={formStyles.textinput}
                keyboardType="numeric"
                onChangeText={(i)=>{
                    if(i<=10){
                        setRepeat(i)
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

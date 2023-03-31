import * as React from "react";
import { useTranslation } from "react-i18next";
import { View, Text, Pressable, TextInput, ScrollView } from "react-native";
import { formStyles } from "../styles/form";
import Modal from 'react-native-modal'
import { theme } from "../utils/theme";

export default function AlarmTypeModal({
    alarmType,
    setAlarmType
}) {
    const { t } = useTranslation()
    const [isModalVisible, setModalVisible] = React.useState(false)

    const cancelButtonClick = () => {
        setModalVisible(false)
    }

    return (
        <View style={{ flex: 1 }}>
            <Text style={formStyles.label}>{t('AddReminder:alarmType')}</Text>
            <Pressable onPress={() => setModalVisible(!isModalVisible)}>
                <TextInput
                    value={alarmType}
                    style={formStyles.textinput}
                    editable={false}
                />
            </Pressable>
            <Modal
                isVisible={isModalVisible}
                swipeDirection={'down'}
                onSwipeComplete={() => cancelButtonClick()}
                propagateSwipe={true}
                animationInTiming={300}
                animationOutTiming={300}
                onBackButtonPress={cancelButtonClick}
                style={{ margin: 0, justifyContent: 'flex-end' }}
            >
                <View
                    style={{
                        backgroundColor: theme.color.white,
                        borderRadius: 24,
                        height: '70%',
                    }}>
                    <View style={{ flex: 1, alignItems: 'center', marginBottom: 16, marginTop: 12 }}>
                        <View style={{ width: 36, height: 8, backgroundColor: theme.color.gray, borderRadius: 12 }}></View>
                    </View>
                    <ScrollView
                        showsVerticalScrollIndicator={true}
                        showsHorizontalScrollIndicator={true}
                        style={{ paddingHorizontal: 16, marginBottom: 12, height: '100%' }}>
                        <Pressable
                            style={[
                                formStyles.actionBtn,
                                alarmType === 'One-time'
                                    ? formStyles.primaryBtn
                                    : formStyles.secondaryBtn,
                                formStyles.selectBtn,
                            ]}
                            onPress={() => {
                                setAlarmType('One-time');
                            }}>
                            <Text
                                style={[
                                    alarmType === 'One-time'
                                        ? [formStyles.baseFont, formStyles.fontWhite]
                                        : [formStyles.baseFont, formStyles.fontBlack],
                                ]}>
                                {t('AddReminder:oneTime')}
                            </Text>
                            <Text
                                style={[
                                    alarmType === 'One-time'
                                        ? [formStyles.smallFont, formStyles.fontWhite]
                                        : [formStyles.smallFont, formStyles.fontBlack],
                                ]}>
                                {t('AddReminder:oneTimeDescription')}
                            </Text>
                        </Pressable>
                        <Pressable
                            style={[
                                formStyles.actionBtn,
                                alarmType === 'Meta'
                                    ? formStyles.primaryBtn
                                    : formStyles.secondaryBtn,
                                formStyles.selectBtn,
                            ]}
                            onPress={() => {
                                setAlarmType('Meta');
                            }}>
                            <Text
                                style={[
                                    alarmType === 'Meta'
                                        ? [formStyles.baseFont, formStyles.fontWhite]
                                        : [formStyles.baseFont, formStyles.fontBlack],
                                ]}>
                                {t('AddReminder:meta')}
                            </Text>
                            <Text
                                style={[
                                    alarmType === 'Meta'
                                        ? [formStyles.smallFont, formStyles.fontWhite]
                                        : [formStyles.smallFont, formStyles.fontBlack],
                                ]}>
                                {t('AddReminder:metaDescription')}
                            </Text>
                        </Pressable>
                    </ScrollView>
                </View>
            </Modal>
        </View>
    )
}
import * as React from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { globalStyles } from '../styles/global';
import { formStyles } from '../styles/form';
import { useTranslation } from 'react-i18next';
import { getAllKeys, getData } from '../api/storage';
import ReminderCard from '../components/ReminderCard';

export default function Search({ navigation }) {
  const { t } = useTranslation();
  const [query, setQuery] = React.useState("")
  const [events, setEvents] = React.useState([])
  const [reminders, setReminders] = React.useState([])

  React.useEffect(() => {
    async function getAll() {
      const keys = await getAllKeys()
      if (keys) {
        let data = []
        for (let key of keys) {
          const event = await getData(key)
          if (event) {
            data.push({ id: key, ...event })
          }
        }
        setReminders(data)
      }
    }
    getAll()
  }, [])

  React.useEffect(() => {
    if (query === "" || query === " ") setEvents([])
    else {
      const results = reminders.filter(reminder => {
        const words = query.split(" ").join("|")
        const pattern = new RegExp(words, 'gi')
        return reminder.title.match(pattern) !== null || reminder.note.match(pattern) !== null
      })
      setEvents(results)
    }
  }, [query])

  const onClickReminderCard = id => {
    navigation.navigate('ListReminder', { id: id });
  };

  return (
    <View style={globalStyles.container}>
      <View style={globalStyles.header}>
        <TextInput
          value={query}
          onChangeText={setQuery}
          style={formStyles.searchbar}
          placeholder={t('SearchScreen:placeholder')}
          autoFocus
        />
      </View>
      <View style={globalStyles.inner}>
        <ScrollView showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          style={{ height: '100%' }}>
          {events.map(event => <TouchableOpacity
            key={event.id}
            onPress={() => onClickReminderCard(event.id)}>
            <ReminderCard key={event.id} event={event} />
          </TouchableOpacity>)}
        </ScrollView>
      </View>
    </View>
  );
}

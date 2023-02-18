import React,{useEffect, useState} from 'react'
import { View ,Text,StyleSheet,TouchableOpacity,} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { getData,removeKey } from '../api/storage';
import moment from 'moment-timezone';
import {deleteAlarms} from '../api/alarm';
const ListReminder = (props) => {
  const [reminder,setReminder] = useState({});
  const [date,setDate] = useState("")
  const [time,setTime] = useState("")
  const navigation = props.navigation;
  const id = props.route.params.id
  // console.log("id fetched",id);
  React.useEffect(()=>{
    async function fetchData() {
      let reminder = await getData(id); 
      const reminderDate = reminder?.datetime;
      const datetime = moment.utc(reminderDate.slice(0,10));
      setDate(datetime.format("DD:MM:YYYY"))
      setTime(reminderDate.slice(11))
      console.log("date fetched",);
      // console.log("date and time",moment.utc("2013-11-18 11:55").tz("Asia/Taipei").format());
      setReminder(reminder);
    }
    fetchData();
  },[])
  
  const deleteEvent = async id => {
    await deleteAlarms(id);
    await removeKey(id);
    navigation.navigate("Home")
  };
  return (
    <View style = {styles.container}>
      <View style = {styles.reminderCard}>
      <TouchableOpacity style={styles.backBtn} onPress={()=>navigation.navigate('Home')} >
          <Text style={{margin:0}}>
            <Icon name="keyboard-backspace" size={30} color="#111"></Icon>
          </Text>
        </TouchableOpacity>
        <Text style={styles.h1}>Reminder Details</Text>
        </View>
        <View style={styles.detailsCard}>

        <Text style={styles.title}>Title</Text>
        <Text style={styles.value}>{reminder?.title}</Text>
        
        <Text style={styles.title}>Date</Text>
        <Text style={styles.value}>{date}</Text>

        <Text style={styles.title}>Time</Text>
        <Text style={styles.value}>{time}</Text>

        <Text style={styles.title}>Interval</Text>
        <Text style={styles.value}>{reminder.interval} {reminder.interval>=2?"minutes":"minute"}</Text>

        <Text style={styles.title}>Repeat</Text>
        <Text style={styles.value}>{reminder.repeat} {reminder.repeat>=2?"times":"time"}</Text>
        </View>
        <View style={styles.footer}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.actionBtn, styles.deleteBtn]}
            onPress={()=>{deleteEvent(id)}}
            >
            <Text style={{ color: '#fff', fontSize: 16 }}>Delete</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.actionBtn, styles.editBtn]}
            >
            <Text style={{ fontSize: 16, color: '#111' }}>Edit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 48,
    backgroundColor: '#fff',
    padding: 24,
  },
  reminderCard:{
    padding:20,
    flex:1,
    flexDirection:"row",
    maxHeight:100,    
  },
  detailsCard:{
    padding:30,
    paddingTop:0,    
  },

  h1:{
    color:"#111",
    fontSize: 32,
    flex:2,    
    fontWeight:'500',
    paddingTop:5
  },
  backBtn: {
    width: 60,
    height: 60,    
    borderRadius: 8,
    flex:0.25,
    justifyContent:"center",
  },
  title: {
    fontSize: 20,
    color: '#333',
    marginBottom:5,
    fontWeight:'bold'
  },
  value:{
    fontSize: 14,
    color: '#111',
    fontWeight:"500",
    marginBottom:20
  },
  footer: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
    margin: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flex: 1,
    padding: 4,
  },
  actionBtn: {
    padding: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  deleteBtn: {
    backgroundColor: 'red',
  },
  editBtn: {
    borderWidth: 1,
    borderColor: '#333',
    backgroundColor: 'white',
  },
})
export default ListReminder
import React from "react";
import './App.css';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import { TimeField } from '@mui/x-date-pickers/TimeField';
import { useState } from "react";
import dayjs from 'dayjs';


let startTime1,startTime2,startTime4,startTime5,startTime3,lastEndTime;
let userInputArray;
let isAvailableArray = [true,true,true,true,true];

let givenData = [
  {
    "start": "Wed, 03 Mar 2021 04:00:15 GMT",
    "end": "Wed, 03 Mar 2021 05:00:15 GMT"
  },
  {
    "start": "Wed, 03 Mar 2021 06:00:15 GMT",
    "end": "Wed, 03 Mar 2021 06:30:15 GMT"
  },
  {
    "start": "Wed, 03 Mar 2021 08:30:15 GMT",
    "end": "Wed, 03 Mar 2021 09:30:15 GMT"
  },
  {
    "start": "Wed, 03 Mar 2021 09:30:15 GMT",
    "end": "Wed, 03 Mar 2021 09:50:15 GMT"
  },
  {
    "start": "Wed, 03 Mar 2021 12:50:15 GMT",
    "end": "Wed, 03 Mar 2021 13:10:15 GMT"
  },
  {
    "start": "Wed, 03 Mar 2021 11:30:15 GMT",
    "end": "Wed, 03 Mar 2021 12:15:15 GMT"
  },
  {
    "start": "Wed, 03 Mar 2021 13:30:15 GMT",
    "end": "Wed, 03 Mar 2021 14:00:15 GMT"
  },
  {
    "start": "Wed, 03 Mar 2021 15:00:15 GMT",
    "end": "Wed, 03 Mar 2021 15:30:15 GMT"
  }
]

let givenDataStringify=JSON.stringify(givenData);
let givenDataParsed = JSON.parse(givenDataStringify);
let givenDataArray=givenDataParsed.map((element,index) => {
  return {"start":dayjs(element.start),"end":dayjs(element.end)}
})

 

function FindAvailability() {

  const [date, setDate] = useState(dayjs());
  const [time,setTime] = useState(dayjs());
  const [duration, setDuration] = useState('');
  const [startTime,setStartTime] = useState([]);
  const [eventArray,setEventArray] = useState([])
  const [event1,setEvent1] = useState('');
  const [event2,setEvent2] = useState('');
  const [event3,setEvent3] = useState('');
  const [event4,setEvent4] = useState('');
  const [event5,setEvent5] = useState('');
  const [onClickFind,setOnClickFind] = useState(false);
  const [slotAvailable,setSlotAvailable] = useState(isAvailableArray);


var userInputDateTime = (date.year())+"-"+(date.month()+1)+"-"+(date.date())+" "+(time.hour())+":"+(time.minute())
var userInputDayjs=dayjs(userInputDateTime);


  return (
    <div id='main'>
      <h2>FIND A FREE TIME</h2>
      <div id='date-time-picker-div'>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Date"
            value={date}
            onChange={(newDate) => setDate(newDate)}
          />

          <TimeField
          label="Start Time (24 hrs)" 
          format="HH:mm"
          value={time}
          onChange={(newValue) => setTime(newValue)}
          >
          </TimeField>

          <Box sx={{ minWidth: 200 }}>
            <FormControl fullWidth>
              <InputLabel id="duration-input">Duration</InputLabel>
              <Select
                id="duration"
                label="Duration"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              >
                <MenuItem value={5}>5 minutes</MenuItem>
                <MenuItem value={10}>10 minutes</MenuItem>
                <MenuItem value={15}>15 minutes</MenuItem>
                <MenuItem value={20}>20 minutes</MenuItem>
                <MenuItem value={25}>25 minutes</MenuItem>
                <MenuItem value={30}>30 minutes</MenuItem>
                <MenuItem value={35}>35 minutes</MenuItem>
                <MenuItem value={40}>40 minutes</MenuItem>
                <MenuItem value={45}>45 minutes</MenuItem>
                <MenuItem value={50}>50 minutes</MenuItem>
                <MenuItem value={55}>55 minutes</MenuItem>
                <MenuItem value={60}>60 minutes</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </LocalizationProvider>
      </div>
      <Button id='find-button' variant="contained" onClick={isAvailable}>Find</Button>

      {onClickFind ?
      <div id='event-availability-div'>
        <div id='event1' style={slotAvailable[0] ? {background:'green'} : {background:'grey'}}>{event1}</div>
        <div id='event2' style={slotAvailable[1] ? {background:'green'} : {background:'grey'}}>{event2}</div>
        <div id='event3' style={slotAvailable[2] ? {background:'green'} : {background:'grey'}}>{event3}</div>
        <div id='event4' style={slotAvailable[3] ? {background:'green'} : {background:'grey'}}>{event4}</div>
        <div id='event5' style={slotAvailable[4] ? {background:'green'} : {background:'grey'}}>{event5}</div>
      </div>
      : null }
    </div>
  );

  function isAvailable() {
    isAvailableArray = [true,true,true,true,true];
    setSlotAvailable(isAvailableArray);
    setOnClickFind(true);

    
    startTime3=userInputDayjs;
    startTime4=userInputDayjs.add(duration,'minutes');
    startTime5=startTime4.add(duration,'minutes');
    startTime2=startTime3.subtract(duration,'minutes');
    startTime1=startTime2.subtract(duration,'minutes');
    lastEndTime = startTime5.add(duration,'minutes');
  
    
    setEvent1(startTime1.get('hours')+':'+startTime1.get('minutes'))
    setEvent2(startTime2.get('hours')+':'+startTime2.get('minutes'))
    setEvent3(startTime3.get('hours')+':'+startTime3.get('minutes'))
    setEvent4(startTime4.get('hours')+':'+startTime4.get('minutes'))
    setEvent5(startTime5.get('hours')+':'+startTime5.get('minutes'))

    userInputArray = [{"start":startTime1,"end":startTime2},{"start":startTime2,"end":startTime3},{"start":startTime3,"end":startTime4},{"start":startTime4,"end":startTime5},{"start":startTime5,"end":lastEndTime}]

    var availableSlot;
    for(var i=0;i<userInputArray.length;i++) {
        availableSlot = 'true';
      for(var j=0;j<givenDataArray.length;j++) {
        if((((userInputArray[i].start).isBefore(givenDataArray[j].start)) && ((userInputArray[i].end).isBefore(givenDataArray[j].start))) || ((userInputArray[i].start).isAfter(givenDataArray[j].end)) && ((userInputArray[i].end).isAfter(givenDataArray[j].end))) {
           console.log('available')
        }
        else {
             availableSlot='false';
        }
      }
      if(availableSlot == 'false') {
        isAvailableArray[i]=false;
        setSlotAvailable(isAvailableArray);
      }
    }
    
  }

}

export default FindAvailability;
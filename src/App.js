// Importing libraries , used material UI for creating calender, time and drop down component

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

let isAvailableArray = [true,true,true,true,true]; // used for initialising slotAvailable state array
let calcFiveTimeInputs = [-2,-1,0,1,2]; // used in map function to calculate 5 time outputs wrt user input time -> eventArray
let eventDivIndex = [0,1,2,3,4]; // used in map function to optimize display of 5 divisions for 5 time outputs
let eventArray =[]; // initialising eventArray to store 5 time outputs


// Data given -> time slots which are not available
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

let givenDataStringify=JSON.stringify(givenData); // converting given data into string
let givenDataParsed = JSON.parse(givenDataStringify); // parsing string into object

// creating array of objects of given data in dayjs 
let givenDataArray=givenDataParsed.map((element,index) => {
  return {"start":dayjs(element.start),"end":dayjs(element.end)}
})

 

function FindAvailability() {

  const [date, setDate] = useState(dayjs()); 
  const [time,setTime] = useState(dayjs());
  const [duration, setDuration] = useState('');
  const [onClickFind,setOnClickFind] = useState(false);
  const [slotAvailable,setSlotAvailable] = useState(isAvailableArray);


var userInputDateTime = (date.year())+"-"+(date.month()+1)+"-"+(date.date())+" "+(time.hour())+":"+(time.minute())
var userInputDayjs=dayjs(userInputDateTime);  // converting user input time into dayjs format 

// user interface 
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
       
        {eventDivIndex.map((element,index)=> {
        return <div id='event' style={slotAvailable[element] ? {background:'green'} : {background:'grey'}}>{eventArray[element]}</div>
      })
      }
       
      </div>
      : null }
      
    </div>
  );

  function isAvailable() {
    isAvailableArray = [true,true,true,true,true]; //used for initialising slotAvailable state array
    setSlotAvailable(isAvailableArray);
    
    // calculating 5 time outputs in dayjs and storing it in userInputArray
    var userInputArray =calcFiveTimeInputs.map((element,index)=> {
       return {"start" : userInputDayjs.add(duration*element,'minutes'), "end" : userInputDayjs.add(duration*(element+1),'minutes')}
    })
    
    // getting time in "HH:mm" from dayjs format to display in the UI
    eventArray = userInputArray.map((element,index) => {
      return ((element.start).format("HH:mm"));
    })
    setOnClickFind(true);

// in the for loop below each start time and end time (calculated using duration) of the user input is compared with all the given time data (occupied slots) and return if the slot is available or not.

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
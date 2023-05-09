import React, { useState, useEffect } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import { DatePicker } from "@mui/x-date-pickers";
import "react-big-calendar/lib/css/react-big-calendar.css";

export default function TrainingCalendar(){
    const locales = {
        "pt-BR": require("date-fns/locale/pt-BR")
    }

    useEffect(() => {
        getTrainings();
    } ,[])

    const[trainings, setTrainings] = useState([]);
   
    const getTrainings = () =>{
        fetch('https://traineeapp.azurewebsites.net/gettrainings')
        .then(response => response.json())
        .then((data) => {
            const events = data.map((training) => ({
                title: `${training.activity} - ${training.customer.firstname} ${training.customer.lastname} `,
                start: new Date(training.date),
                end: new Date(training.date),
                allDay: true
            }));
            setTrainings(events);
        }); 
    }
     
    const localizer = dateFnsLocalizer({
        format,
        parse,
        startOfWeek,
        getDay,
        locales,
        
    })

return(
    <div>
        <Calendar localizer={localizer} startAccesor="start" endAccessor="end" events={trainings} formats={"HH:mm:ss"}
        style={{height: 500, margin: '50px'}}></Calendar>
    </div>
)
    
}




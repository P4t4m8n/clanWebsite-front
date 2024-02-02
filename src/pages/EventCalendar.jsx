import { useEffect, useRef, useState } from "react"
import { eventService } from "../servies/event.service"
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'

export function EventCalendar() {

    const [userEvents, setUserEvent] = useState([])
    const eventFilter = useRef(eventService.getDefaultFilter())

    useEffect(() => {
        const events = eventService.query(eventFilter.current)
        setUserEvent(events)
    }, [eventFilter.current])

    const handleDateClick = (ev) => {
        console.log("ev:", ev)
    }

    const options = {
        plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
        initialView: 'dayGridMonth',
        weekends: true,
        dateClick:  handleDateClick 
    }

    return (
        <FullCalendar {...options} events={userEvents}></FullCalendar>
    )
}
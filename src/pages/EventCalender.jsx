import React, { useRef, useEffect, useState, useMemo } from 'react'
import { MandatorySvg, OptionalSvg } from '../servies/icon.service'
import { eventService } from '../servies/event.service'
import { EventEditModal } from '../cmps/Events/EventEditModal'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'moment-timezone'
moment.tz.setDefault('America/Los_Angeles')

export function EventCalender() {

    const localizer = momentLocalizer(moment)
    const [events, setEvents] = useState([])
    const [isOpen, setIsOpen] = useState(false)

    const clickEvObj = useRef(null)
    const filterBy = useRef(eventService.getDefaultFilter())

    useEffect(() => {
        loadEvents()

    }, [])

    const loadEvents = async () => {
        try {
            const dbEvents = await eventService.query()
            setEvents(dbEvents)
        } catch (err) { console.log(err) }
    }


    const handleEventClick = (ev) => {
        console.log("evData:", ev)
        clickEvObj.current = ev
        setIsOpen(true)
    }

    const onSaveEvent = async (eventToSave) => {
        // const isNew = newEvent._id ? true : false
        try {
            const updatedEvent = await eventService.save(eventToSave)
            setEvents(prevEvents => ([...prevEvents, updatedEvent]))
        } catch (err) { console.log(err) }
    }


    const onRemoveEvent = async (eventToDel) => {
        try {
            await eventService.remove(eventToDel._id)
            setEvents(prevEvents => prevEvents.filter(event => event._id !== eventToDel._id))
        } catch (err) { console.log(err) }
    }


    return (


        <div className="myCustomHeight">

            {isOpen &&
                <EventEditModal
                    data={clickEvObj.current}
                    onSaveEvent={onSaveEvent}
                    onRemoveEvent={onRemoveEvent}
                    setIsOpen={setIsOpen} />
            }
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                onSelectEvent={handleEventClick}
                onSelectSlot={handleEventClick}
                selectable

            />
        </div>


    )
}


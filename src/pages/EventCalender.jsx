import React, { useRef, useEffect, useState, useMemo } from 'react'
import { MandatorySvg, OptionalSvg } from '../servies/icon.service'
import { eventService } from '../servies/event.service'
import { EventEditModal } from '../cmps/Events/EventEditModal'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import dayjs from 'dayjs';
import { userService } from '../servies/user.service'


export function EventCalender() {

    const [events, setEvents] = useState([])
    const [isOpen, setIsOpen] = useState(false)

    const eventObj = useRef(null)
    const filterBy = useRef(eventService.getDefaultFilter())
    const user = userService.getLoggedinUser()

    useEffect(() => {
        loadEvents()

    }, [])

    const loadEvents = async () => {
        try {
            const dbEvents = await eventService.query()
            setEvents(dbEvents)
        } catch (err) { console.log(err) }
    }


    const handleDateClick = (args) => {
        const event = eventService.getEmptyEvent()
        const start = dayjs(args.date)
        const end = dayjs(args.date)
        const createBy = [{ name: user.username, _id: user._id }]
        eventObj.current = { ...event, start, end, createBy }
        console.log("eventObj.current:", eventObj.current)
        setIsOpen(true)
    }

    const handleEventClick = (args) => {
        const title = args.event._def.title
        let end = dayjs(args.event._instance.range.end)
        let start = dayjs(args.event._instance.range.start)
        eventObj.current = { title, start, end, ...args.event._def.extendedProps }
        setIsOpen(true)

    }


    const onSaveEvent = async (eventToSave) => {

        try {
            const updatedEvent = await eventService.save(eventToSave)
            setEvents(prevEvents => ([...prevEvents, updatedEvent]))
            setIsOpen(false)
        } catch (err) { console.log(err) }
    }


    const onRemoveEvent = async (eventId) => {
        try {
            await eventService.remove(eventId)
            setEvents(prevEvents => prevEvents.filter(event => event._id !== eventId))
            setIsOpen(false)
        } catch (err) { console.log(err) }
    }


    return (

        <div className="myCustomHeight">
            {isOpen &&
                <EventEditModal
                    event={eventObj.current}
                    onSaveEvent={onSaveEvent}
                    onRemoveEvent={onRemoveEvent}
                    setIsOpen={setIsOpen} />
            }
            <div className='demo-app-main'>
                <FullCalendar
                    plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
                    headerToolbar={{
                        left: 'prev,next today',
                        center: 'title',
                        right: 'dayGridMonth,timeGridWeek,timeGridDay'
                    }}
                    initialView="dayGridMonth"
                    events={events}
                    eventClick={handleEventClick}
                    dateClick={handleDateClick}
                />
            </div>
          
        </div>


    )
}


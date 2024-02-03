import { httpService } from './http.service'

const EVENT_URL = 'event/'

export const eventService = {
    query,
    getById,
    remove,
    save,
    getEmptyEvent,
    getDefaultFilter,
    getDateFromObj
}

window.eventService = eventService

function query() {
    return httpService.get(EVENT_URL)
}

function getById(eventId) {
    return httpService.get(EVENT_URL + eventId)
}

function remove(eventId) {
    return httpService.delete(EVENT_URL + eventId)
}

function save(event) {
    const edit = 'edit/'
    if (event._id) return httpService.put(EVENT_URL + edit + event._id, event)
    return httpService.post(EVENT_URL + edit, event)
}

function getEmptyEvent() {
    return {
        unit: { name: '', _id: '' },
        name: '',
        description: '',
        start: { date: '', time: '' },
        end: { date: '', time: '' },
        inviteList: [],
        createBy: { name: '', _id: '' },
        isMandtory: false,
        createAt: Date.now()
    }

}

function getDefaultFilter() {
    return {
        units: [],
        isInvited: false,
        isMandtory: false
    }
}

function getDateFromObj(dateObj) {
    const year = dateObj.getFullYear()
    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0')
    const day = dateObj.getDate().toString().padStart(2, '0')
    const hours = dateObj.getHours().toString().padStart(2, '0')
    const minutes = dateObj.getMinutes().toString().padStart(2, '0')

    return { date: `${year}-${month}-${day}`, time: `${hours}:${minutes}` }
}






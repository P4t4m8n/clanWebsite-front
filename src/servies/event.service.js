import { httpService } from './http.service'

const EVENT_URL = 'event/'

export const eventService = {
    query,
    getById,
    remove,
    update,
    getEmptyEvent,
    getDefaultFilter
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

function update(event) {
    return httpService.put(EVENT_URL + event._id, event)
}

function getEmptyEvent(unit = { name: '', unitId: '' }, CreateBy = { name: '', userId: '' }, name = '', description = ',') {
    return {
        unit,
        name,
        description,
        startDate: '',
        endDate: '',
        inviteList: [],
        CreateBy,
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





import { httpService } from "./http.service"

const BASE_URL = 'unit/'

export const unitService = {
    query,
    getById,
    save,
    remove,
    getEmptyUnit,
    getSubUnits,
    getUnitTypes,
    getAdminstrativeUnits,
    getAvailableJoinUnits,
}

window.cs = unitService

function query(filterBy = {}) {
    return httpService.get(BASE_URL, filterBy)

}

function save(unit) {
    const edit = 'edit/'
    if (unit._id) return httpService.put(BASE_URL + edit + unit._id, unit)
    return httpService.post(BASE_URL + edit, unit)
}

function remove(unitId) {
    return httpService.delete(BASE_URL + unitId)

}

function getById(unitId) {
    return httpService.get(BASE_URL + unitId)
}

function getEmptyUnit(name = '', members = 0, subUnits = [], imgUrl = '', style = {}, description = '', type = '', level = '', parent = '') {
    return {
        name,
        imgUrl,
        subUnits,
        members,
        style,
        description,
        type,
        level,
        parent
    }
}

function getSubUnits() {
    return ['Fire-team', 'Squad', 'Platoon', 'Battalion', 'Division', 'Corps']
}

function getAdminstrativeUnits() {
    return ['DI Office', 'SA Office']
}

function getUnitTypes() {
    return ['Gaming', 'Operation', 'Support']
}

function getAvailableJoinUnits() {
    return [{ name: 'Overwatch', unitId: '65bbf4bf7f12f16367e5bbde' }]
}



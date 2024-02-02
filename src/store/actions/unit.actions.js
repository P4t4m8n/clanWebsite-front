import { unitService } from "../../servies/unit.service"
import { ADD_UNIT, REMOVE_UNIT, SET_UNITS, UPDATE_UNIT } from "../redcuers/unit.redcuer"
import { store } from "../store"


export async function loadUnits() {
    try {
        const units = await unitService.query()
        store.dispatch({ type: SET_UNITS, units })

    } catch (err) {
        console.log('Unit Action -> Cannot load units', err)
        throw err
    }

}

export async function removeUnit(unitId) {
    try {
        await unitService.remove(unitId)
        store.dispatch({ type: REMOVE_UNIT, unitId })
    } catch (err) {
        console.log('Unit Action -> Cannot remove unit', err)
        throw err
    }
}

export async function saveUnit(unit) {

    const type = (unit._id) ? UPDATE_UNIT : ADD_UNIT

    try {
        const savedUnit = await unitService.save(unit)
        store.dispatch({ type: type, unit: savedUnit })
        return savedUnit
    }
    catch (err) {
        console.log('Unit Action -> Cannot save unit', err)
        throw err
    }
}

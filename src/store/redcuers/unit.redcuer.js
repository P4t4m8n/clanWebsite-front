
export const SET_UNITS = 'SET_UNITS'
export const ADD_UNIT = 'ADD_UNIT'
export const UPDATE_UNIT = 'UPDATE_UNIT'
export const REMOVE_UNIT = 'REMOVE_UNIT'

const intialState = {
    units: [],
}

export function unitRedcuer(state = intialState, action = {}) {
    let units

    switch (action.type) {
        case SET_UNITS:
            return { ...state, units: action.units }
        case ADD_UNIT:
            units = [...state.units, action.unit]
            return { ...state, units }
        case UPDATE_UNIT:
            units = state.units.map(unit => (unit._id === action.unit._id) ? action.unit : unit)
        case REMOVE_UNIT:
            units = state.units.filter(unit => unit._id !== action.unitId)
            return { ...state, units }
        default:
            return state
    }
}
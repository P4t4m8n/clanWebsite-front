import { userService } from "../../service/user.service"
import { EDIT_USER, SET_USER } from "../redcuers/user.reducer"
import { store } from "../store"

export async function logout() {
    const user = null
    try {
        await userService.logout()
        store.dispatch({ type: SET_USER, user })
    }
    catch (err) {
        console.log('user action -> Cannot logout', err)
        throw err
    }
}

export async function login(credentials) {

    try {
        const user = await userService.login(credentials)
        store.dispatch({ type: SET_USER, user })
        return user
    }
    catch (err) {
    }
    console.log('user action -> Cannot login', err)
    throw err
}

export async function signup(credentials) {
    try {
        const user = await userService.signup(credentials)
        store.dispatch({ type: SET_USER, user })
        return user
    }
    catch (err) {
        console.log('user action -> Cannot signup', err)
        throw err
    }
}

export async function update(credentials) {
    try {
        const user = await userService.update(credentials)
        store.dispatch({ type: EDIT_USER, user })
        return user
    }
    catch (err) {
        console.log('user action -> Cannot update', err)
        throw err
    }
}

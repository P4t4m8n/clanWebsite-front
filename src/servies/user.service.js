import { storageService } from './async-storage.service'
import { httpService } from './http.service'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'
const AUTH_URL = 'auth/'
const USER_URL = 'user/'

export const userService = {
    login,
    logout,
    signup,
    getLoggedinUser,
    getUsers,
    getById,
    remove,
    update,
    getEmptyCredentials

}

window.userService = userService

function getUsers() {
    return httpService.get(USER_URL)
}

function getById(userId) {
    return httpService.get(USER_URL + userId)
}

function remove(userId) {
    return httpService.delete(USER_URL + userId)
}

function update(credentials) {
    return httpService.put(USER_URL + credentials._id, credentials)
}

function login(credentials) {
    const user = httpService.post(AUTH_URL + 'login', credentials)
    if (user) setLoggedinUser(user)
    return user
}

function signup(credentials) {
    const user = httpService.post(AUTH_URL + 'signup', credentials)
    if (user) setLoggedinUser(user)
    return user
}

async function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
    return httpService.post(AUTH_URL + 'logout')
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

function setLoggedinUser(user) {
    return sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
}

function getEmptyCredentials(fullName = '', userName = '', password = '', rank = { type: 'recruit', imgUrl: '/src/styles/img/recruit.svg' }, madels = [], movement = [], history = [], msgs = [], units = []) {
    return {
        fullName,
        userName,
        password,
        rank,
        madels,
        movement,
        history,
        msgs,
        units,
        officerNots,
        createdAt: Date.now()
    }

}





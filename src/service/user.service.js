import { httpService } from './http.service'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'
const AUTH_URL = 'auth/'
const USER_URL = 'user/'

export const userService = {
    login,
    logout,
    signup,
    getLoggedinUser,
    query,
    getById,
    remove,
    update,
    getEmptyCredentials,
    getTimeSince,
    daysSince

}

window.userService = userService

function query() {
    return httpService.get(USER_URL)
}

function getById(userId) {
    return httpService.get(USER_URL + userId)
}

function getByName(userName) {

}

function remove(userId) {
    return httpService.delete(USER_URL + userId)
}

function update(credentials) {
    return httpService.put(USER_URL + credentials._id, credentials)
}

async function login(credentials) {
    try {
        const user = await httpService.post(AUTH_URL + 'login', credentials)
        console.log("user:", user)
        if (user) setLoggedinUser(user)
        return user


    } catch (err) { throw err }
}

async function signup(credentials) {
    try {
        const user = await httpService.post(AUTH_URL + 'signup', credentials)
        if (user) setLoggedinUser(user)
        return user


    } catch (err) { throw err }
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

function getEmptyCredentials(fullname = '', username = '', password = '', email = '') {
    return {
        fullname,
        username,
        position: 'member',
        password,
        email,
        imgUrl: '',
        rank: { type: 'recruit', imgUrl: '/src/styles/img/recruit.svg', createdAt: Date.now() },
        medals: [],
        movement: [],
        history: [],
        msgs: [],
        units: [],
        officerNots: [],
        createdAt: Date.now()
    }
}

function getTimeSince(timeStamp) {
    const dateThen = new Date(timeStamp)
    const now = new Date()

    let years = now.getFullYear() - dateThen.getFullYear()
    let months = now.getMonth() - dateThen.getMonth()
    let days = now.getDate() - dateThen.getDate()

    if (months < 0) {
        years -= 1
        months += 12
    }

    if (days < 0) {
        months -= 1
        const previousMonth = new Date(now.getFullYear(), now.getMonth(), 0)
        days += previousMonth.getDate()
    }

    if (months < 0) {
        years -= 1
        months += 12
    }

    return `${years} years, ${months} months, ${days} days`
}

function daysSince(timestamp) {
    const dateThen = new Date(timestamp)
    const now = new Date()
    const differenceInMilliseconds = now - dateThen
    const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24)
    return Math.floor(differenceInDays)
}







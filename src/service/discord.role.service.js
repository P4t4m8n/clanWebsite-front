
import { httpService } from './http.service'

export const discordService = {}

const DISCORD_ROLE_URL = 'discord/role/'

export const roleService = {
    query,
    get,
    remove,
    save,
    getEmptyrole,
    getPermissionsNames
}

window.roleService = roleService

function query() {
    return httpService.get(DISCORD_ROLE_URL)
}

function get(roleId) {
    return httpService.get(DISCORD_ROLE_URL + roleId)
}

function remove(roleId) {
    return httpService.delete(DISCORD_ROLE_URL + roleId)
}

function save(role) {
    const edit = 'edit/'
    if (role.id) return httpService.put(DISCORD_ROLE_URL + edit + role.id, role)
    return httpService.post(DISCORD_ROLE_URL + edit, role)
}

function getEmptyrole() {
    return {
        name: '',
        permissions: []
    }

}

 function getPermissionsNames() {
    return ['KICK_MEMBERS',
        'BAN_MEMBERS', 'CREATE_INSTANT_INVITE',
        'MANAGE_CHANNELS', 'MANAGE_GUILD',
        'VIEW_CHANNEL', 'SEND_MESSAGES',
        'MANAGE_MESSAGES ',
        'READ_MESSAGE_HISTORY',
        'CONNECT', 'SPEAK',
        'MOVE_MEMBERS', 'MANAGE_ROLE',
    ]
}









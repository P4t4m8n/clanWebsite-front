
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
        permissions: [],
        color: '',
        hoist: false,
        position: 0,
        
    }

}

function getPermissionsNames() {
    return [
        "CREATE_INSTANT_INVITE",
        "KICK_MEMBERS",
        "BAN_MEMBERS",
        "ADMINISTRATOR",
        "MANAGE_CHANNELS",
        "MANAGE_GUILD",
        "ADD_REACTIONS",
        "VIEW_AUDIT_LOG",
        "PRIORITY_SPEAKER",
        "STREAM",
        "VIEW_CHANNEL",
        "SEND_MESSAGES",
        "SEND_TTS_MESSAGES",
        "MANAGE_MESSAGES",
        "EMBED_LINKS",
        "ATTACH_FILES",
        "READ_MESSAGE_HISTORY",
        "MENTION_EVERYONE",
        "USE_EXTERNAL_EMOJIS",
        "VIEW_GUILD_INSIGHTS",
        "CONNECT",
        "SPEAK",
        "MUTE_MEMBERS",
        "DEAFEN_MEMBERS",
        "MOVE_MEMBERS",
        "USE_VAD",
        "CHANGE_NICKNAME",
        "MANAGE_NICKNAMES",
        "MANAGE_ROLES",
        "MANAGE_WEBHOOKS",
        "MANAGE_EMOJIS"
    ]
}









import { createContext, useEffect, useState } from "react";
import { roleService } from "../service/discord.role.service";
import { Link, Outlet } from "react-router-dom";
import { RoleList } from "../cmps/Discrod/Role/RoleList";



export function DiscordManager() {

    const [roles, setRoles] = useState(null)
    const RolesContext = createContext(null)

    useEffect(() => {
        loadRoles()
    }, [])

    async function loadRoles() {
        try {
            const loadedRoles = await roleService.query()
            setRoles(loadedRoles)
        } catch (err) { console.log(err) }
    }

    const onRemoveRole = async (roleId) => {
        try {
            await roleService.remove(roleId)
            setRoles(prevRoles => {
                const idx = prevRoles.findIndex(role => role.id === roleId)
                return prevRoles.toSpliced(idx, 1)
            })
        } catch (err) { console.log(err) }
    }


    if (!roles) return <div>...Loading Roles</div>

    return (
        <RolesContext.Provider value={roles}>
            <section className="discord-manager">
                <Link to={"role/edit"}>Add role</Link>
                <RoleList roles={roles} onRemoveRole={onRemoveRole} />
                <Outlet />
            </section>
        </RolesContext.Provider>
    )
}